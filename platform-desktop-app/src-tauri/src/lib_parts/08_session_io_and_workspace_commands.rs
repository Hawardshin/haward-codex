#[tauri::command]
fn cancel_cli_adapter_session(
    app: AppHandle,
    store: State<'_, SessionStore>,
    session_id: String,
) -> Result<CliSessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let report = {
        let session = sessions
            .get_mut(&session_id)
            .ok_or_else(|| format!("Unknown CLI session id: {session_id}"))?;
        if !session.finished {
            let status = kill_and_wait_child(&mut session.child);
            mark_session_finished(session, "canceled", status);
        }
        poll_session_locked(&app, &session_id, session)
    };
    cleanup_finished_sessions_locked(&mut sessions);
    Ok(report)
}

#[tauri::command]
fn read_workspace_text_file(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    relative_path: String,
) -> Result<WorkspaceTextFile, String> {
    let root = workspace_root_for_app(Some(&app))?;
    let normalized = normalize_relative_workspace_path(&relative_path)?;
    if let Some(file) = cache_store.cached_text_file(&root, &normalized)? {
        return Ok(file);
    }

    let (path, normalized) = resolve_workspace_file(Some(&app), &relative_path, true)?;
    let metadata = path
        .metadata()
        .map_err(|error| format!("Failed to read file metadata: {error}"))?;
    if metadata.len() as usize > MAX_WORKSPACE_FILE_BYTES {
        return Err(format!(
            "File is too large for the desktop editor. Max size is {MAX_WORKSPACE_FILE_BYTES} bytes."
        ));
    }
    let content =
        fs::read_to_string(&path).map_err(|error| format!("Failed to read text file: {error}"))?;
    let file = WorkspaceTextFile {
        relative_path: normalized,
        size_bytes: content.len(),
        content,
        max_size_bytes: MAX_WORKSPACE_FILE_BYTES,
    };
    cache_store.upsert_text_file(&root, &file)?;
    Ok(file)
}

#[tauri::command]
fn list_workspace_text_files(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    filter: Option<String>,
    limit: Option<usize>,
) -> Result<WorkspaceTextFileListReport, String> {
    let root = workspace_root_for_app(Some(&app))?;
    let normalized_filter = filter.unwrap_or_default().trim().to_lowercase();
    let limit = limit
        .unwrap_or(DEFAULT_WORKSPACE_SOURCE_LIST_LIMIT)
        .clamp(1, MAX_WORKSPACE_SOURCE_LIST_LIMIT);

    if let Some(cache) = cache_store.cache_for_root(&root)? {
        return Ok(workspace_list_report_from_cache(
            &cache,
            &normalized_filter,
            limit,
            "runtime_workspace_os_cache",
        ));
    }

    let cache = build_workspace_resource_cache(&root, false)?;
    cache_store.replace_cache(cache.clone())?;
    Ok(workspace_list_report_from_cache(
        &cache,
        &normalized_filter,
        limit,
        "runtime_workspace_os_scan_cache",
    ))
}

#[tauri::command]
fn warm_workspace_os_resources(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    force_refresh: Option<bool>,
) -> Result<WorkspaceResourceWarmupReport, String> {
    let root = workspace_root_for_app(Some(&app))?;
    cache_store.start_background_warmup(
        root,
        force_refresh.unwrap_or(false),
        "background_workspace_os_warmup",
    )
}

#[tauri::command]
fn prepare_workspace_os_resources(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    filter: Option<String>,
    limit: Option<usize>,
    preload_contents: Option<bool>,
    force_refresh: Option<bool>,
) -> Result<WorkspaceResourcePrepareReport, String> {
    let root = workspace_root_for_app(Some(&app))?;
    let normalized_filter = filter.unwrap_or_default().trim().to_lowercase();
    let limit = limit
        .unwrap_or(DEFAULT_WORKSPACE_SOURCE_LIST_LIMIT)
        .clamp(1, MAX_WORKSPACE_SOURCE_LIST_LIMIT);
    let force_refresh = force_refresh.unwrap_or(false);
    let cache = if !force_refresh {
        cache_store.cache_for_root(&root)?
    } else {
        None
    };
    let cache = match cache {
        Some(cache) => cache,
        None => {
            let cache = build_workspace_resource_cache(&root, preload_contents.unwrap_or(true))?;
            cache_store.replace_cache(cache.clone())?;
            cache_store.set_warmup_report(workspace_warmup_report_from_cache(
                &cache,
                "foreground_workspace_os_prepare",
            ))?;
            cache
        }
    };
    let catalog = workspace_list_report_from_cache(
        &cache,
        &normalized_filter,
        limit,
        "runtime_workspace_os_prepared_cache",
    );
    let warmup = cache_store.warmup_report()?;
    Ok(workspace_resource_prepare_report(&cache, catalog, &warmup))
}

#[tauri::command]
fn get_desktop_resource_snapshot(
    cache_store: State<'_, WorkspaceResourceStore>,
) -> Result<DesktopResourceSnapshotReport, String> {
    let profile = workspace_resource_profile();
    let mut system = System::new();
    system.refresh_memory();
    system.refresh_cpu_all();

    let current_pid = get_current_pid().ok();
    if let Some(pid) = current_pid {
        let process_refresh = ProcessRefreshKind::nothing()
            .with_cpu()
            .with_memory()
            .with_tasks();
        system.refresh_processes_specifics(ProcessesToUpdate::Some(&[pid]), false, process_refresh);
        thread::sleep(Duration::from_millis(120));
        system.refresh_cpu_all();
        system.refresh_processes_specifics(ProcessesToUpdate::Some(&[pid]), false, process_refresh);
    }

    let process = current_pid.and_then(|pid| system.process(pid));
    let warmup = cache_store.warmup_report()?;
    let workspace_cache = cache_store.snapshot_cache()?;

    let process_memory_bytes = process.map(|item| item.memory()).unwrap_or(0);
    let process_virtual_memory_bytes = process.map(|item| item.virtual_memory()).unwrap_or(0);
    let process_cpu_usage = process.map(|item| item.cpu_usage()).unwrap_or(0.0);
    let process_task_count = process
        .and_then(|item| item.tasks().map(|tasks| tasks.len()))
        .unwrap_or(0);
    let semantic_metrics = vec![
        DesktopResourceMetric {
            name: "process.memory.usage",
            value: process_memory_bytes as f64,
            unit: "By",
            source: "sysinfo",
        },
        DesktopResourceMetric {
            name: "process.memory.virtual",
            value: process_virtual_memory_bytes as f64,
            unit: "By",
            source: "sysinfo",
        },
        DesktopResourceMetric {
            name: "process.cpu.utilization",
            value: f64::from(process_cpu_usage) / 100.0,
            unit: "1",
            source: "sysinfo",
        },
        DesktopResourceMetric {
            name: "process.thread.count",
            value: process_task_count as f64,
            unit: "{thread}",
            source: "sysinfo",
        },
    ];

    Ok(DesktopResourceSnapshotReport {
        status: "sampled".to_string(),
        schema_version: "desktop-resource-snapshot.v1".to_string(),
        sampled_at: current_unix_millis_label(),
        system_supported: sysinfo::IS_SUPPORTED_SYSTEM,
        app_pid: current_pid.map(|pid| pid.as_u32()).unwrap_or(0),
        process_name: process
            .map(|item| item.name().to_string_lossy().to_string())
            .unwrap_or_else(|| "unknown".to_string()),
        process_memory_bytes,
        process_virtual_memory_bytes,
        process_cpu_usage,
        process_run_time_seconds: process.map(|item| item.run_time()).unwrap_or(0),
        process_task_count,
        cpu_threads: profile.cpu_threads,
        available_parallelism: profile.available_parallelism,
        parallel_workers: profile.parallel_workers,
        global_cpu_usage: system.global_cpu_usage(),
        total_memory_bytes: system.total_memory(),
        available_memory_bytes: system.available_memory(),
        used_memory_bytes: system.used_memory(),
        memory_budget_bytes: profile.memory_budget_bytes,
        preload_byte_limit: profile.preload_byte_limit,
        preload_file_limit: profile.preload_file_limit,
        preload_strategy: profile.preload_strategy,
        workspace_cache,
        semantic_metrics,
        warmup_status: warmup.status,
        warmup_source: warmup.source,
        warmup_error: warmup.error,
    })
}

#[tauri::command]
fn write_workspace_text_file(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    relative_path: String,
    content: String,
) -> Result<WorkspaceWriteReport, String> {
    if content.len() > MAX_WORKSPACE_FILE_BYTES {
        return Err(format!(
            "Content is too large for the desktop editor. Max size is {MAX_WORKSPACE_FILE_BYTES} bytes."
        ));
    }
    let root = workspace_root_for_app(Some(&app))?;
    let (path, normalized) = resolve_workspace_file(Some(&app), &relative_path, true)?;
    let original = fs::read(&path)
        .map_err(|error| format!("Failed to read original file for backup: {error}"))?;
    let backup_path = source_backup_path(&root, &normalized)?;
    if let Some(parent) = backup_path.parent() {
        fs::create_dir_all(parent)
            .map_err(|error| format!("Failed to create backup directory: {error}"))?;
    }
    fs::write(&backup_path, original)
        .map_err(|error| format!("Failed to write backup file: {error}"))?;
    fs::write(&path, content.as_bytes())
        .map_err(|error| format!("Failed to write workspace file: {error}"))?;
    cache_store.clear_cache()?;
    Ok(WorkspaceWriteReport {
        relative_path: normalized,
        size_bytes: content.len(),
        backup_path: backup_path.to_string_lossy().to_string(),
        status: "written_with_backup".to_string(),
    })
}

impl WorkspaceResourceStore {
    fn cache_for_root(&self, root: &Path) -> Result<Option<WorkspaceResourceCache>, String> {
        let root_path = path_to_string(root);
        let cache = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        Ok(cache
            .as_ref()
            .filter(|cached| cached.root_path == root_path)
            .cloned())
    }

    fn replace_cache(&self, cache: WorkspaceResourceCache) -> Result<(), String> {
        let mut current = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        *current = Some(cache);
        Ok(())
    }

    fn clear_cache(&self) -> Result<(), String> {
        let mut current = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        *current = None;
        drop(current);
        self.set_warmup_report(WorkspaceResourceWarmupReport {
            status: "invalidated".to_string(),
            source: "cache_cleared".to_string(),
            finished_at: current_unix_millis_label(),
            ..WorkspaceResourceWarmupReport::default()
        })?;
        Ok(())
    }

    fn cached_text_file(
        &self,
        root: &Path,
        relative_path: &str,
    ) -> Result<Option<WorkspaceTextFile>, String> {
        let root_path = path_to_string(root);
        let cache = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        Ok(cache
            .as_ref()
            .filter(|cached| cached.root_path == root_path)
            .and_then(|cached| cached.text_files.get(relative_path).cloned()))
    }

    fn upsert_text_file(&self, root: &Path, file: &WorkspaceTextFile) -> Result<(), String> {
        let root_path = path_to_string(root);
        let mut cache = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        let Some(current) = cache.as_mut() else {
            return Ok(());
        };
        if current.root_path != root_path {
            return Ok(());
        }
        current.cached_bytes = current
            .cached_bytes
            .saturating_sub(
                current
                    .text_files
                    .get(&file.relative_path)
                    .map(|cached| cached.size_bytes)
                    .unwrap_or(0),
            )
            .saturating_add(file.size_bytes);
        current
            .text_files
            .insert(file.relative_path.clone(), file.clone());
        Ok(())
    }

    fn warmup_report(&self) -> Result<WorkspaceResourceWarmupReport, String> {
        let report = self
            .inner
            .warmup
            .lock()
            .map_err(|_| "Workspace resource warmup lock is poisoned.".to_string())?;
        Ok(report.clone())
    }

    fn set_warmup_report(&self, report: WorkspaceResourceWarmupReport) -> Result<(), String> {
        let mut current = self
            .inner
            .warmup
            .lock()
            .map_err(|_| "Workspace resource warmup lock is poisoned.".to_string())?;
        *current = report;
        Ok(())
    }

    fn snapshot_cache(&self) -> Result<WorkspaceResourceSnapshotCache, String> {
        let cache = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        Ok(match cache.as_ref() {
            Some(cache) => WorkspaceResourceSnapshotCache {
                cache_status: "ready".to_string(),
                root_path: cache.root_path.clone(),
                generated_at: cache.generated_at.clone(),
                scanned_entries: cache.scanned_entries,
                total_count: cache.files.len(),
                cached_text_files: cache.text_files.len(),
                cached_bytes: cache.cached_bytes,
                scan_duration_ms: cache.scan_duration_ms,
                entry_build_duration_ms: cache.entry_build_duration_ms,
                preload_duration_ms: cache.preload_duration_ms,
            },
            None => WorkspaceResourceSnapshotCache {
                cache_status: "empty".to_string(),
                ..WorkspaceResourceSnapshotCache::default()
            },
        })
    }

    fn start_background_warmup(
        &self,
        root: PathBuf,
        force_refresh: bool,
        source: &str,
    ) -> Result<WorkspaceResourceWarmupReport, String> {
        let root_path = path_to_string(&root);
        if !force_refresh {
            if let Some(cache) = self.cache_for_root(&root)? {
                let report = workspace_warmup_report_from_cache(&cache, "ready_from_memory");
                self.set_warmup_report(report.clone())?;
                return Ok(report);
            }
        } else {
            self.clear_cache()?;
        }

        let current = self.warmup_report()?;
        if current.status == "warming" && current.root_path == root_path {
            return Ok(current);
        }

        let started_at = current_unix_millis_label();
        let profile = workspace_resource_profile();
        let warming = WorkspaceResourceWarmupReport {
            schema_version: WORKSPACE_RESOURCE_CACHE_SCHEMA_VERSION.to_string(),
            status: "warming".to_string(),
            source: source.to_string(),
            root_path,
            started_at,
            finished_at: String::new(),
            cached_text_files: 0,
            cached_bytes: 0,
            memory_budget_bytes: profile.memory_budget_bytes,
            cpu_threads: profile.cpu_threads,
            available_parallelism: profile.available_parallelism,
            parallel_workers: profile.parallel_workers,
            total_memory_bytes: profile.total_memory_bytes,
            available_memory_bytes: profile.available_memory_bytes,
            used_memory_bytes: profile.used_memory_bytes,
            scan_duration_ms: 0,
            entry_build_duration_ms: 0,
            preload_duration_ms: 0,
            preload_strategy: profile.preload_strategy,
            system_supported: profile.system_supported,
            error: String::new(),
        };
        self.set_warmup_report(warming.clone())?;

        let store = self.clone();
        let warming_for_thread = warming.clone();
        thread::Builder::new()
            .name("workspace-resource-warmup".to_string())
            .spawn(move || {
                let result = build_workspace_resource_cache(&root, true);
                match result {
                    Ok(cache) => {
                        let report = workspace_warmup_report_from_cache(
                            &cache,
                            "background_workspace_os_warmup",
                        );
                        if let Err(error) = store.replace_cache(cache) {
                            let mut failed = report.clone();
                            failed.status = "failed".to_string();
                            failed.error = error;
                            failed.finished_at = current_unix_millis_label();
                            let _ = store.set_warmup_report(failed);
                            return;
                        }
                        let _ = store.set_warmup_report(report);
                    }
                    Err(error) => {
                        let mut failed = warming_for_thread;
                        failed.status = "failed".to_string();
                        failed.finished_at = current_unix_millis_label();
                        failed.error = error;
                        let _ = store.set_warmup_report(failed);
                    }
                }
            })
            .map_err(|error| {
                format!("Failed to spawn workspace resource warmup thread: {error}")
            })?;

        Ok(warming)
    }
}

struct WorkspaceTextFileScanResult {
    scanned_entries: usize,
    truncated: bool,
    files: Vec<WorkspaceTextFileEntry>,
    scan_duration_ms: u64,
    entry_build_duration_ms: u64,
}

struct WorkspaceTextFileCandidate {
    path: PathBuf,
    relative_path: String,
    metadata: fs::Metadata,
}

struct WorkspacePreloadCandidate {
    path: PathBuf,
    relative_path: String,
    size_bytes: usize,
}

fn scan_workspace_text_file_entries(
    root: &Path,
    normalized_filter: &str,
    profile: &WorkspaceResourceProfile,
) -> WorkspaceTextFileScanResult {
    let scan_started = Instant::now();
    let mut stack = vec![root.to_path_buf()];
    let mut scanned_entries = 0_usize;
    let mut candidates = Vec::new();
    let mut truncated = false;

    while let Some(dir) = stack.pop() {
        if scanned_entries >= MAX_WORKSPACE_SOURCE_SCAN_ENTRIES {
            truncated = true;
            break;
        }

        let entries = match fs::read_dir(&dir) {
            Ok(entries) => entries,
            Err(_) => continue,
        };

        for entry_result in entries {
            if scanned_entries >= MAX_WORKSPACE_SOURCE_SCAN_ENTRIES {
                truncated = true;
                break;
            }
            scanned_entries += 1;

            let entry = match entry_result {
                Ok(entry) => entry,
                Err(_) => continue,
            };
            let file_name = entry.file_name().to_string_lossy().to_string();
            let file_type = match entry.file_type() {
                Ok(file_type) => file_type,
                Err(_) => continue,
            };

            if file_type.is_symlink() {
                continue;
            }
            if file_type.is_dir() {
                if should_skip_source_editor_dir(&file_name) {
                    continue;
                }
                stack.push(entry.path());
                continue;
            }
            if !file_type.is_file() {
                continue;
            }

            let path = entry.path();
            let relative_path = workspace_relative_display_path(root, &path);
            if !is_source_editor_text_path(&relative_path) {
                continue;
            }
            if !normalized_filter.is_empty()
                && !relative_path.to_lowercase().contains(normalized_filter)
            {
                continue;
            }

            let metadata = match entry.metadata() {
                Ok(metadata) => metadata,
                Err(_) => continue,
            };
            candidates.push(WorkspaceTextFileCandidate {
                path,
                relative_path,
                metadata,
            });
        }
    }

    let scan_duration_ms = elapsed_millis(scan_started);
    let entry_started = Instant::now();
    let mut files: Vec<WorkspaceTextFileEntry> = if let Some(pool) =
        build_workspace_thread_pool(profile.parallel_workers, "workspace-entry-build")
    {
        pool.install(|| {
            candidates
                .par_iter()
                .map(|candidate| {
                    workspace_text_file_entry(
                        root,
                        &candidate.path,
                        &candidate.relative_path,
                        &candidate.metadata,
                    )
                })
                .collect()
        })
    } else {
        candidates
            .iter()
            .map(|candidate| {
                workspace_text_file_entry(
                    root,
                    &candidate.path,
                    &candidate.relative_path,
                    &candidate.metadata,
                )
            })
            .collect()
    };
    let entry_build_duration_ms = elapsed_millis(entry_started);

    files.sort_by(|left, right| left.path.cmp(&right.path));
    WorkspaceTextFileScanResult {
        scanned_entries,
        truncated,
        files,
        scan_duration_ms,
        entry_build_duration_ms,
    }
}

fn build_workspace_resource_cache(
    root: &Path,
    preload_contents: bool,
) -> Result<WorkspaceResourceCache, String> {
    let profile = workspace_resource_profile();
    let scan = scan_workspace_text_file_entries(root, "", &profile);
    let preload_started = Instant::now();
    let (text_files, cached_bytes) = if preload_contents {
        preload_workspace_text_files(root, &scan.files, &profile)
    } else {
        (HashMap::new(), 0)
    };
    let preload_duration_ms = elapsed_millis(preload_started);

    Ok(WorkspaceResourceCache {
        root_path: path_to_string(root),
        generated_at: current_unix_millis_label(),
        scanned_entries: scan.scanned_entries,
        truncated: scan.truncated,
        files: scan.files,
        text_files,
        cached_bytes,
        scan_duration_ms: scan.scan_duration_ms,
        entry_build_duration_ms: scan.entry_build_duration_ms,
        preload_duration_ms,
        profile,
    })
}

fn workspace_resource_profile() -> WorkspaceResourceProfile {
    let available_parallelism = thread::available_parallelism()
        .map(|parallelism| parallelism.get())
        .unwrap_or(1);
    let mut system = System::new();
    system.refresh_memory();
    system.refresh_cpu_all();

    let cpu_threads = system.cpus().len().max(available_parallelism).max(1);
    let parallel_workers = cpu_threads
        .saturating_sub(1)
        .max(1)
        .min(MAX_WORKSPACE_PRELOAD_WORKERS);
    let available_memory_bytes = system.available_memory();
    let memory_budget_bytes = workspace_memory_budget_bytes(available_memory_bytes);
    let preload_file_limit = if memory_budget_bytes >= DEFAULT_WORKSPACE_PRELOAD_TEXT_BYTES {
        MAX_WORKSPACE_PRELOAD_TEXT_FILES
    } else {
        MAX_WORKSPACE_PRELOAD_TEXT_FILES / 4
    };

    WorkspaceResourceProfile {
        system_supported: sysinfo::IS_SUPPORTED_SYSTEM,
        cpu_threads,
        available_parallelism,
        parallel_workers,
        total_memory_bytes: system.total_memory(),
        available_memory_bytes,
        used_memory_bytes: system.used_memory(),
        memory_budget_bytes,
        preload_file_limit,
        preload_byte_limit: memory_budget_bytes,
        preload_strategy: "rayon_parallel_cpu_ram_budget".to_string(),
    }
}

fn workspace_memory_budget_bytes(available_memory_bytes: u64) -> usize {
    if available_memory_bytes == 0 {
        return DEFAULT_WORKSPACE_PRELOAD_TEXT_BYTES;
    }

    let available_memory = usize::try_from(available_memory_bytes).unwrap_or(usize::MAX);
    if available_memory < MIN_WORKSPACE_PRELOAD_TEXT_BYTES.saturating_mul(2) {
        return (available_memory / 4)
            .max(8_000_000)
            .min(MIN_WORKSPACE_PRELOAD_TEXT_BYTES);
    }

    (available_memory / 4).clamp(
        DEFAULT_WORKSPACE_PRELOAD_TEXT_BYTES,
        MAX_WORKSPACE_PRELOAD_TEXT_BYTES,
    )
}

fn build_workspace_thread_pool(worker_count: usize, name: &str) -> Option<ThreadPool> {
    let thread_name_prefix = name.to_string();
    ThreadPoolBuilder::new()
        .num_threads(worker_count.max(1))
        .thread_name(move |index| format!("{thread_name_prefix}-{index}"))
        .build()
        .ok()
}

fn preload_workspace_text_files(
    root: &Path,
    entries: &[WorkspaceTextFileEntry],
    profile: &WorkspaceResourceProfile,
) -> (HashMap<String, WorkspaceTextFile>, usize) {
    let mut selected = Vec::new();
    let mut selected_bytes = 0_usize;

    for entry in entries.iter().filter(|entry| !entry.truncated) {
        if selected.len() >= profile.preload_file_limit {
            break;
        }
        if entry.size_bytes > MAX_WORKSPACE_FILE_BYTES {
            continue;
        }
        if selected_bytes.saturating_add(entry.size_bytes) > profile.preload_byte_limit {
            continue;
        }
        selected_bytes = selected_bytes.saturating_add(entry.size_bytes);
        selected.push(WorkspacePreloadCandidate {
            path: root.join(&entry.path),
            relative_path: entry.path.clone(),
            size_bytes: entry.size_bytes,
        });
    }

    let loaded: Vec<WorkspaceTextFile> = if let Some(pool) =
        build_workspace_thread_pool(profile.parallel_workers, "workspace-preload")
    {
        pool.install(|| {
            selected
                .par_iter()
                .filter_map(read_workspace_preload_candidate)
                .collect()
        })
    } else {
        selected
            .iter()
            .filter_map(read_workspace_preload_candidate)
            .collect()
    };
    let cached_bytes = loaded.iter().map(|file| file.size_bytes).sum();
    let text_files = loaded
        .into_iter()
        .map(|file| (file.relative_path.clone(), file))
        .collect();

    (text_files, cached_bytes)
}

fn read_workspace_preload_candidate(
    candidate: &WorkspacePreloadCandidate,
) -> Option<WorkspaceTextFile> {
    if candidate.size_bytes > MAX_WORKSPACE_FILE_BYTES {
        return None;
    }
    let content = fs::read_to_string(&candidate.path).ok()?;
    if content.len() > MAX_WORKSPACE_FILE_BYTES {
        return None;
    }
    Some(WorkspaceTextFile {
        relative_path: candidate.relative_path.clone(),
        size_bytes: content.len(),
        content,
        max_size_bytes: MAX_WORKSPACE_FILE_BYTES,
    })
}

fn workspace_list_report_from_cache(
    cache: &WorkspaceResourceCache,
    normalized_filter: &str,
    limit: usize,
    source: &str,
) -> WorkspaceTextFileListReport {
    let mut files: Vec<WorkspaceTextFileEntry> = cache
        .files
        .iter()
        .filter(|entry| {
            normalized_filter.is_empty() || entry.path.to_lowercase().contains(normalized_filter)
        })
        .cloned()
        .collect();
    files.sort_by(|left, right| left.path.cmp(&right.path));
    let total_count = files.len();
    let truncated = cache.truncated || total_count > limit;
    let files: Vec<WorkspaceTextFileEntry> = files.into_iter().take(limit).collect();
    WorkspaceTextFileListReport {
        status: "listed".to_string(),
        source: source.to_string(),
        total_count,
        returned_count: files.len(),
        truncated,
        files,
    }
}

fn workspace_resource_prepare_report(
    cache: &WorkspaceResourceCache,
    catalog: WorkspaceTextFileListReport,
    warmup: &WorkspaceResourceWarmupReport,
) -> WorkspaceResourcePrepareReport {
    WorkspaceResourcePrepareReport {
        status: "prepared".to_string(),
        source: catalog.source.clone(),
        schema_version: WORKSPACE_RESOURCE_CACHE_SCHEMA_VERSION.to_string(),
        root_path: cache.root_path.clone(),
        generated_at: cache.generated_at.clone(),
        scanned_entries: cache.scanned_entries,
        total_count: catalog.total_count,
        returned_count: catalog.returned_count,
        cached_text_files: cache.text_files.len(),
        cached_bytes: cache.cached_bytes,
        preload_file_limit: cache.profile.preload_file_limit,
        preload_byte_limit: cache.profile.preload_byte_limit,
        memory_budget_bytes: cache.profile.memory_budget_bytes,
        cpu_threads: cache.profile.cpu_threads,
        available_parallelism: cache.profile.available_parallelism,
        parallel_workers: cache.profile.parallel_workers,
        total_memory_bytes: cache.profile.total_memory_bytes,
        available_memory_bytes: cache.profile.available_memory_bytes,
        used_memory_bytes: cache.profile.used_memory_bytes,
        scan_duration_ms: cache.scan_duration_ms,
        entry_build_duration_ms: cache.entry_build_duration_ms,
        preload_duration_ms: cache.preload_duration_ms,
        preload_strategy: cache.profile.preload_strategy.clone(),
        system_supported: cache.profile.system_supported,
        warmup_status: warmup.status.clone(),
        truncated: cache.truncated || catalog.truncated,
        catalog,
    }
}

fn workspace_warmup_report_from_cache(
    cache: &WorkspaceResourceCache,
    source: &str,
) -> WorkspaceResourceWarmupReport {
    WorkspaceResourceWarmupReport {
        schema_version: WORKSPACE_RESOURCE_CACHE_SCHEMA_VERSION.to_string(),
        status: "ready".to_string(),
        source: source.to_string(),
        root_path: cache.root_path.clone(),
        started_at: cache.generated_at.clone(),
        finished_at: current_unix_millis_label(),
        cached_text_files: cache.text_files.len(),
        cached_bytes: cache.cached_bytes,
        memory_budget_bytes: cache.profile.memory_budget_bytes,
        cpu_threads: cache.profile.cpu_threads,
        available_parallelism: cache.profile.available_parallelism,
        parallel_workers: cache.profile.parallel_workers,
        total_memory_bytes: cache.profile.total_memory_bytes,
        available_memory_bytes: cache.profile.available_memory_bytes,
        used_memory_bytes: cache.profile.used_memory_bytes,
        scan_duration_ms: cache.scan_duration_ms,
        entry_build_duration_ms: cache.entry_build_duration_ms,
        preload_duration_ms: cache.preload_duration_ms,
        preload_strategy: cache.profile.preload_strategy.clone(),
        system_supported: cache.profile.system_supported,
        error: String::new(),
    }
}

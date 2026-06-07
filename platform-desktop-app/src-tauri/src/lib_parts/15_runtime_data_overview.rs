fn runtime_data_boundary_report(app: &AppHandle) -> Result<RuntimeDataBoundaryReport, String> {
    let mut roots = Vec::new();
    roots.push(runtime_root_report(
        "app_config",
        "App Config",
        "platform_config_store",
        app.path()
            .app_config_dir()
            .map_err(|error| format!("Failed to resolve app config directory: {error}"))?,
        "user_local_app_config",
        "Installer-safe configuration metadata and user settings.",
    )?);
    roots.push(runtime_root_report(
        "app_data",
        "App Data",
        "platform_data_store",
        app.path()
            .app_data_dir()
            .map_err(|error| format!("Failed to resolve app data directory: {error}"))?,
        "user_local_app_data",
        "Durable runtime records that must not be bundled into the platform source tree.",
    )?);
    roots.push(runtime_root_report(
        "app_local_data",
        "App Local Data",
        "platform_local_data_store",
        app.path()
            .app_local_data_dir()
            .map_err(|error| format!("Failed to resolve app local data directory: {error}"))?,
        "user_local_machine_data",
        "Machine-local runtime records and non-roaming state.",
    )?);
    roots.push(runtime_root_report(
        "app_cache",
        "App Cache",
        "cache_store",
        app.path()
            .app_cache_dir()
            .map_err(|error| format!("Failed to resolve app cache directory: {error}"))?,
        "user_local_cache",
        "Regenerable cache and transient acceleration data.",
    )?);
    roots.push(runtime_root_report(
        "app_log",
        "App Logs",
        "log_store",
        app.path()
            .app_log_dir()
            .map_err(|error| format!("Failed to resolve app log directory: {error}"))?,
        "user_local_logs",
        "Runtime health and support logs subject to redaction before export.",
    )?);
    roots.push(runtime_root_report(
        "runtime_store",
        "Runtime Store",
        "platform_data_store",
        runtime_data_store_base_path(app)?,
        "user_local_app_data",
        "Platform-owned runtime records, task runs, support bundles, and audits.",
    )?);
    roots.push(runtime_root_report(
        "task_run_store",
        "Task Run Store",
        "task_execution_store",
        task_runs_base_path(app)?,
        "user_local_app_data",
        "CLI task-run records and stdout/stderr logs outside platform source.",
    )?);
    roots.push(runtime_root_report(
        "agent_workspace",
        "Agent Workspace",
        "agent_workspace",
        agent_workspace_base_path(app)?,
        "user_local_app_data",
        "Runtime agent scratch and work artifacts separated from reusable agent definitions.",
    )?);
    roots.push(runtime_root_report(
        "provider_credentials",
        "Provider Credentials",
        "provider_credential_store",
        provider_credentials_base_path(app)?,
        "user_local_app_config_secret",
        "Local provider API credentials used to launch guest adapters; excluded from support exports.",
    )?);
    roots.push(runtime_root_report(
        "agent_factory_proposals",
        "Agent Factory Proposals",
        "agent_factory_store",
        agent_factory_proposals_base_path(app)?,
        "user_visible_runtime_data",
        "Drafted agent specs and proposal records created by the desktop Agent Factory wizard.",
    )?);
    roots.push(runtime_root_report(
        "learning_feedback_decisions",
        "Learning Feedback Decisions",
        "learning_feedback_store",
        learning_feedback_decisions_base_path(app)?,
        "user_visible_runtime_data",
        "Approved, rejected, deferred, or promoted improvement decisions from accumulated work evidence.",
    )?);
    roots.push(runtime_root_report(
        "support_bundles",
        "Support Bundles",
        "support_diagnostic_store",
        support_bundles_base_path(app)?,
        "user_local_app_data",
        "Redacted support export bundles.",
    )?);
    roots.push(runtime_root_report(
        "payload_audits",
        "Payload Audits",
        "installer_payload_audit_store",
        payload_audits_base_path(app)?,
        "user_local_app_data",
        "Installer bundle scan reports.",
    )?);

    Ok(RuntimeDataBoundaryReport {
        status: "ready".to_string(),
        task_run_store_path: path_to_string(&task_runs_base_path(app)?),
        support_bundle_store_path: path_to_string(&support_bundles_base_path(app)?),
        installer_payload_audit_path: path_to_string(&payload_audits_base_path(app)?),
        provider_credential_store_path: path_to_string(&provider_credentials_base_path(app)?),
        roots,
    })
}

fn runtime_root_report(
    id: &str,
    label: &str,
    plane: &str,
    path: PathBuf,
    visibility: &str,
    purpose: &str,
) -> Result<RuntimeDataRootReport, String> {
    let existed_before = path.exists();
    fs::create_dir_all(&path)
        .map_err(|error| format!("Failed to create runtime data root {id}: {error}"))?;
    Ok(RuntimeDataRootReport {
        id: id.to_string(),
        label: label.to_string(),
        plane: plane.to_string(),
        path: path_to_string(&path),
        exists: path.exists(),
        created: !existed_before,
        visibility: visibility.to_string(),
        purpose: purpose.to_string(),
    })
}

fn accumulated_data_overview_report(
    app: &AppHandle,
) -> Result<AccumulatedDataOverviewReport, String> {
    let generated_at = current_unix_millis_label();
    let task_runs = read_task_run_records_with_limit(app, Some(MAX_TASK_RUN_RECORDS))?;
    let task_run_path = task_runs_base_path(app)?;
    let support_path = support_bundles_base_path(app)?;
    let payload_audit_path = payload_audits_base_path(app)?;
    let agent_workspace_path = agent_workspace_base_path(app)?;
    let agent_factory_path = agent_factory_proposals_base_path(app)?;
    let learning_feedback_path = learning_feedback_decisions_base_path(app)?;
    let runtime_store_path = runtime_data_store_base_path(app)?;
    let index_path = accumulated_data_index_path(app)?;

    for path in [
        &runtime_store_path,
        &task_run_path,
        &support_path,
        &payload_audit_path,
        &agent_workspace_path,
        &agent_factory_path,
        &learning_feedback_path,
    ] {
        fs::create_dir_all(path)
            .map_err(|error| format!("Failed to create accumulated data store: {error}"))?;
    }

    let mut stores = Vec::new();
    let task_run_stats = directory_data_stats(&task_run_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "task_run_store",
        "Task Runs",
        "task-run records",
        "task_execution_store",
        &task_run_path,
        task_runs.len(),
        task_run_stats.size_bytes,
        task_runs
            .first()
            .map(|record| record.updated_at.clone())
            .unwrap_or_else(|| directory_latest_modified_label(&task_run_stats)),
        "user_visible_runtime_data",
        "CLI task execution records, record JSON, stdout logs, and stderr logs.",
        "Open Logs",
        task_run_stats.scan_truncated,
    ));

    let decision_path = workspace_root()?
        .join("_ops")
        .join("coordination")
        .join("human-decision-inbox.json");
    let decision_store = match read_human_decision_inbox_value() {
        Ok((inbox_path, inbox)) => {
            let report = human_decision_report(&inbox, None)?;
            let stats = single_file_data_stats(&inbox_path);
            accumulated_data_store_report(
                "decision_inbox",
                "Decision Inbox",
                "human decisions",
                "decision_store",
                &inbox_path,
                report.total_count,
                stats.size_bytes,
                directory_latest_modified_label(&stats),
                "user_visible_workspace_data",
                "Human-answerable questions, answers, blocked work, and resume actions.",
                "Answer & Resume",
                false,
            )
        }
        Err(_) => accumulated_data_store_report(
            "decision_inbox",
            "Decision Inbox",
            "human decisions",
            "decision_store",
            &decision_path,
            0,
            0,
            String::new(),
            "user_visible_workspace_data",
            "Human-answerable questions, answers, blocked work, and resume actions.",
            "Create inbox",
            false,
        ),
    };
    stores.push(decision_store);

    let support_stats = directory_data_stats(&support_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "support_bundles",
        "Support Bundles",
        "diagnostic bundles",
        "support_diagnostic_store",
        &support_path,
        count_immediate_dirs(&support_path, MAX_ACCUMULATED_DATA_SCAN_FILES),
        support_stats.size_bytes,
        directory_latest_modified_label(&support_stats),
        "user_exported_on_demand",
        "Redacted support diagnostic exports created by explicit user action.",
        "Export bundle",
        support_stats.scan_truncated,
    ));

    let payload_stats = directory_data_stats(&payload_audit_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "payload_audits",
        "Payload Audits",
        "installer audit reports",
        "installer_payload_audit_store",
        &payload_audit_path,
        count_immediate_files_with_extension(
            &payload_audit_path,
            "json",
            MAX_ACCUMULATED_DATA_SCAN_FILES,
        ),
        payload_stats.size_bytes,
        directory_latest_modified_label(&payload_stats),
        "developer_visible_user_safe_summary",
        "Installer payload scan reports that protect customers from source or private-file leakage.",
        "Review audit",
        payload_stats.scan_truncated,
    ));

    let agent_workspace_stats =
        directory_data_stats(&agent_workspace_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "agent_workspace",
        "Agent Workspace",
        "agent work artifacts",
        "agent_workspace",
        &agent_workspace_path,
        agent_workspace_stats
            .file_count
            .saturating_add(agent_workspace_stats.dir_count),
        agent_workspace_stats.size_bytes,
        directory_latest_modified_label(&agent_workspace_stats),
        "advanced_visible_runtime_data",
        "Runtime agent scratch, generated work artifacts, and task work folders.",
        "Inspect workspace",
        agent_workspace_stats.scan_truncated,
    ));

    let agent_factory_stats =
        directory_data_stats(&agent_factory_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "agent_factory_proposals",
        "Agent Factory Proposals",
        "agent proposal records",
        "agent_factory_store",
        &agent_factory_path,
        count_immediate_files_with_extension(
            &agent_factory_path,
            "json",
            MAX_ACCUMULATED_DATA_SCAN_FILES,
        ),
        agent_factory_stats.size_bytes,
        directory_latest_modified_label(&agent_factory_stats),
        "user_visible_runtime_data",
        "Drafted agent specifications, target paths, validation commands, and rollback metadata.",
        "Review proposal",
        agent_factory_stats.scan_truncated,
    ));

    let learning_feedback_stats =
        directory_data_stats(&learning_feedback_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "learning_feedback_decisions",
        "Learning Feedback Decisions",
        "improvement decision records",
        "learning_feedback_store",
        &learning_feedback_path,
        count_immediate_files_with_extension(
            &learning_feedback_path,
            "json",
            MAX_ACCUMULATED_DATA_SCAN_FILES,
        ),
        learning_feedback_stats.size_bytes,
        directory_latest_modified_label(&learning_feedback_stats),
        "user_visible_runtime_data",
        "Approval, rejection, deferral, or promotion records for improvement candidates.",
        "Review decisions",
        learning_feedback_stats.scan_truncated,
    ));

    let total_records = stores.iter().map(|store| store.count).sum();
    let total_bytes = stores
        .iter()
        .fold(0_u64, |total, store| total.saturating_add(store.size_bytes));
    let stores_with_data = stores.iter().filter(|store| store.count > 0).count();
    let summary = vec![
        format!("{} data stores indexed.", stores.len()),
        format!("{total_records} accumulated records are visible from the desktop shell."),
        format!(
            "{} stores currently contain data; scans are bounded to {} files per store.",
            stores_with_data, MAX_ACCUMULATED_DATA_SCAN_FILES
        ),
        "The overview exposes runtime data paths without exposing the platform source tree as the product surface.".to_string(),
        format!(
            "A versioned accumulated-data index manifest is written to {} for stable UI reads.",
            path_to_string(&index_path)
        ),
    ];
    let status = if total_records == 0 {
        "empty_ready"
    } else if stores.iter().any(|store| store.status == "bounded") {
        "indexed_bounded"
    } else {
        "indexed"
    }
    .to_string();

    let report = AccumulatedDataOverviewReport {
        schema_version: ACCUMULATED_DATA_INDEX_SCHEMA_VERSION.to_string(),
        storage_format_version: ACCUMULATED_DATA_STORAGE_FORMAT_VERSION.to_string(),
        status,
        generated_at,
        index_path: path_to_string(&index_path),
        format_migration_status: "manifest_v1_active".to_string(),
        total_records,
        total_bytes,
        bounded_scan_max_files: MAX_ACCUMULATED_DATA_SCAN_FILES,
        stores,
        summary,
    };

    write_pretty_json(&index_path, &report)
        .map_err(|error| format!("Failed to write accumulated data index manifest: {error}"))?;

    Ok(report)
}

fn accumulated_data_store_report(
    id: &str,
    label: &str,
    record_type: &str,
    plane: &str,
    path: &Path,
    count: usize,
    size_bytes: u64,
    latest_updated_at: String,
    visibility: &str,
    purpose: &str,
    action_label: &str,
    scan_truncated: bool,
) -> AccumulatedDataStoreReport {
    let status = if !path.exists() {
        "missing"
    } else if scan_truncated {
        "bounded"
    } else if count == 0 {
        "empty"
    } else {
        "available"
    };

    AccumulatedDataStoreReport {
        id: id.to_string(),
        label: label.to_string(),
        record_type: record_type.to_string(),
        plane: plane.to_string(),
        path: path_to_string(path),
        status: status.to_string(),
        count,
        size_bytes,
        latest_updated_at,
        visibility: visibility.to_string(),
        purpose: purpose.to_string(),
        action_label: action_label.to_string(),
    }
}

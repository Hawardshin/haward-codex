fn persist_session_task_run(
    app: &AppHandle,
    session_id: &str,
    session: &CliSession,
    report: &CliSessionReport,
) -> Result<TaskRunPersistPaths, String> {
    let root = workspace_root_for_app(Some(app))?;
    let run_dir = task_run_dir(app, &session.task_run_id)?;
    fs::create_dir_all(&run_dir)
        .map_err(|error| format!("Failed to create task run directory: {error}"))?;

    let record_path = run_dir.join("record.json");
    let stdout_log_path = run_dir.join("stdout.log");
    let stderr_log_path = run_dir.join("stderr.log");
    fs::write(&stdout_log_path, report.stdout.as_bytes())
        .map_err(|error| format!("Failed to write task run stdout log: {error}"))?;
    fs::write(&stderr_log_path, report.stderr.as_bytes())
        .map_err(|error| format!("Failed to write task run stderr log: {error}"))?;

    let relative_record_path = workspace_relative_display_path(&root, &record_path);
    let relative_stdout_path = workspace_relative_display_path(&root, &stdout_log_path);
    let relative_stderr_path = workspace_relative_display_path(&root, &stderr_log_path);
    let updated_at = current_unix_millis_label();
    let record = json!({
        "schema_version": 1,
        "record_id": format!("record-{session_id}"),
        "session_id": session.session_id.clone(),
        "task_run_id": session.task_run_id.clone(),
        "task_kind": session.task_kind.clone(),
        "pipeline_id": session.pipeline_id.clone(),
        "lane_id": session.lane_id.clone(),
        "lane_role": session.lane_role.clone(),
        "adapter_id": session.adapter_id.clone(),
        "label": session.label.clone(),
        "command": session.command.clone(),
        "status": report.status.clone(),
        "exit_code": report.exit_code,
        "started_at": session.started_at.clone(),
        "updated_at": updated_at,
        "elapsed_ms": u64::try_from(report.elapsed_ms).unwrap_or(u64::MAX),
        "working_dir": report.working_dir.clone(),
        "prompt_preview": session.prompt_preview.clone(),
        "stdout_bytes": report.stdout.len(),
        "stderr_bytes": report.stderr.len(),
        "output_truncated": report.output_truncated,
        "decision_inbox_items": report.decision_inbox_items,
        "pending_decision_prompts": report.pending_decision_prompts,
        "deferred_prompt_count": report.deferred_prompt_count,
        "auto_defer_questions": report.auto_defer_questions,
        "auto_defer_triggered": report.auto_defer_triggered,
        "defer_message_sent": report.defer_message_sent,
        "bounded": report.bounded,
        "max_output_bytes": report.max_output_bytes,
        "decision_prompts": report.decision_prompts.clone(),
        "paths": {
            "record": relative_record_path,
            "stdout_log": relative_stdout_path,
            "stderr_log": relative_stderr_path
        }
    });
    let formatted = serde_json::to_string_pretty(&record)
        .map_err(|error| format!("Failed to serialize task run record: {error}"))?;
    fs::write(&record_path, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write task run record: {error}"))?;

    Ok(TaskRunPersistPaths {
        record_path: relative_record_path,
        stdout_log_path: relative_stdout_path,
        stderr_log_path: relative_stderr_path,
    })
}

fn task_run_persist_signature(report: &CliSessionReport) -> String {
    [
        report.status.clone(),
        report
            .exit_code
            .map(|code| code.to_string())
            .unwrap_or_default(),
        report.stdout.len().to_string(),
        report.stderr.len().to_string(),
        report.output_truncated.to_string(),
        report.defer_message_sent.to_string(),
        report.auto_defer_triggered.to_string(),
        report.decision_inbox_items.to_string(),
        report.pending_decision_prompts.to_string(),
        report.deferred_prompt_count.to_string(),
        report.decision_capture_error.clone().unwrap_or_default(),
    ]
    .join("\u{1f}")
}

fn read_task_run_records(app: &AppHandle) -> Result<Vec<CliTaskRunRecordReport>, String> {
    read_task_run_records_with_limit(app, Some(MAX_TASK_RUN_RECORDS))
}

fn read_task_run_records_with_limit(
    app: &AppHandle,
    limit: Option<usize>,
) -> Result<Vec<CliTaskRunRecordReport>, String> {
    let root = workspace_root_for_app(Some(app))?;
    let runtime_base = task_runs_base_path(app)?;
    fs::create_dir_all(&runtime_base)
        .map_err(|error| format!("Failed to create runtime task run directory: {error}"))?;
    let legacy_base = legacy_task_runs_base_path(&root);
    let mut records = Vec::new();
    read_task_run_records_from_base(&root, &runtime_base, &mut records)?;
    if legacy_base.exists() && legacy_base != runtime_base {
        read_task_run_records_from_base(&root, &legacy_base, &mut records)?;
    }

    records.sort_by(|left, right| right.updated_at.cmp(&left.updated_at));
    records.dedup_by(|left, right| left.task_run_id == right.task_run_id);
    if let Some(limit) = limit {
        records.truncate(limit);
    }
    Ok(records)
}

fn read_task_run_records_from_base(
    root: &Path,
    base: &Path,
    records: &mut Vec<CliTaskRunRecordReport>,
) -> Result<(), String> {
    if !base.exists() {
        return Ok(());
    }

    for entry in
        fs::read_dir(base).map_err(|error| format!("Failed to read task run directory: {error}"))?
    {
        let Ok(entry) = entry else {
            continue;
        };
        let path = entry.path();
        if !path.is_dir() {
            continue;
        }
        let record_path = path.join("record.json");
        if !record_path.is_file() {
            continue;
        }
        let Ok(content) = fs::read_to_string(&record_path) else {
            continue;
        };
        let Ok(value) = serde_json::from_str::<Value>(&content) else {
            continue;
        };
        records.push(task_run_record_report_from_value(
            root,
            &record_path,
            &value,
        ));
    }
    Ok(())
}

fn read_task_run_detail(
    app: &AppHandle,
    task_run_id: &str,
) -> Result<CliTaskRunDetailReport, String> {
    let task_run_id = task_run_id.trim();
    if task_run_id.is_empty() {
        return Err("Task run id is required.".to_string());
    }

    let root = workspace_root_for_app(Some(app))?;
    let run_dir = resolve_task_run_dir(app, &root, task_run_id)?;
    let record_path = run_dir.join("record.json");
    if !record_path.is_file() {
        return Err(format!("Task run record was not found: {task_run_id}"));
    }

    let record_json = fs::read_to_string(&record_path)
        .map_err(|error| format!("Failed to read task run record: {error}"))?;
    let record_value: Value = serde_json::from_str(&record_json)
        .map_err(|error| format!("Failed to parse task run record: {error}"))?;
    let record = task_run_record_report_from_value(&root, &record_path, &record_value);
    let (stdout_preview, stdout_truncated) =
        read_bounded_text_preview(&run_dir.join("stdout.log"), MAX_TASK_RUN_LOG_PREVIEW_BYTES)?;
    let (stderr_preview, stderr_truncated) =
        read_bounded_text_preview(&run_dir.join("stderr.log"), MAX_TASK_RUN_LOG_PREVIEW_BYTES)?;

    Ok(CliTaskRunDetailReport {
        record,
        record_json,
        stdout_preview,
        stderr_preview,
        stdout_truncated,
        stderr_truncated,
        max_log_preview_bytes: MAX_TASK_RUN_LOG_PREVIEW_BYTES,
    })
}

fn prune_task_run_records(
    app: &AppHandle,
    keep_count: Option<usize>,
) -> Result<CliTaskRunPruneReport, String> {
    let root = workspace_root_for_app(Some(app))?;
    let base = task_runs_base_path(app)?;
    if !base.exists() {
        return Ok(CliTaskRunPruneReport {
            status: "no_task_run_store".to_string(),
            keep_count: keep_count.unwrap_or(DEFAULT_TASK_RUN_PRUNE_KEEP_COUNT),
            before_count: 0,
            after_count: 0,
            removed_count: 0,
            removed_task_run_ids: Vec::new(),
            errors: Vec::new(),
        });
    }

    let keep_count = keep_count
        .unwrap_or(DEFAULT_TASK_RUN_PRUNE_KEEP_COUNT)
        .clamp(1, MAX_TASK_RUN_RECORDS);
    let mut records = Vec::new();
    read_task_run_records_from_base(&root, &base, &mut records)?;
    records.sort_by(|left, right| right.updated_at.cmp(&left.updated_at));
    let before_count = records.len();
    let mut removed_task_run_ids = Vec::new();
    let mut errors = Vec::new();

    for record in records.iter().skip(keep_count) {
        match resolve_task_run_dir_in_base(&root, &base, &record.task_run_id) {
            Ok(run_dir) => {
                if let Err(error) = fs::remove_dir_all(&run_dir) {
                    errors.push(format!("{}: {error}", record.task_run_id));
                } else {
                    removed_task_run_ids.push(record.task_run_id.clone());
                }
            }
            Err(error) => errors.push(format!("{}: {error}", record.task_run_id)),
        }
    }

    let mut after_records = Vec::new();
    read_task_run_records_from_base(&root, &base, &mut after_records)?;
    let after_count = after_records.len();
    let status = if errors.is_empty() {
        "pruned".to_string()
    } else if removed_task_run_ids.is_empty() {
        "prune_failed".to_string()
    } else {
        "partially_pruned".to_string()
    };

    Ok(CliTaskRunPruneReport {
        status,
        keep_count,
        before_count,
        after_count,
        removed_count: removed_task_run_ids.len(),
        removed_task_run_ids,
        errors,
    })
}

fn task_run_record_report_from_value(
    root: &Path,
    record_path: &Path,
    value: &Value,
) -> CliTaskRunRecordReport {
    let paths = value.get("paths").unwrap_or(&Value::Null);
    CliTaskRunRecordReport {
        record_id: value_string(value, "record_id", "unknown-task-run-record"),
        session_id: value_string(value, "session_id", "unknown-session"),
        task_run_id: value_string(value, "task_run_id", "unknown-task-run"),
        task_kind: value_string(value, "task_kind", "unknown"),
        pipeline_id: value
            .get("pipeline_id")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned),
        lane_id: value
            .get("lane_id")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned),
        lane_role: value
            .get("lane_role")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned),
        adapter_id: value_string(value, "adapter_id", "unknown-adapter"),
        label: value_string(value, "label", "Unknown CLI"),
        command: value_string(value, "command", ""),
        status: value_string(value, "status", "unknown"),
        exit_code: value
            .get("exit_code")
            .and_then(Value::as_i64)
            .map(|code| code as i32),
        started_at: value_string(value, "started_at", ""),
        updated_at: value_string(value, "updated_at", ""),
        elapsed_ms: value.get("elapsed_ms").and_then(Value::as_u64).unwrap_or(0) as u128,
        working_dir: value_string(value, "working_dir", ""),
        stdout_bytes: value
            .get("stdout_bytes")
            .and_then(Value::as_u64)
            .unwrap_or(0) as usize,
        stderr_bytes: value
            .get("stderr_bytes")
            .and_then(Value::as_u64)
            .unwrap_or(0) as usize,
        output_truncated: value
            .get("output_truncated")
            .and_then(Value::as_bool)
            .unwrap_or(false),
        decision_inbox_items: value
            .get("decision_inbox_items")
            .and_then(Value::as_u64)
            .unwrap_or(0) as usize,
        pending_decision_prompts: value
            .get("pending_decision_prompts")
            .and_then(Value::as_u64)
            .unwrap_or(0) as usize,
        deferred_prompt_count: value
            .get("deferred_prompt_count")
            .and_then(Value::as_u64)
            .unwrap_or(0) as usize,
        auto_defer_questions: value
            .get("auto_defer_questions")
            .and_then(Value::as_bool)
            .unwrap_or(false),
        auto_defer_triggered: value
            .get("auto_defer_triggered")
            .and_then(Value::as_bool)
            .unwrap_or(false),
        record_path: paths
            .get("record")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned)
            .unwrap_or_else(|| workspace_relative_display_path(root, record_path)),
        stdout_log_path: paths
            .get("stdout_log")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned)
            .unwrap_or_default(),
        stderr_log_path: paths
            .get("stderr_log")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned)
            .unwrap_or_default(),
    }
}

fn task_runs_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?.join("task-runs"))
}

fn legacy_task_runs_base_path(root: &Path) -> PathBuf {
    platform_artifacts_base_path(root).join("task-runs")
}

fn task_run_dir(app: &AppHandle, task_run_id: &str) -> Result<PathBuf, String> {
    Ok(task_runs_base_path(app)?.join(sanitize_file_name(task_run_id)))
}

fn resolve_task_run_dir(
    app: &AppHandle,
    root: &Path,
    task_run_id: &str,
) -> Result<PathBuf, String> {
    let runtime_base = task_runs_base_path(app)?;
    let runtime_dir = runtime_base.join(sanitize_file_name(task_run_id));
    if runtime_dir.exists() {
        return resolve_task_run_dir_in_base(root, &runtime_base, task_run_id);
    }
    let legacy_base = legacy_task_runs_base_path(root);
    let legacy_dir = legacy_base.join(sanitize_file_name(task_run_id));
    if legacy_dir.exists() {
        return resolve_task_run_dir_in_base(root, &legacy_base, task_run_id);
    }
    Err(format!("Task run record was not found: {task_run_id}"))
}

fn resolve_task_run_dir_in_base(
    root: &Path,
    base: &Path,
    task_run_id: &str,
) -> Result<PathBuf, String> {
    let run_dir = base.join(sanitize_file_name(task_run_id));
    let canonical_base = base
        .canonicalize()
        .map_err(|error| format!("Failed to resolve task run base directory: {error}"))?;
    let canonical_run_dir = run_dir
        .canonicalize()
        .map_err(|error| format!("Failed to resolve task run directory: {error}"))?;
    if canonical_run_dir.starts_with(root) {
        ensure_workspace_path(root, &canonical_run_dir)?;
    }
    if !canonical_run_dir.starts_with(&canonical_base) {
        return Err("Task run path is outside the task run store.".to_string());
    }
    if !canonical_run_dir.is_dir() {
        return Err("Task run path is not a directory.".to_string());
    }
    Ok(canonical_run_dir)
}

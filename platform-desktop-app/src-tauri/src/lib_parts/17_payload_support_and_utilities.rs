fn run_installer_payload_audit_report(
    app: &AppHandle,
) -> Result<InstallerPayloadAuditReport, String> {
    let created_at = current_unix_millis_label();
    let scan_root = app
        .path()
        .resource_dir()
        .map_err(|error| format!("Failed to resolve Tauri resource directory: {error}"))?;
    let mut state = PayloadScanState::default();
    scan_installer_payload_path(&scan_root, &scan_root, &mut state)?;
    let has_high = state
        .findings
        .iter()
        .any(|finding| finding.severity == "high");
    let status = if has_high {
        "attention_required"
    } else {
        "passed"
    }
    .to_string();
    let audit_dir = payload_audits_base_path(app)?;
    fs::create_dir_all(&audit_dir)
        .map_err(|error| format!("Failed to create payload audit directory: {error}"))?;
    let audit_path = audit_dir.join(format!(
        "installer-payload-audit-{}.json",
        file_safe_timestamp_label()
    ));
    let report = InstallerPayloadAuditReport {
        status,
        scanned_paths: vec![path_to_string(&scan_root)],
        scanned_files: state.scanned_files,
        scanned_bytes: state.scanned_bytes,
        flagged_count: state.findings.len(),
        findings: state.findings,
        skipped_dirs: state.skipped_dirs,
        max_scan_files: MAX_PAYLOAD_SCAN_FILES,
        audit_path: path_to_string(&audit_path),
        created_at,
    };
    write_pretty_json(&audit_path, &report)?;
    Ok(report)
}

#[derive(Default)]
struct PayloadScanState {
    scanned_files: usize,
    scanned_bytes: u64,
    findings: Vec<InstallerPayloadFinding>,
    skipped_dirs: Vec<String>,
}

fn scan_installer_payload_path(
    base: &Path,
    path: &Path,
    state: &mut PayloadScanState,
) -> Result<(), String> {
    if state.scanned_files >= MAX_PAYLOAD_SCAN_FILES {
        state.skipped_dirs.push(format!(
            "{}: max scan file limit reached",
            relative_payload_path(base, path)
        ));
        return Ok(());
    }

    let metadata = match fs::metadata(path) {
        Ok(metadata) => metadata,
        Err(error) => {
            state.findings.push(payload_finding(
                "payload_metadata_unreadable",
                "warning",
                base,
                path,
                &format!("Could not read bundled payload metadata: {error}"),
            ));
            return Ok(());
        }
    };

    if metadata.is_dir() {
        if let Some(reason) = disallowed_payload_dir_reason(path) {
            state.findings.push(payload_finding(
                "disallowed_payload_directory",
                "high",
                base,
                path,
                reason,
            ));
            state.skipped_dirs.push(relative_payload_path(base, path));
            return Ok(());
        }
        for entry in fs::read_dir(path)
            .map_err(|error| format!("Failed to scan bundled payload directory: {error}"))?
        {
            let Ok(entry) = entry else {
                continue;
            };
            scan_installer_payload_path(base, &entry.path(), state)?;
            if state.scanned_files >= MAX_PAYLOAD_SCAN_FILES {
                break;
            }
        }
        return Ok(());
    }

    if !metadata.is_file() {
        return Ok(());
    }

    state.scanned_files += 1;
    state.scanned_bytes = state.scanned_bytes.saturating_add(metadata.len());

    if let Some(reason) = disallowed_payload_file_reason(path) {
        state.findings.push(payload_finding(
            "disallowed_payload_file",
            "high",
            base,
            path,
            reason,
        ));
    }
    if path.file_name().and_then(|value| value.to_str()) == Some("workspace-snapshot.json") {
        audit_workspace_snapshot_file(base, path, state);
    }
    Ok(())
}

fn disallowed_payload_dir_reason(path: &Path) -> Option<&'static str> {
    let name = path.file_name()?.to_str()?;
    match name {
        "_private" => Some("Private local vault must never be bundled."),
        "outputs" => Some("Transient local outputs must not be included in installer payload."),
        ".git" => Some("Repository metadata must not be included in installer payload."),
        "src-tauri" | "src" | "components" | "scripts" => {
            Some("Developer source directory appears inside installer payload.")
        }
        _ => None,
    }
}

fn disallowed_payload_file_reason(path: &Path) -> Option<&'static str> {
    let relative = path_to_string(path);
    if relative.contains("/_private/") || relative.contains("\\_private\\") {
        return Some("Private local vault file path appears inside installer payload.");
    }
    if relative.contains("/outputs/") || relative.contains("\\outputs\\") {
        return Some("Transient output file path appears inside installer payload.");
    }
    match path
        .extension()
        .and_then(|value| value.to_str())
        .unwrap_or_default()
    {
        "rs" | "ts" | "tsx" | "py" => {
            Some("Source file extension appears inside installer payload.")
        }
        "map" => Some("Source map may reveal original platform source."),
        _ => None,
    }
}

fn audit_workspace_snapshot_file(base: &Path, path: &Path, state: &mut PayloadScanState) {
    let Ok(content) = fs::read_to_string(path) else {
        state.findings.push(payload_finding(
            "workspace_snapshot_unreadable",
            "warning",
            base,
            path,
            "Bundled workspace snapshot could not be read for source visibility audit.",
        ));
        return;
    };
    let Ok(value) = serde_json::from_str::<Value>(&content) else {
        state.findings.push(payload_finding(
            "workspace_snapshot_invalid",
            "warning",
            base,
            path,
            "Bundled workspace snapshot is not valid JSON.",
        ));
        return;
    };
    let source_count = value
        .get("sourceFiles")
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);
    let document_count = value
        .get("documents")
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);
    if source_count > 0 || document_count > 0 {
        state.findings.push(payload_finding(
            "customer_snapshot_contains_internal_content",
            "high",
            base,
            path,
            "Bundled customer snapshot still contains source files or internal documents.",
        ));
    }
}

fn payload_finding(
    rule_id: &str,
    severity: &str,
    base: &Path,
    path: &Path,
    reason: &str,
) -> InstallerPayloadFinding {
    InstallerPayloadFinding {
        rule_id: rule_id.to_string(),
        severity: severity.to_string(),
        path: relative_payload_path(base, path),
        reason: reason.to_string(),
    }
}

fn create_support_diagnostic_bundle_report(
    app: &AppHandle,
) -> Result<SupportDiagnosticBundleReport, String> {
    let created_at = current_unix_millis_label();
    let bundle_id = format!("support-bundle-{}", file_safe_timestamp_label());
    let bundle_dir = support_bundles_base_path(app)?.join(&bundle_id);
    fs::create_dir_all(&bundle_dir)
        .map_err(|error| format!("Failed to create support bundle directory: {error}"))?;

    let runtime_roots = runtime_data_boundary_report(app)?;
    let payload_audit = run_installer_payload_audit_report(app)?;
    let task_runs =
        read_task_run_records_with_limit(app, Some(MAX_SUPPORT_BUNDLE_RECENT_TASK_RUNS))?;
    let task_run_summary = task_run_support_summary(&task_runs);
    let recent_events = task_run_recent_events_text(&task_runs);

    let runtime_roots_path = bundle_dir.join("runtime-roots.json");
    let installer_payload_audit_path = bundle_dir.join("installer-payload-audit.json");
    let task_run_summary_path = bundle_dir.join("task-run-summary.redacted.json");
    let recent_events_path = bundle_dir.join("recent-events.redacted.log");
    let manifest_path = bundle_dir.join("manifest.json");

    write_pretty_json(&runtime_roots_path, &runtime_roots)?;
    write_pretty_json(&installer_payload_audit_path, &payload_audit)?;
    write_pretty_json(&task_run_summary_path, &task_run_summary)?;
    fs::write(&recent_events_path, recent_events)
        .map_err(|error| format!("Failed to write support bundle recent events: {error}"))?;

    let included_files = vec![
        "runtime-roots.json".to_string(),
        "installer-payload-audit.json".to_string(),
        "task-run-summary.redacted.json".to_string(),
        "recent-events.redacted.log".to_string(),
        "manifest.json".to_string(),
    ];
    let manifest = json!({
        "schema_version": 1,
        "bundle_id": bundle_id,
        "created_at": created_at,
        "app": {
            "package": env!("CARGO_PKG_NAME"),
            "version": env!("CARGO_PKG_VERSION")
        },
        "redacted": true,
        "exclusions": [
            "raw stdout/stderr logs",
            "platform source files",
            "_private/ contents",
            "user secrets and credentials"
        ],
        "included_files": included_files,
        "payload_audit_status": payload_audit.status,
        "task_run_count": task_runs.len()
    });
    write_pretty_json(&manifest_path, &manifest)?;

    Ok(SupportDiagnosticBundleReport {
        status: "created".to_string(),
        bundle_id,
        bundle_dir: path_to_string(&bundle_dir),
        manifest_path: path_to_string(&manifest_path),
        runtime_roots_path: path_to_string(&runtime_roots_path),
        installer_payload_audit_path: path_to_string(&installer_payload_audit_path),
        task_run_summary_path: path_to_string(&task_run_summary_path),
        recent_events_path: path_to_string(&recent_events_path),
        included_files,
        redacted: true,
        created_at,
    })
}

fn task_run_support_summary(records: &[CliTaskRunRecordReport]) -> Value {
    let items: Vec<Value> = records
        .iter()
        .map(|record| {
            json!({
                "task_run_id": record.task_run_id,
                "task_kind": record.task_kind,
                "adapter_id": record.adapter_id,
                "status": record.status,
                "exit_code": record.exit_code,
                "started_at": record.started_at,
                "updated_at": record.updated_at,
                "elapsed_ms": record.elapsed_ms,
                "stdout_bytes": record.stdout_bytes,
                "stderr_bytes": record.stderr_bytes,
                "output_truncated": record.output_truncated,
                "decision_inbox_items": record.decision_inbox_items,
                "pending_decision_prompts": record.pending_decision_prompts,
                "record_path": redact_sensitive_text(&record.record_path),
            })
        })
        .collect();
    json!({
        "schema_version": 1,
        "redacted": true,
        "records": items
    })
}

fn task_run_recent_events_text(records: &[CliTaskRunRecordReport]) -> String {
    if records.is_empty() {
        return "No recent task-run records.\n".to_string();
    }
    let mut lines = Vec::new();
    for record in records.iter().take(MAX_SUPPORT_BUNDLE_RECENT_TASK_RUNS) {
        let line = format!(
            "{} | {} | {} | {} | {}",
            record.updated_at,
            record.status,
            record.adapter_id,
            record.task_kind,
            redact_sensitive_text(&record.record_path)
        );
        lines.push(truncate_chars(&line, MAX_SUPPORT_EVENT_CHARS));
    }
    format!("{}\n", lines.join("\n"))
}

fn write_pretty_json<T: Serialize>(path: &Path, value: &T) -> Result<(), String> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)
            .map_err(|error| format!("Failed to create JSON parent directory: {error}"))?;
    }
    let formatted = serde_json::to_string_pretty(value)
        .map_err(|error| format!("Failed to serialize JSON artifact: {error}"))?;
    fs::write(path, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write JSON artifact: {error}"))
}

fn restrict_secret_file_permissions(path: &Path) -> Result<(), String> {
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let permissions = fs::Permissions::from_mode(0o600);
        fs::set_permissions(path, permissions)
            .map_err(|error| format!("Failed to restrict secret file permissions: {error}"))?;
    }
    #[cfg(not(unix))]
    {
        let _ = path;
    }
    Ok(())
}

fn open_url_with_system_browser(app: &AppHandle, url: &str) -> Result<(), String> {
    app.opener()
        .open_url(url, None::<&str>)
        .map_err(|error| format!("Failed to open provider URL with Tauri opener: {error}"))
}

fn relative_payload_path(base: &Path, path: &Path) -> String {
    path.strip_prefix(base)
        .unwrap_or(path)
        .to_string_lossy()
        .replace('\\', "/")
}

fn path_to_string(path: &Path) -> String {
    path.to_string_lossy().replace('\\', "/")
}

fn redact_sensitive_text(value: &str) -> String {
    let mut redacted = value.to_string();
    if let Ok(home) = env::var("HOME") {
        if !home.is_empty() {
            redacted = redacted.replace(&home, "$HOME");
        }
    }
    if let Ok(root) = workspace_root() {
        redacted = redacted.replace(&path_to_string(&root), "$WORKSPACE");
    }
    for marker in [
        "token=",
        "password=",
        "secret=",
        "api_key=",
        "authorization:",
    ] {
        let lower = redacted.to_lowercase();
        if let Some(index) = lower.find(marker) {
            let end = redacted[index..]
                .find(|character: char| character.is_whitespace())
                .map(|offset| index + offset)
                .unwrap_or(redacted.len());
            redacted.replace_range(index..end, &format!("{marker}<redacted>"));
        }
    }
    redacted
}

fn truncate_chars(value: &str, max_chars: usize) -> String {
    let mut output: String = value.chars().take(max_chars).collect();
    if value.chars().count() > max_chars {
        output.push_str("...");
    }
    output
}

fn file_safe_timestamp_label() -> String {
    current_unix_millis_label().replace(':', "-")
}

#[derive(Default)]
struct DirectoryDataStats {
    file_count: usize,
    dir_count: usize,
    size_bytes: u64,
    latest_modified_ms: Option<u128>,
    scan_truncated: bool,
}

fn directory_data_stats(path: &Path, max_files: usize) -> DirectoryDataStats {
    let mut stats = DirectoryDataStats::default();
    scan_directory_data_stats(path, &mut stats, max_files);
    stats
}

fn single_file_data_stats(path: &Path) -> DirectoryDataStats {
    let mut stats = DirectoryDataStats::default();
    if let Ok(metadata) = fs::symlink_metadata(path) {
        stats.file_count = 1;
        stats.size_bytes = metadata.len();
        merge_latest_modified(&mut stats, &metadata);
    }
    stats
}

fn scan_directory_data_stats(path: &Path, stats: &mut DirectoryDataStats, max_files: usize) {
    if stats.file_count >= max_files {
        stats.scan_truncated = true;
        return;
    }

    let Ok(entries) = fs::read_dir(path) else {
        return;
    };
    for entry in entries.flatten() {
        let entry_path = entry.path();
        let Ok(metadata) = fs::symlink_metadata(&entry_path) else {
            continue;
        };
        if metadata.file_type().is_symlink() {
            continue;
        }
        merge_latest_modified(stats, &metadata);
        if metadata.is_dir() {
            stats.dir_count = stats.dir_count.saturating_add(1);
            scan_directory_data_stats(&entry_path, stats, max_files);
        } else if metadata.is_file() {
            stats.file_count = stats.file_count.saturating_add(1);
            stats.size_bytes = stats.size_bytes.saturating_add(metadata.len());
        }

        if stats.file_count >= max_files {
            stats.scan_truncated = true;
            break;
        }
    }
}

fn merge_latest_modified(stats: &mut DirectoryDataStats, metadata: &fs::Metadata) {
    let Ok(modified) = metadata.modified() else {
        return;
    };
    let Ok(duration) = modified.duration_since(UNIX_EPOCH) else {
        return;
    };
    let modified_ms = duration.as_millis();
    if stats
        .latest_modified_ms
        .map(|current| modified_ms > current)
        .unwrap_or(true)
    {
        stats.latest_modified_ms = Some(modified_ms);
    }
}

fn directory_latest_modified_label(stats: &DirectoryDataStats) -> String {
    stats
        .latest_modified_ms
        .map(|value| value.to_string())
        .unwrap_or_default()
}

fn count_immediate_dirs(path: &Path, max_entries: usize) -> usize {
    count_immediate_entries(path, max_entries, |metadata| metadata.is_dir())
}

fn count_immediate_files_with_extension(path: &Path, extension: &str, max_entries: usize) -> usize {
    let extension = extension.to_ascii_lowercase();
    let Ok(entries) = fs::read_dir(path) else {
        return 0;
    };
    entries
        .flatten()
        .take(max_entries)
        .filter(|entry| {
            let entry_path = entry.path();
            let has_extension = entry_path
                .extension()
                .and_then(|value| value.to_str())
                .map(|value| value.eq_ignore_ascii_case(&extension))
                .unwrap_or(false);
            has_extension
                && fs::symlink_metadata(&entry_path)
                    .map(|metadata| !metadata.file_type().is_symlink() && metadata.is_file())
                    .unwrap_or(false)
        })
        .count()
}

fn count_immediate_entries<F>(path: &Path, max_entries: usize, predicate: F) -> usize
where
    F: Fn(&fs::Metadata) -> bool,
{
    let Ok(entries) = fs::read_dir(path) else {
        return 0;
    };
    entries
        .flatten()
        .take(max_entries)
        .filter(|entry| {
            fs::symlink_metadata(entry.path())
                .map(|metadata| !metadata.file_type().is_symlink() && predicate(&metadata))
                .unwrap_or(false)
        })
        .count()
}

fn runtime_data_store_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(app
        .path()
        .app_data_dir()
        .map_err(|error| format!("Failed to resolve app data directory: {error}"))?
        .join("runtime-data"))
}

fn desktop_preferences_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(app
        .path()
        .app_config_dir()
        .map_err(|error| format!("Failed to resolve app config directory: {error}"))?
        .join("desktop-preferences.v1.json"))
}

fn provider_credentials_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(app
        .path()
        .app_config_dir()
        .map_err(|error| format!("Failed to resolve app config directory: {error}"))?
        .join("provider-credentials"))
}

fn provider_credentials_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(provider_credentials_base_path(app)?.join("provider-credentials.v2.json"))
}

fn legacy_provider_credentials_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(provider_credentials_base_path(app)?.join("provider-credentials.v1.json"))
}

fn accumulated_data_index_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?
        .join("indexes")
        .join("accumulated-data-overview.v1.json"))
}

fn agent_workspace_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?.join("agent-workspace"))
}

fn support_bundles_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?.join("support-bundles"))
}

fn payload_audits_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?.join("payload-audits"))
}

fn agent_factory_proposals_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?
        .join("agent-factory")
        .join("proposals"))
}

fn learning_feedback_decisions_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?
        .join("learning-feedback")
        .join("decisions"))
}

fn create_agent_factory_proposal_report(
    app: &AppHandle,
    input: AgentFactoryProposalInput,
) -> Result<AgentFactoryProposalReport, String> {
    let goal = normalize_factory_text(&input.goal, "Goal")?;
    let role = normalize_factory_text(&input.role, "Role")?;
    let label = normalize_optional_factory_text(&input.label).unwrap_or_else(|| {
        truncate_chars(
            goal.split('.').next().unwrap_or("Generated Agent").trim(),
            80,
        )
    });
    let agent_id = normalize_agent_slug(&input.agent_id, &label, &goal, "generated-agent");
    let owner_project = normalize_owner_project(&input.owner_project);
    let target_path = normalize_proposal_target_path(
        &input.target_path,
        &owner_project,
        &format!("{agent_id}.json"),
    );
    let validation_commands = normalize_factory_list(input.validation_commands);
    let tools = normalize_factory_list(input.tools);
    let guardrails = normalize_factory_list(input.guardrails);
    let output_contract =
        normalize_optional_factory_text(&input.output_contract).unwrap_or_else(|| {
            "Return a bounded result with evidence, validation status, and rollback notes."
                .to_string()
        });
    let rollback_plan =
        normalize_optional_factory_text(&input.rollback_plan).unwrap_or_else(|| {
            format!("Remove or disable {target_path} and archive the proposal record.")
        });
    let created_at = current_unix_millis_label();
    let proposal_id = format!("agent-proposal-{}-{agent_id}", file_safe_timestamp_label());
    let proposal_path = agent_factory_proposals_base_path(app)?.join(format!("{proposal_id}.json"));
    let validation_command = validation_commands
        .first()
        .cloned()
        .unwrap_or_else(|| {
            format!(
                "PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/{agent_id}.json"
            )
        });

    let spec = json!({
        "schema_version": "agent-factory-proposal.v1",
        "proposal_id": proposal_id,
        "status": "drafted",
        "created_at": created_at,
        "target_path": target_path,
        "agent": {
            "id": agent_id,
            "label": label,
            "goal": goal,
            "role": role,
            "owner_project": owner_project,
            "runtime_role": "bounded_capability",
            "recommended_session_mode": "platform_improvement",
            "recommended_task_pipe": "platform_improvement_pipe"
        },
        "tools": tools,
        "guardrails": guardrails,
        "output_contract": output_contract,
        "validation": {
            "commands": validation_commands,
            "primary_command": validation_command,
            "required_evidence": [
                "agent spec inspection passes",
                "request trace links source evidence",
                "rollback plan remains actionable"
            ]
        },
        "traceability": {
            "source": "desktop_agent_factory_wizard",
            "app_data_store": "agent_factory_proposals",
            "rollback_plan": rollback_plan,
            "privacy_boundary": "proposal stored in app-data runtime store, not bundled customer payload"
        }
    });

    write_pretty_json(&proposal_path, &spec)?;

    Ok(AgentFactoryProposalReport {
        status: "proposal_created".to_string(),
        proposal_id,
        proposal_path: path_to_string(&proposal_path),
        target_path,
        created_at,
        agent_id,
        label,
        validation_command,
        rollback_plan,
        spec,
    })
}

fn record_learning_improvement_decision_report(
    app: &AppHandle,
    input: LearningImprovementDecisionInput,
) -> Result<LearningImprovementDecisionReport, String> {
    let label = normalize_factory_text(&input.label, "Candidate label")?;
    let candidate_id = normalize_factory_slug(
        &input.candidate_id,
        &label,
        &input.source,
        "improvement-candidate",
    );
    let action = normalize_one_of(
        input.action,
        &["approve", "reject", "defer", "promote"],
        "defer",
    );
    let asset_type = normalize_one_of(
        input.asset_type,
        &[
            "prompt",
            "workflow",
            "template",
            "tool",
            "skill",
            "agent",
            "project_feature",
        ],
        "prompt",
    );
    let source = normalize_optional_factory_text(&input.source)
        .unwrap_or_else(|| "desktop_learning_feedback_loop".to_string());
    let evidence = normalize_factory_list(input.evidence);
    let target_path = normalize_proposal_target_path(
        &input.target_path,
        "agent-platform",
        &format!("{candidate_id}.json"),
    );
    let validation_command = normalize_optional_factory_text(&input.validation_command)
        .unwrap_or_else(|| "record validation command before promotion".to_string());
    let rollback_plan = normalize_optional_factory_text(&input.rollback_plan)
        .unwrap_or_else(|| "Mark this improvement decision rejected or disabled and keep the source evidence for audit.".to_string());
    let notes = normalize_optional_factory_text(&input.notes).unwrap_or_default();
    let created_at = current_unix_millis_label();
    let decision_id = format!(
        "learning-decision-{}-{candidate_id}",
        file_safe_timestamp_label()
    );
    let decision_path =
        learning_feedback_decisions_base_path(app)?.join(format!("{decision_id}.json"));
    let status = match action.as_str() {
        "approve" | "promote" => "promotion_recorded",
        "reject" => "rejection_recorded",
        _ => "deferred_recorded",
    }
    .to_string();
    let record = json!({
        "schema_version": "learning-improvement-decision.v1",
        "decision_id": decision_id,
        "status": status,
        "created_at": created_at,
        "candidate": {
            "id": candidate_id,
            "label": label,
            "source": source,
            "evidence": evidence
        },
        "decision": {
            "action": action,
            "asset_type": asset_type,
            "target_path": target_path,
            "validation_command": validation_command,
            "rollback_plan": rollback_plan,
            "notes": notes
        },
        "traceability": {
            "source": "desktop_learning_feedback_loop",
            "app_data_store": "learning_feedback_decisions",
            "privacy_boundary": "decision record stored in app-data runtime store, not bundled customer payload"
        }
    });

    write_pretty_json(&decision_path, &record)?;

    Ok(LearningImprovementDecisionReport {
        status,
        decision_id,
        decision_path: path_to_string(&decision_path),
        created_at,
        candidate_id,
        action,
        asset_type,
        target_path,
        validation_command,
        rollback_plan,
        record,
    })
}

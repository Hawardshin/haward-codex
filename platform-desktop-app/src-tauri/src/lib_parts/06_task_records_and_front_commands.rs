#[tauri::command]
fn list_cli_task_pipeline_presets() -> Vec<CliTaskPipelinePresetReport> {
    PIPELINE_PRESETS
        .iter()
        .map(pipeline_preset_report)
        .collect()
}

#[tauri::command]
fn list_cli_task_run_records(app: AppHandle) -> Result<Vec<CliTaskRunRecordReport>, String> {
    read_task_run_records(&app)
}

#[tauri::command]
fn read_cli_task_run_record(
    app: AppHandle,
    task_run_id: String,
) -> Result<CliTaskRunDetailReport, String> {
    read_task_run_detail(&app, &task_run_id)
}

#[tauri::command]
fn prune_cli_task_run_records(
    app: AppHandle,
    keep_count: Option<usize>,
) -> Result<CliTaskRunPruneReport, String> {
    prune_task_run_records(&app, keep_count)
}

#[tauri::command]
fn list_runtime_data_roots(app: AppHandle) -> Result<RuntimeDataBoundaryReport, String> {
    runtime_data_boundary_report(&app)
}

#[tauri::command]
fn get_accumulated_data_overview(app: AppHandle) -> Result<AccumulatedDataOverviewReport, String> {
    accumulated_data_overview_report(&app)
}

#[tauri::command]
fn run_installer_payload_audit(app: AppHandle) -> Result<InstallerPayloadAuditReport, String> {
    run_installer_payload_audit_report(&app)
}

#[tauri::command]
fn create_support_diagnostic_bundle(
    app: AppHandle,
) -> Result<SupportDiagnosticBundleReport, String> {
    create_support_diagnostic_bundle_report(&app)
}

#[tauri::command]
fn get_service_readiness_report(app: AppHandle) -> Result<ServiceReadinessReport, String> {
    service_readiness_report(&app)
}

#[tauri::command]
fn get_desktop_preferences(app: AppHandle) -> Result<DesktopPreferencesReport, String> {
    desktop_preferences_report(&app)
}

#[tauri::command]
fn save_desktop_preferences(
    app: AppHandle,
    preferences: DesktopPreferences,
) -> Result<DesktopPreferencesReport, String> {
    save_desktop_preferences_report(&app, preferences)
}

#[tauri::command]
fn list_provider_credentials(app: AppHandle) -> Result<ProviderCredentialReport, String> {
    features::providers::provider_credentials_report(&app)
}

#[tauri::command]
fn save_provider_credential(
    app: AppHandle,
    input: ProviderCredentialInput,
) -> Result<ProviderCredentialReport, String> {
    features::providers::save_provider_credential_report(&app, input)
}

#[tauri::command]
fn clear_provider_credential(
    app: AppHandle,
    provider_id: String,
) -> Result<ProviderCredentialReport, String> {
    features::providers::clear_provider_credential_report(&app, &provider_id)
}

#[tauri::command]
fn open_provider_auth_url(
    app: AppHandle,
    provider_id: String,
    purpose: Option<String>,
) -> Result<ProviderAuthUrlOpenReport, String> {
    features::providers::open_provider_auth_url_report(&app, &provider_id, purpose.as_deref())
}

#[tauri::command]
async fn verify_provider_subscription(
    app: AppHandle,
    provider_id: String,
) -> Result<ProviderCredentialReport, String> {
    features::providers::verify_provider_subscription_report(&app, &provider_id).await
}

#[tauri::command]
fn read_system_clipboard_text(app: AppHandle) -> Result<SystemClipboardTextReport, String> {
    read_system_clipboard_text_report(&app)
}

#[tauri::command]
fn write_system_clipboard_text(
    app: AppHandle,
    text: String,
) -> Result<SystemClipboardTextReport, String> {
    write_system_clipboard_text_report(&app, &text)
}

#[tauri::command]
async fn list_provider_models(
    app: AppHandle,
    provider_id: String,
) -> Result<ProviderModelCatalogReport, String> {
    features::providers::list_provider_models_report(&app, &provider_id).await
}

#[tauri::command]
async fn run_provider_agent_task(
    app: AppHandle,
    input: ProviderAgentTaskInput,
) -> Result<ProviderAgentTaskReport, String> {
    features::providers::run_provider_agent_task_report(&app, input).await
}

#[tauri::command]
fn get_desktop_workspace_state(app: AppHandle) -> Result<DesktopWorkspaceStateReport, String> {
    desktop_workspace_state_report(&app, None, None)
}

#[tauri::command]
fn set_desktop_workspace_path(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    path: String,
) -> Result<DesktopWorkspaceStateReport, String> {
    let report = set_desktop_workspace_path_report(&app, &path)?;
    cache_store.clear_cache()?;
    Ok(report)
}

#[tauri::command]
async fn choose_desktop_workspace_folder(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
) -> Result<DesktopWorkspaceStateReport, String> {
    let Some(folder_path) = app
        .dialog()
        .file()
        .set_title("작업공간 폴더 선택")
        .blocking_pick_folder()
    else {
        return desktop_workspace_state_report(
            &app,
            None,
            Some("folder_selection_canceled".to_string()),
        );
    };
    let path = folder_path
        .into_path()
        .map_err(|error| format!("Failed to resolve selected folder path: {error}"))?;
    let report = set_desktop_workspace_path_report(&app, &path_to_string(&path))?;
    cache_store.clear_cache()?;
    Ok(report)
}

#[tauri::command]
fn clone_desktop_workspace(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    repository_url: String,
    folder_name: Option<String>,
) -> Result<DesktopWorkspaceStateReport, String> {
    let report = clone_desktop_workspace_report(&app, &repository_url, folder_name.as_deref())?;
    cache_store.clear_cache()?;
    Ok(report)
}

#[tauri::command]
fn get_desktop_git_status(app: AppHandle) -> Result<DesktopGitStatusReport, String> {
    desktop_git_status_report(&app, None, None, None)
}

#[tauri::command]
fn run_desktop_git_action(
    app: AppHandle,
    input: DesktopGitActionInput,
) -> Result<DesktopGitActionReport, String> {
    run_desktop_git_action_report(&app, input)
}

#[tauri::command]
fn create_agent_factory_proposal(
    app: AppHandle,
    input: AgentFactoryProposalInput,
) -> Result<AgentFactoryProposalReport, String> {
    create_agent_factory_proposal_report(&app, input)
}

#[tauri::command]
fn record_learning_improvement_decision(
    app: AppHandle,
    input: LearningImprovementDecisionInput,
) -> Result<LearningImprovementDecisionReport, String> {
    record_learning_improvement_decision_report(&app, input)
}

#[tauri::command]
fn run_subagent_tool_plan(
    app: AppHandle,
    input: SubagentToolPlanInput,
) -> Result<SubagentToolPlanReport, String> {
    run_subagent_tool_plan_report(&app, input)
}

#[tauri::command]
fn start_subagent_tool_execution(
    app: AppHandle,
    store: State<'_, SessionStore>,
    input: SubagentToolExecutionInput,
) -> Result<CliSessionReport, String> {
    start_subagent_tool_execution_report(&app, store, input)
}

#[tauri::command]
fn start_subagent_tool_fanout(
    app: AppHandle,
    store: State<'_, SessionStore>,
    input: SubagentToolFanoutInput,
) -> Result<SubagentToolFanoutReport, String> {
    start_subagent_tool_fanout_report(&app, store, input)
}

#[tauri::command]
fn start_cli_adapter_session(
    app: AppHandle,
    store: State<'_, SessionStore>,
    adapter_id: String,
    prompt: String,
    working_dir: Option<String>,
    auto_defer_questions: Option<bool>,
    task_kind: Option<String>,
) -> Result<CliSessionReport, String> {
    if prompt.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Prompt is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let adapter =
        find_adapter(&adapter_id).ok_or_else(|| format!("Unknown adapter id: {adapter_id}"))?;
    let working_dir = resolve_workspace_dir(&app, working_dir.as_deref())?;
    let session_task_kind = normalize_task_kind(task_kind.as_deref(), "single_cli_session")?;
    let (session_id, mut session, report) = create_cli_session(
        &app,
        adapter,
        &prompt,
        working_dir,
        auto_defer_questions.unwrap_or(true),
        &session_task_kind,
        None,
        None,
        None,
    )?;
    match store.sessions.lock() {
        Ok(mut sessions) => {
            cleanup_finished_sessions_locked(&mut sessions);
            sessions.insert(session_id, session);
        }
        Err(_) => {
            dispose_cli_session_runtime(&mut session, "store_lock_failed");
            return Err("Failed to lock CLI session store.".to_string());
        }
    }
    Ok(report)
}

#[tauri::command]
fn start_cli_task_pipeline(
    app: AppHandle,
    store: State<'_, SessionStore>,
    task_kind: String,
    prompt: String,
    working_dir: Option<String>,
    auto_defer_questions: Option<bool>,
) -> Result<CliTaskPipelineInitReport, String> {
    if prompt.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Prompt is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let preset = find_pipeline_preset(&task_kind)
        .ok_or_else(|| format!("Unknown task pipe kind: {task_kind}"))?;
    let resolved_working_dir = resolve_workspace_dir(&app, working_dir.as_deref())?;
    let pipeline_id = new_session_id(preset.task_kind);
    let mut lane_reports = Vec::new();
    let mut pipe_reports = Vec::new();
    let mut pending_sessions: Vec<(String, CliSession)> = Vec::new();

    for lane in preset.lanes {
        let adapter = find_adapter(lane.adapter_id)
            .ok_or_else(|| format!("Unknown adapter id in pipe preset: {}", lane.adapter_id))?;
        if resolve_command(adapter.command).is_none() {
            let status = "capability_missing".to_string();
            lane_reports.push(CliTaskPipelineLaneReport {
                lane_id: lane.lane_id.to_string(),
                adapter_id: lane.adapter_id.to_string(),
                role: lane.role.to_string(),
                status: status.clone(),
                session: None,
                error: Some(format!(
                    "Command '{}' was not found on PATH.",
                    adapter.command
                )),
            });
            append_pipe_edges(
                &mut pipe_reports,
                &pipeline_id,
                lane.lane_id,
                preset.merge_gate,
                &status,
            );
            continue;
        }

        let lane_prompt = pipeline_lane_prompt(preset, lane, &prompt);
        if lane_prompt.len() > MAX_SESSION_INPUT_BYTES {
            let status = "init_failed".to_string();
            lane_reports.push(CliTaskPipelineLaneReport {
                lane_id: lane.lane_id.to_string(),
                adapter_id: lane.adapter_id.to_string(),
                role: lane.role.to_string(),
                status: status.clone(),
                session: None,
                error: Some(format!(
                    "Lane prompt is too large after pipe metadata was added. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
                )),
            });
            append_pipe_edges(
                &mut pipe_reports,
                &pipeline_id,
                lane.lane_id,
                preset.merge_gate,
                &status,
            );
            continue;
        }
        match create_cli_session(
            &app,
            adapter,
            &lane_prompt,
            resolved_working_dir.clone(),
            auto_defer_questions.unwrap_or(true),
            preset.task_kind,
            Some(&pipeline_id),
            Some(lane.lane_id),
            Some(lane.role),
        ) {
            Ok((session_id, session, report)) => {
                let status = report.status.clone();
                lane_reports.push(CliTaskPipelineLaneReport {
                    lane_id: lane.lane_id.to_string(),
                    adapter_id: lane.adapter_id.to_string(),
                    role: lane.role.to_string(),
                    status: status.clone(),
                    session: Some(report),
                    error: None,
                });
                append_pipe_edges(
                    &mut pipe_reports,
                    &pipeline_id,
                    lane.lane_id,
                    preset.merge_gate,
                    &status,
                );
                pending_sessions.push((session_id, session));
            }
            Err(error) => {
                let status = "init_failed".to_string();
                lane_reports.push(CliTaskPipelineLaneReport {
                    lane_id: lane.lane_id.to_string(),
                    adapter_id: lane.adapter_id.to_string(),
                    role: lane.role.to_string(),
                    status: status.clone(),
                    session: None,
                    error: Some(error),
                });
                append_pipe_edges(
                    &mut pipe_reports,
                    &pipeline_id,
                    lane.lane_id,
                    preset.merge_gate,
                    &status,
                );
            }
        }
    }

    let started_sessions = pending_sessions.len();
    let missing_lanes = lane_reports
        .iter()
        .filter(|lane| lane.status == "capability_missing")
        .count();
    let status = if started_sessions > 0 {
        "initialized"
    } else if missing_lanes == lane_reports.len() {
        "capability_missing"
    } else {
        "init_failed"
    };

    match store.sessions.lock() {
        Ok(mut sessions) => {
            cleanup_finished_sessions_locked(&mut sessions);
            for (session_id, session) in pending_sessions {
                sessions.insert(session_id, session);
            }
        }
        Err(_) => {
            for (_, mut session) in pending_sessions {
                dispose_cli_session_runtime(&mut session, "store_lock_failed");
            }
            return Err("Failed to lock CLI session store.".to_string());
        }
    }

    Ok(CliTaskPipelineInitReport {
        pipeline_id,
        task_kind: preset.task_kind.to_string(),
        label: preset.label.to_string(),
        status: status.to_string(),
        intent: preset.intent.to_string(),
        working_dir: resolved_working_dir.to_string_lossy().to_string(),
        prompt_bytes: prompt.len(),
        started_sessions,
        missing_lanes,
        merge_gate: preset.merge_gate.to_string(),
        bounded: true,
        max_output_bytes: MAX_SESSION_OUTPUT_BYTES,
        lanes: lane_reports,
        pipes: pipe_reports,
    })
}

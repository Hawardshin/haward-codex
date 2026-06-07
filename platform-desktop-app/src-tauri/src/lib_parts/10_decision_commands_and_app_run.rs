#[tauri::command]
fn list_human_decision_inbox() -> Result<HumanDecisionInboxReport, String> {
    let (_, inbox) = read_human_decision_inbox_value()?;
    human_decision_report(&inbox, None)
}

#[tauri::command]
fn answer_human_decision(
    decision_id: String,
    answer_type: String,
    answer_text: String,
) -> Result<HumanDecisionInboxReport, String> {
    update_human_decision_answer(
        &decision_id,
        &answer_type,
        &answer_text,
        "User answered the decision from the desktop decision inbox.",
    )
    .map(|update| update.report)
}

#[tauri::command]
fn answer_and_resume_human_decision(
    app: AppHandle,
    store: State<'_, SessionStore>,
    decision_id: String,
    answer_type: String,
    answer_text: String,
) -> Result<DecisionResumeReport, String> {
    let update = update_human_decision_answer(
        &decision_id,
        &answer_type,
        &answer_text,
        "User answered the decision from the desktop decision inbox and requested CLI session resume.",
    )?;
    let Some(session_id) = update.session_id.clone() else {
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: None,
            resume_status: "no_session_link".to_string(),
            resume_detail:
                "The decision was answered, but it is not linked to an active CLI session."
                    .to_string(),
        });
    };

    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let Some(session) = sessions.get_mut(&session_id) else {
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: None,
            resume_status: "session_not_found".to_string(),
            resume_detail: format!(
                "The decision was answered, but CLI session {session_id} is not currently loaded."
            ),
        });
    };
    if session.finished {
        let report = poll_session_locked(&app, &session_id, session);
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: Some(report),
            resume_status: "session_finished".to_string(),
            resume_detail: format!(
                "The decision was answered, but CLI session {session_id} has already finished."
            ),
        });
    }
    let Some(stdin) = session.stdin.as_mut() else {
        let report = poll_session_locked(&app, &session_id, session);
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: Some(report),
            resume_status: "stdin_unavailable".to_string(),
            resume_detail: format!(
                "The decision was answered, but CLI session {session_id} cannot accept stdin."
            ),
        });
    };

    if let Err(error) = stdin
        .write_all(answer_text.as_bytes())
        .and_then(|_| stdin.write_all(b"\n"))
        .and_then(|_| stdin.flush())
    {
        let report = poll_session_locked(&app, &session_id, session);
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: Some(report),
            resume_status: "resume_failed".to_string(),
            resume_detail: format!("The decision was answered, but writing to CLI session {session_id} failed: {error}"),
        });
    }

    session.defer_message_sent = false;
    let report = poll_session_locked(&app, &session_id, session);
    Ok(DecisionResumeReport {
        inbox: update.report,
        session: Some(report),
        resume_status: "resumed".to_string(),
        resume_detail: format!("Decision answer was sent to CLI session {session_id}."),
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let context = tauri::generate_context!();
    let updater_configured = context
        .config()
        .plugins
        .0
        .get("updater")
        .is_some_and(|value| value.is_object());
    let mut builder = tauri::Builder::default()
        .manage(SessionStore::default())
        .manage(PtySessionStore::default())
        .manage(WorkspaceResourceStore::default())
        .manage(PendingAppUpdate::default())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_clipboard_manager::init());

    if updater_configured {
        builder = builder.plugin(tauri_plugin_updater::Builder::new().build());
    }

    builder
        .setup(|app| {
            let handle = app.handle().clone();
            let cache_store = handle.state::<WorkspaceResourceStore>();
            if let Ok(root) = workspace_root_for_app(Some(&handle)) {
                let _ =
                    cache_store.start_background_warmup(root, false, "startup_workspace_os_warmup");
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            features::app_shell::app_health,
            features::app_shell::get_installer_shell_runtime_contract,
            features::app_shell::get_rust_runtime_feature_map,
            list_cli_adapters,
            run_cli_adapter_health,
            run_all_cli_adapter_health,
            check_runtime_terminal_setup,
            run_native_pipe_probe,
            run_native_os_action,
            list_cli_task_pipeline_presets,
            list_cli_task_run_records,
            read_cli_task_run_record,
            prune_cli_task_run_records,
            list_runtime_data_roots,
            get_accumulated_data_overview,
            run_installer_payload_audit,
            create_support_diagnostic_bundle,
            get_service_readiness_report,
            features::app_update::check_app_update,
            features::app_update::install_app_update,
            run_desktop_cli_setup,
            get_desktop_preferences,
            save_desktop_preferences,
            list_provider_credentials,
            save_provider_credential,
            clear_provider_credential,
            open_provider_auth_url,
            verify_provider_subscription,
            read_system_clipboard_text,
            write_system_clipboard_text,
            list_provider_models,
            run_provider_agent_task,
            get_desktop_workspace_state,
            set_desktop_workspace_path,
            choose_desktop_workspace_folder,
            clone_desktop_workspace,
            get_desktop_git_status,
            run_desktop_git_action,
            create_agent_factory_proposal,
            record_learning_improvement_decision,
            run_subagent_tool_plan,
            start_subagent_tool_execution,
            start_subagent_tool_fanout,
            start_cli_adapter_session,
            start_cli_task_pipeline,
            poll_cli_adapter_session,
            list_cli_adapter_sessions,
            start_cli_adapter_pty_session,
            start_native_pty_terminal,
            poll_native_pty_terminal_session,
            list_native_pty_terminal_sessions,
            write_native_pty_terminal_input,
            resize_native_pty_terminal,
            cancel_native_pty_terminal,
            write_cli_adapter_stdin,
            send_cli_adapter_defer_message,
            defer_all_cli_adapter_questions,
            cancel_cli_adapter_session,
            get_desktop_resource_snapshot,
            warm_workspace_os_resources,
            prepare_workspace_os_resources,
            list_workspace_text_files,
            read_workspace_text_file,
            write_workspace_text_file,
            list_human_decision_inbox,
            answer_human_decision,
            answer_and_resume_human_decision
        ])
        .run(context)
        .expect("error while running Agent Workspace Platform desktop shell");
}

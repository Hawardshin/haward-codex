fn create_cli_session(
    app: &AppHandle,
    adapter: &'static AdapterDefinition,
    prompt: &str,
    working_dir: PathBuf,
    auto_defer_questions: bool,
    task_kind: &str,
    pipeline_id: Option<&str>,
    lane_id: Option<&str>,
    lane_role: Option<&str>,
) -> Result<(String, CliSession, CliSessionReport), String> {
    let path = resolve_command(adapter.command)
        .ok_or_else(|| format!("Command '{}' was not found on PATH.", adapter.command))?;
    let session_id = new_session_id(adapter.adapter_id);
    let task_run_id = format!("task-run-{session_id}");
    let provider_env = features::providers::provider_env_for_adapter(app, adapter.adapter_id)?;
    let mut command = Command::new(&path);
    command
        .args(adapter.session_args)
        .current_dir(&working_dir)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());
    configure_process_group(&mut command);
    for (key, value) in provider_env {
        command.env(key, value);
    }
    let mut child = command
        .spawn()
        .map_err(|error| format!("Failed to start CLI session: {error}"))?;

    let mut stdin = match child.stdin.take() {
        Some(stdin) => stdin,
        None => {
            let _ = kill_and_wait_child(&mut child);
            return Err("Failed to capture CLI stdin.".to_string());
        }
    };
    if !prompt.trim().is_empty() {
        if let Err(error) = stdin
            .write_all(prompt.as_bytes())
            .and_then(|_| stdin.write_all(b"\n"))
            .and_then(|_| stdin.flush())
        {
            let _ = kill_and_wait_child(&mut child);
            return Err(format!("Failed to write initial prompt: {error}"));
        }
    }

    let stdout = match child.stdout.take() {
        Some(stdout) => stdout,
        None => {
            let _ = kill_and_wait_child(&mut child);
            return Err("Failed to capture CLI stdout.".to_string());
        }
    };
    let stderr = match child.stderr.take() {
        Some(stderr) => stderr,
        None => {
            let _ = kill_and_wait_child(&mut child);
            return Err("Failed to capture CLI stderr.".to_string());
        }
    };
    let output = Arc::new(Mutex::new(CliSessionOutput::default()));
    let stdout_output = Arc::clone(&output);
    let stderr_output = Arc::clone(&output);
    let stdout_handle = thread::spawn(move || {
        read_session_stream(stdout, stdout_output, true, MAX_SESSION_OUTPUT_BYTES);
    });
    let stderr_handle = thread::spawn(move || {
        read_session_stream(stderr, stderr_output, false, MAX_SESSION_OUTPUT_BYTES);
    });

    let mut session = CliSession {
        session_id: session_id.clone(),
        task_run_id,
        task_kind: task_kind.to_string(),
        pipeline_id: pipeline_id.map(ToOwned::to_owned),
        lane_id: lane_id.map(ToOwned::to_owned),
        lane_role: lane_role.map(ToOwned::to_owned),
        adapter_id: adapter.adapter_id.to_string(),
        label: adapter.label.to_string(),
        command: adapter.command.to_string(),
        child,
        stdin: Some(stdin),
        output,
        stdout_handle: Some(stdout_handle),
        stderr_handle: Some(stderr_handle),
        started: Instant::now(),
        timeout: Duration::from_millis(SESSION_TIMEOUT_MS),
        max_output_bytes: MAX_SESSION_OUTPUT_BYTES,
        working_dir,
        started_at: current_unix_millis_label(),
        prompt_preview: prompt_preview(prompt),
        status: "running".to_string(),
        exit_code: None,
        finished: false,
        finished_at: None,
        defer_message_sent: false,
        auto_defer_questions,
        auto_defer_triggered: false,
        decision_inbox_items: 0,
        deferred_prompt_keys: Vec::new(),
        decision_capture_error: None,
        task_record_path: None,
        stdout_log_path: None,
        stderr_log_path: None,
        persistence_error: None,
        last_persist_signature: String::new(),
    };
    let report = poll_session_locked(app, &session_id, &mut session);
    Ok((session_id, session, report))
}

#[tauri::command]
fn poll_cli_adapter_session(
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
        poll_session_locked(&app, &session_id, session)
    };
    cleanup_finished_sessions_locked(&mut sessions);
    Ok(report)
}

#[tauri::command]
fn list_cli_adapter_sessions(
    app: AppHandle,
    store: State<'_, SessionStore>,
) -> Result<Vec<CliSessionReport>, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let reports: Vec<CliSessionReport> = sessions
        .iter_mut()
        .map(|(session_id, session)| poll_session_locked(&app, session_id, session))
        .collect();
    cleanup_finished_sessions_locked(&mut sessions);
    Ok(reports)
}

#[tauri::command]
fn start_native_pty_terminal(
    app: AppHandle,
    store: State<'_, PtySessionStore>,
    working_dir: Option<String>,
    command: Option<String>,
    rows: Option<u16>,
    cols: Option<u16>,
) -> Result<NativePtySessionReport, String> {
    let working_dir = resolve_workspace_dir(&app, working_dir.as_deref())?;
    let command = command
        .map(|value| value.trim().to_string())
        .filter(|value| !value.is_empty())
        .unwrap_or_else(default_native_shell);
    if command.len() > 512 {
        return Err("PTY command is too long. Max length is 512 bytes.".to_string());
    }

    let (session_id, mut session, report) =
        create_native_pty_session(&command, working_dir, rows, cols, &[])?;
    match store.sessions.lock() {
        Ok(mut sessions) => {
            cleanup_finished_pty_sessions_locked(&mut sessions);
            sessions.insert(session_id, session);
        }
        Err(_) => {
            dispose_native_pty_session_runtime(&mut session, "store_lock_failed");
            return Err("Failed to lock native PTY session store.".to_string());
        }
    }
    Ok(report)
}

#[tauri::command]
fn start_cli_adapter_pty_session(
    app: AppHandle,
    store: State<'_, PtySessionStore>,
    adapter_id: String,
    prompt: Option<String>,
    working_dir: Option<String>,
    rows: Option<u16>,
    cols: Option<u16>,
) -> Result<CliAdapterPtyLaunchReport, String> {
    // Codex 같은 TUI형 CLI는 pipe가 아니라 실제 PTY에서 시작해야 로그인/승인/화면 제어가 정상 동작한다.
    let adapter =
        find_adapter(&adapter_id).ok_or_else(|| format!("Unknown adapter id: {adapter_id}"))?;
    let working_dir = resolve_workspace_dir(&app, working_dir.as_deref())?;
    let resolved_path = resolve_command(adapter.command)
        .ok_or_else(|| format!("Command '{}' was not found on PATH.", adapter.command))?;
    let provider_env = features::providers::provider_env_for_adapter(&app, adapter.adapter_id)?;
    let command = resolved_path.to_string_lossy().to_string();
    let (session_id, mut session, mut report) =
        create_native_pty_session(&command, working_dir, rows, cols, &provider_env)?;

    let startup_input = normalize_adapter_pty_startup_input(prompt.as_deref())?;
    if !startup_input.is_empty() {
        if let Some(writer) = session.writer.as_mut() {
            if let Err(error) = writer
                .write_all(startup_input.as_bytes())
                .and_then(|_| writer.flush())
            {
                dispose_native_pty_session_runtime(&mut session, "startup_write_failed");
                return Err(format!("Failed to write initial adapter PTY input: {error}"));
            }
            report = poll_native_pty_session_locked(&session_id, &mut session);
        }
    }

    match store.sessions.lock() {
        Ok(mut sessions) => {
            cleanup_finished_pty_sessions_locked(&mut sessions);
            sessions.insert(session_id, session);
        }
        Err(_) => {
            dispose_native_pty_session_runtime(&mut session, "store_lock_failed");
            return Err("Failed to lock native PTY session store.".to_string());
        }
    }

    Ok(CliAdapterPtyLaunchReport {
        adapter_id: adapter.adapter_id,
        label: adapter.label,
        command: adapter.command,
        resolved_path: resolved_path.to_string_lossy().to_string(),
        startup_input,
        terminal: report,
    })
}

#[tauri::command]
fn poll_native_pty_terminal_session(
    store: State<'_, PtySessionStore>,
    session_id: String,
) -> Result<NativePtySessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock native PTY session store.".to_string())?;
    let report = {
        let session = sessions
            .get_mut(&session_id)
            .ok_or_else(|| format!("Unknown native PTY session id: {session_id}"))?;
        poll_native_pty_session_locked(&session_id, session)
    };
    cleanup_finished_pty_sessions_locked(&mut sessions);
    Ok(report)
}

#[tauri::command]
fn list_native_pty_terminal_sessions(
    store: State<'_, PtySessionStore>,
) -> Result<Vec<NativePtySessionReport>, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock native PTY session store.".to_string())?;
    let reports: Vec<NativePtySessionReport> = sessions
        .iter_mut()
        .map(|(session_id, session)| poll_native_pty_session_locked(session_id, session))
        .collect();
    cleanup_finished_pty_sessions_locked(&mut sessions);
    Ok(reports)
}

#[tauri::command]
fn write_native_pty_terminal_input(
    store: State<'_, PtySessionStore>,
    session_id: String,
    input: String,
) -> Result<NativePtySessionReport, String> {
    if input.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Input is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock native PTY session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown native PTY session id: {session_id}"))?;
    if session.finished {
        return Err("Cannot write input to a finished native PTY session.".to_string());
    }
    let writer = session
        .writer
        .as_mut()
        .ok_or_else(|| "Native PTY writer is not available.".to_string())?;
    writer
        .write_all(input.as_bytes())
        .and_then(|_| writer.flush())
        .map_err(|error| format!("Failed to write native PTY input: {error}"))?;
    Ok(poll_native_pty_session_locked(&session_id, session))
}

#[tauri::command]
fn resize_native_pty_terminal(
    store: State<'_, PtySessionStore>,
    session_id: String,
    rows: u16,
    cols: u16,
) -> Result<NativePtySessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock native PTY session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown native PTY session id: {session_id}"))?;
    let size = normalized_pty_size(Some(rows), Some(cols));
    let master = session
        .master
        .as_mut()
        .ok_or_else(|| "Native PTY master is not available.".to_string())?;
    master
        .resize(size)
        .map_err(|error| format!("Failed to resize native PTY: {error}"))?;
    session.rows = size.rows;
    session.cols = size.cols;
    Ok(poll_native_pty_session_locked(&session_id, session))
}

#[tauri::command]
fn cancel_native_pty_terminal(
    store: State<'_, PtySessionStore>,
    session_id: String,
) -> Result<NativePtySessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock native PTY session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown native PTY session id: {session_id}"))?;
    let exit_code = kill_and_wait_pty_child(session.child.as_mut());
    mark_pty_session_finished(session, "canceled", exit_code);
    Ok(poll_native_pty_session_locked(&session_id, session))
}

#[tauri::command]
fn write_cli_adapter_stdin(
    app: AppHandle,
    store: State<'_, SessionStore>,
    session_id: String,
    input: String,
) -> Result<CliSessionReport, String> {
    if input.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Input is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown CLI session id: {session_id}"))?;
    if session.finished {
        return Err("Cannot write stdin to a finished CLI session.".to_string());
    }
    let stdin = session
        .stdin
        .as_mut()
        .ok_or_else(|| "CLI session stdin is not available.".to_string())?;
    stdin
        .write_all(input.as_bytes())
        .and_then(|_| stdin.write_all(b"\n"))
        .and_then(|_| stdin.flush())
        .map_err(|error| format!("Failed to write stdin: {error}"))?;
    session.defer_message_sent = false;
    session.decision_capture_error = None;
    Ok(poll_session_locked(&app, &session_id, session))
}

#[tauri::command]
fn send_cli_adapter_defer_message(
    app: AppHandle,
    store: State<'_, SessionStore>,
    session_id: String,
) -> Result<CliSessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown CLI session id: {session_id}"))?;
    if session.finished {
        return Err("Cannot defer a finished CLI session.".to_string());
    }
    defer_session_questions_locked(&session_id, session, "manual")?;
    Ok(poll_session_locked(&app, &session_id, session))
}

#[tauri::command]
fn defer_all_cli_adapter_questions(
    app: AppHandle,
    store: State<'_, SessionStore>,
) -> Result<Vec<CliSessionReport>, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let mut reports = Vec::new();
    for (session_id, session) in sessions.iter_mut() {
        if !session.finished {
            if let Err(error) = defer_session_questions_locked(session_id, session, "bulk") {
                session.decision_capture_error = Some(error);
            }
        }
        reports.push(poll_session_locked(&app, session_id, session));
    }
    Ok(reports)
}

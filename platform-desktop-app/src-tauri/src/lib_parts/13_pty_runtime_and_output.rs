fn cleanup_finished_sessions_locked(sessions: &mut HashMap<String, CliSession>) {
    let now = Instant::now();
    let retention = Duration::from_millis(FINISHED_SESSION_RETENTION_MS);
    let mut finished_sessions: Vec<(String, Instant)> = sessions
        .iter()
        .filter_map(|(session_id, session)| {
            if session.finished {
                Some((
                    session_id.clone(),
                    session.finished_at.unwrap_or(session.started),
                ))
            } else {
                None
            }
        })
        .collect();

    if finished_sessions.is_empty() {
        return;
    }

    finished_sessions.sort_by_key(|(_, finished_at)| *finished_at);
    let mut remove_ids = HashSet::new();
    for (session_id, finished_at) in &finished_sessions {
        let age = now.checked_duration_since(*finished_at).unwrap_or_default();
        if age >= retention {
            remove_ids.insert(session_id.clone());
        }
    }

    let retained_finished = finished_sessions.len().saturating_sub(remove_ids.len());
    if retained_finished > MAX_RETAINED_FINISHED_SESSIONS {
        let overflow = retained_finished - MAX_RETAINED_FINISHED_SESSIONS;
        let overflow_ids: Vec<String> = finished_sessions
            .iter()
            .filter(|(session_id, _)| !remove_ids.contains(session_id))
            .take(overflow)
            .map(|(session_id, _)| session_id.clone())
            .collect();
        remove_ids.extend(overflow_ids);
    }

    for session_id in remove_ids {
        if let Some(mut session) = sessions.remove(&session_id) {
            finalize_finished_cli_session_runtime(&mut session);
        }
    }
}

fn create_native_pty_session(
    command: &str,
    working_dir: PathBuf,
    rows: Option<u16>,
    cols: Option<u16>,
    extra_env: &[(String, String)],
) -> Result<(String, NativePtySession, NativePtySessionReport), String> {
    let size = normalized_pty_size(rows, cols);
    let pty_system = native_pty_system();
    let pair = pty_system
        .openpty(size)
        .map_err(|error| format!("Failed to open native PTY: {error}"))?;

    let mut command_builder = CommandBuilder::new(command);
    command_builder.cwd(working_dir.as_os_str());
    command_builder.env("TERM", "xterm-256color");
    command_builder.env("COLORTERM", "truecolor");
    for (key, value) in extra_env {
        command_builder.env(key, value);
    }

    let mut child = pair
        .slave
        .spawn_command(command_builder)
        .map_err(|error| format!("Failed to start native PTY command: {error}"))?;
    let reader = match pair.master.try_clone_reader() {
        Ok(reader) => reader,
        Err(error) => {
            let _ = kill_and_wait_pty_child(child.as_mut());
            return Err(format!("Failed to clone native PTY reader: {error}"));
        }
    };
    let writer = match pair.master.take_writer() {
        Ok(writer) => writer,
        Err(error) => {
            let _ = kill_and_wait_pty_child(child.as_mut());
            return Err(format!("Failed to open native PTY writer: {error}"));
        }
    };

    let output = Arc::new(Mutex::new(NativePtyOutput::default()));
    let reader_output = Arc::clone(&output);
    let reader_handle = thread::spawn(move || {
        read_native_pty_stream(reader, reader_output, MAX_SESSION_OUTPUT_BYTES);
    });

    let session_id = new_session_id("native-pty");
    let label = native_shell_label(command);
    let mut session = NativePtySession {
        label,
        command: command.to_string(),
        child,
        master: Some(pair.master),
        writer: Some(writer),
        output,
        reader_handle: Some(reader_handle),
        started: Instant::now(),
        working_dir,
        status: "running".to_string(),
        exit_code: None,
        finished: false,
        finished_at: None,
        rows: size.rows,
        cols: size.cols,
        pid: None,
    };
    session.pid = session.child.process_id();
    let report = poll_native_pty_session_locked(&session_id, &mut session);
    Ok((session_id, session, report))
}

fn poll_native_pty_session_locked(
    session_id: &str,
    session: &mut NativePtySession,
) -> NativePtySessionReport {
    if !session.finished {
        match session.child.try_wait() {
            Ok(Some(status)) => {
                let next_status = if status.success() { "exited" } else { "failed" };
                mark_pty_session_finished(session, next_status, Some(status.exit_code() as i32));
            }
            Ok(None) => {}
            Err(_) => {
                let exit_code = kill_and_wait_pty_child(session.child.as_mut());
                mark_pty_session_finished(session, "error", exit_code);
            }
        }
    }
    if session.finished {
        finalize_finished_native_pty_runtime(session);
    } else {
        join_finished_reader(&mut session.reader_handle);
    }
    native_pty_session_report(session_id, session)
}

fn mark_pty_session_finished(
    session: &mut NativePtySession,
    status: impl Into<String>,
    exit_code: Option<i32>,
) {
    session.exit_code = exit_code;
    session.status = status.into();
    session.finished = true;
    if session.finished_at.is_none() {
        session.finished_at = Some(Instant::now());
    }
    session.writer.take();
    session.master.take();
}

fn finalize_finished_native_pty_runtime(session: &mut NativePtySession) {
    session.writer.take();
    session.master.take();
    join_reader_with_grace(&mut session.reader_handle);
}

fn dispose_native_pty_session_runtime(session: &mut NativePtySession, status: &str) {
    session.writer.take();
    if !session.finished {
        let exit_code = kill_and_wait_pty_child(session.child.as_mut());
        mark_pty_session_finished(session, status, exit_code);
    }
    finalize_finished_native_pty_runtime(session);
}

fn kill_and_wait_pty_child(child: &mut (dyn portable_pty::Child + Send + Sync)) -> Option<i32> {
    let _ = child.kill();
    child
        .wait()
        .ok()
        .map(|exit_status| exit_status.exit_code() as i32)
}

fn cleanup_finished_pty_sessions_locked(sessions: &mut HashMap<String, NativePtySession>) {
    let now = Instant::now();
    let retention = Duration::from_millis(FINISHED_SESSION_RETENTION_MS);
    let mut finished_sessions: Vec<(String, Instant)> = sessions
        .iter()
        .filter_map(|(session_id, session)| {
            if session.finished {
                Some((
                    session_id.clone(),
                    session.finished_at.unwrap_or(session.started),
                ))
            } else {
                None
            }
        })
        .collect();

    if finished_sessions.is_empty() {
        return;
    }

    finished_sessions.sort_by_key(|(_, finished_at)| *finished_at);
    let mut remove_ids = HashSet::new();
    for (session_id, finished_at) in &finished_sessions {
        let age = now.checked_duration_since(*finished_at).unwrap_or_default();
        if age >= retention {
            remove_ids.insert(session_id.clone());
        }
    }

    let retained_finished = finished_sessions.len().saturating_sub(remove_ids.len());
    if retained_finished > MAX_RETAINED_FINISHED_SESSIONS {
        let overflow = retained_finished - MAX_RETAINED_FINISHED_SESSIONS;
        let overflow_ids: Vec<String> = finished_sessions
            .iter()
            .filter(|(session_id, _)| !remove_ids.contains(session_id))
            .take(overflow)
            .map(|(session_id, _)| session_id.clone())
            .collect();
        remove_ids.extend(overflow_ids);
    }

    for session_id in remove_ids {
        if let Some(mut session) = sessions.remove(&session_id) {
            finalize_finished_native_pty_runtime(&mut session);
        }
    }
}

fn native_pty_session_report(
    session_id: &str,
    session: &NativePtySession,
) -> NativePtySessionReport {
    let output = session
        .output
        .lock()
        .map(|value| value.clone())
        .unwrap_or_default();
    NativePtySessionReport {
        session_id: session_id.to_string(),
        label: session.label.clone(),
        command: session.command.clone(),
        status: session.status.clone(),
        exit_code: session.exit_code,
        elapsed_ms: session.started.elapsed().as_millis(),
        output: output.output,
        output_truncated: output.output_truncated,
        working_dir: session.working_dir.to_string_lossy().to_string(),
        rows: session.rows,
        cols: session.cols,
        pid: session.pid,
        terminal_kind: "native_pty".to_string(),
    }
}

fn normalize_adapter_pty_startup_input(prompt: Option<&str>) -> Result<String, String> {
    let Some(prompt) = prompt.map(str::trim).filter(|value| !value.is_empty()) else {
        return Ok(String::new());
    };
    if prompt.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Initial adapter PTY input is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }
    if prompt.ends_with('\n') {
        Ok(prompt.to_string())
    } else {
        Ok(format!("{prompt}\n"))
    }
}

fn session_report(session_id: &str, session: &CliSession) -> CliSessionReport {
    let output = session
        .output
        .lock()
        .map(|value| value.clone())
        .unwrap_or_default();
    let decision_output = recent_session_output(&output);
    let decision_prompts =
        detect_decision_prompts_for(&session.adapter_id, &session.label, &decision_output);
    let pending_decision_prompts = decision_prompts
        .iter()
        .filter(|prompt| {
            let key = decision_prompt_key(&prompt.question);
            !session
                .deferred_prompt_keys
                .iter()
                .any(|existing| existing == &key)
        })
        .count();
    let status = if !session.finished && session.defer_message_sent {
        "defer_message_sent".to_string()
    } else {
        session.status.clone()
    };

    CliSessionReport {
        session_id: session_id.to_string(),
        task_run_id: session.task_run_id.clone(),
        task_kind: session.task_kind.clone(),
        pipeline_id: session.pipeline_id.clone(),
        lane_id: session.lane_id.clone(),
        lane_role: session.lane_role.clone(),
        adapter_id: session.adapter_id.clone(),
        label: session.label.clone(),
        command: session.command.clone(),
        status,
        exit_code: session.exit_code,
        elapsed_ms: session.started.elapsed().as_millis(),
        stdout: output.stdout,
        stderr: output.stderr,
        decision_prompts,
        bounded: true,
        max_output_bytes: session.max_output_bytes,
        output_truncated: output.stdout_truncated || output.stderr_truncated,
        working_dir: session.working_dir.to_string_lossy().to_string(),
        defer_message_sent: session.defer_message_sent,
        auto_defer_questions: session.auto_defer_questions,
        auto_defer_triggered: session.auto_defer_triggered,
        decision_inbox_items: session.decision_inbox_items,
        pending_decision_prompts,
        deferred_prompt_count: session.deferred_prompt_keys.len(),
        decision_capture_error: session.decision_capture_error.clone(),
        task_record_path: session.task_record_path.clone(),
        stdout_log_path: session.stdout_log_path.clone(),
        stderr_log_path: session.stderr_log_path.clone(),
        persistence_error: session.persistence_error.clone(),
    }
}

fn read_session_stream<R: Read>(
    mut reader: R,
    output: Arc<Mutex<CliSessionOutput>>,
    is_stdout: bool,
    max_output_bytes: usize,
) {
    let mut buffer = [0_u8; 1024];

    loop {
        match reader.read(&mut buffer) {
            Ok(0) => break,
            Ok(read_count) => {
                let text = String::from_utf8_lossy(&buffer[..read_count]).to_string();
                if let Ok(mut locked) = output.lock() {
                    append_session_output(&mut locked, is_stdout, &text, max_output_bytes);
                }
            }
            Err(_) => break,
        }
    }
}

fn append_session_output(
    output: &mut CliSessionOutput,
    is_stdout: bool,
    text: &str,
    max_output_bytes: usize,
) {
    let (target, truncated) = if is_stdout {
        (&mut output.stdout, &mut output.stdout_truncated)
    } else {
        (&mut output.stderr, &mut output.stderr_truncated)
    };
    let remaining = max_output_bytes.saturating_sub(target.len());
    if remaining == 0 {
        *truncated = true;
        return;
    }
    if text.len() <= remaining {
        target.push_str(text);
    } else {
        let mut end = remaining;
        while end > 0 && !text.is_char_boundary(end) {
            end -= 1;
        }
        target.push_str(&text[..end]);
        *truncated = true;
    }
}

fn read_native_pty_stream<R: Read>(
    mut reader: R,
    output: Arc<Mutex<NativePtyOutput>>,
    max_output_bytes: usize,
) {
    let mut buffer = [0_u8; 4096];

    loop {
        match reader.read(&mut buffer) {
            Ok(0) => break,
            Ok(read_count) => {
                let text = String::from_utf8_lossy(&buffer[..read_count]).to_string();
                if let Ok(mut locked) = output.lock() {
                    append_native_pty_output(&mut locked, &text, max_output_bytes);
                }
            }
            Err(_) => break,
        }
    }
}

fn append_native_pty_output(output: &mut NativePtyOutput, text: &str, max_output_bytes: usize) {
    let remaining = max_output_bytes.saturating_sub(output.output.len());
    if remaining == 0 {
        output.output_truncated = true;
        return;
    }
    if text.len() <= remaining {
        output.output.push_str(text);
    } else {
        let mut end = remaining;
        while end > 0 && !text.is_char_boundary(end) {
            end -= 1;
        }
        output.output.push_str(&text[..end]);
        output.output_truncated = true;
    }
}

fn normalized_pty_size(rows: Option<u16>, cols: Option<u16>) -> PtySize {
    PtySize {
        rows: rows.unwrap_or(28).clamp(8, 80),
        cols: cols.unwrap_or(100).clamp(24, 240),
        pixel_width: 0,
        pixel_height: 0,
    }
}

fn default_native_shell() -> String {
    #[cfg(windows)]
    {
        env::var("ComSpec")
            .map(|value| value.trim().to_string())
            .ok()
            .filter(|value| !value.is_empty())
            .unwrap_or_else(|| "cmd.exe".to_string())
    }
    #[cfg(not(windows))]
    {
        env::var("SHELL")
            .map(|value| value.trim().to_string())
            .ok()
            .filter(|value| !value.is_empty())
            .unwrap_or_else(|| {
                if Path::new("/bin/zsh").exists() {
                    "/bin/zsh".to_string()
                } else if Path::new("/bin/bash").exists() {
                    "/bin/bash".to_string()
                } else {
                    "sh".to_string()
                }
            })
    }
}

fn native_shell_label(command: &str) -> String {
    Path::new(command)
        .file_name()
        .and_then(|value| value.to_str())
        .filter(|value| !value.trim().is_empty())
        .unwrap_or(command)
        .to_string()
}

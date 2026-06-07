fn wait_native_pipe_children(
    mut producer: Child,
    mut consumer: Child,
    started: Instant,
    timeout: Duration,
) -> NativePipeWaitResult {
    let mut producer_exit_code = None;
    let mut consumer_exit_code = None;
    let mut producer_done = false;
    let mut consumer_done = false;
    let mut error = None;

    loop {
        if !producer_done {
            match producer.try_wait() {
                Ok(Some(status)) => {
                    producer_exit_code = status.code();
                    producer_done = true;
                }
                Ok(None) => {}
                Err(wait_error) => {
                    let exit_code = kill_and_wait_child(&mut producer);
                    producer_exit_code = exit_code;
                    producer_done = true;
                    error = Some(format!("Failed to wait for producer: {wait_error}"));
                }
            }
        }
        if !consumer_done {
            match consumer.try_wait() {
                Ok(Some(status)) => {
                    consumer_exit_code = status.code();
                    consumer_done = true;
                }
                Ok(None) => {}
                Err(wait_error) => {
                    let exit_code = kill_and_wait_child(&mut consumer);
                    consumer_exit_code = exit_code;
                    consumer_done = true;
                    error = Some(format!("Failed to wait for consumer: {wait_error}"));
                }
            }
        }

        if producer_done && consumer_done {
            return NativePipeWaitResult {
                producer_exit_code,
                consumer_exit_code,
                timed_out: false,
                error,
            };
        }
        if started.elapsed() >= timeout {
            if !producer_done {
                producer_exit_code = kill_and_wait_child(&mut producer);
            }
            if !consumer_done {
                consumer_exit_code = kill_and_wait_child(&mut consumer);
            }
            return NativePipeWaitResult {
                producer_exit_code,
                consumer_exit_code,
                timed_out: true,
                error,
            };
        }
        thread::sleep(Duration::from_millis(20));
    }
}

fn normalize_native_pipe_command(value: &str, role: &str) -> Result<String, String> {
    let command = value
        .trim()
        .chars()
        .take(MAX_TERMINAL_COMMAND_CHARS)
        .collect::<String>();
    if command.is_empty() {
        Err(format!("Native pipe {role} command is required."))
    } else {
        Ok(command)
    }
}

fn normalize_native_pipe_args(args: Option<Vec<String>>) -> Result<Vec<String>, String> {
    let args = args.unwrap_or_default();
    if args.len() > MAX_NATIVE_PIPE_ARGS {
        return Err(format!(
            "Native pipe args are limited to {MAX_NATIVE_PIPE_ARGS} items."
        ));
    }
    Ok(args
        .into_iter()
        .map(|arg| {
            arg.chars()
                .take(MAX_NATIVE_PIPE_ARG_CHARS)
                .collect::<String>()
        })
        .collect())
}

fn apply_native_pipe_env_allowlist(command: &mut Command) {
    let path_env = env::var_os("PATH");
    command.env_clear();
    if let Some(path_env) = path_env {
        command.env("PATH", path_env);
    }
}

fn normalize_native_os_action(value: &str) -> Result<String, String> {
    let action = value.trim();
    match action {
        "open_path" | "reveal_path" | "open_external_terminal" => Ok(action.to_string()),
        _ => Err(
            "Native OS action must be open_path, reveal_path, or open_external_terminal."
                .to_string(),
        ),
    }
}

fn resolve_native_os_action_target(
    app: &AppHandle,
    target_path: Option<&str>,
    working_dir: &Path,
    directory_required: bool,
) -> Result<PathBuf, String> {
    let root = workspace_root_for_app(Some(app))?;
    let candidate = match target_path.map(str::trim).filter(|value| !value.is_empty()) {
        Some(path) => {
            let value = Path::new(path);
            if value.is_absolute() {
                value.to_path_buf()
            } else {
                working_dir.join(value)
            }
        }
        None => working_dir.to_path_buf(),
    };
    let canonical = candidate
        .canonicalize()
        .map_err(|error| format!("Failed to resolve native OS action target: {error}"))?;
    ensure_workspace_path(&root, &canonical)?;
    if directory_required && !canonical.is_dir() {
        return Err("Native external terminal target must be a directory.".to_string());
    }
    if !canonical.exists() {
        return Err("Native OS action target does not exist.".to_string());
    }
    Ok(canonical)
}

fn native_external_terminal_command(target_dir: &Path) -> Result<NativeOsCommandPlan, String> {
    if !target_dir.is_dir() {
        return Err("Native external terminal target must be a directory.".to_string());
    }

    #[cfg(target_os = "macos")]
    {
        let command_path = resolve_command("open")
            .ok_or_else(|| "macOS open command was not found on PATH.".to_string())?;
        return Ok(NativeOsCommandPlan {
            method: "macos_open_terminal_app".to_string(),
            command_path,
            args: vec![
                "-a".to_string(),
                "Terminal".to_string(),
                path_to_string(target_dir),
            ],
        });
    }

    #[cfg(target_os = "windows")]
    {
        let command_path = resolve_command("cmd")
            .ok_or_else(|| "Windows cmd command was not found on PATH.".to_string())?;
        return Ok(NativeOsCommandPlan {
            method: "windows_cmd_start_terminal".to_string(),
            command_path,
            args: vec![
                "/C".to_string(),
                "start".to_string(),
                "".to_string(),
                "cmd".to_string(),
                "/K".to_string(),
                "cd".to_string(),
                "/D".to_string(),
                path_to_string(target_dir),
            ],
        });
    }

    #[cfg(all(unix, not(target_os = "macos")))]
    {
        for (command, method, args) in [
            (
                "xdg-terminal-exec",
                "linux_xdg_terminal_exec",
                vec![path_to_string(target_dir)],
            ),
            (
                "gnome-terminal",
                "linux_gnome_terminal",
                vec![format!(
                    "--working-directory={}",
                    path_to_string(target_dir)
                )],
            ),
            (
                "konsole",
                "linux_konsole",
                vec!["--workdir".to_string(), path_to_string(target_dir)],
            ),
            (
                "xfce4-terminal",
                "linux_xfce4_terminal",
                vec![format!(
                    "--working-directory={}",
                    path_to_string(target_dir)
                )],
            ),
        ] {
            if let Some(command_path) = resolve_command(command) {
                return Ok(NativeOsCommandPlan {
                    method: method.to_string(),
                    command_path,
                    args,
                });
            }
        }
        Err("No supported external terminal launcher was found on PATH.".to_string())
    }

    #[cfg(not(any(unix, target_os = "windows")))]
    {
        let _ = target_dir;
        Err("External terminal launch is not supported on this operating system.".to_string())
    }
}

fn run_native_os_action_command(
    path: &PathBuf,
    args: &[String],
    cwd: &Path,
    timeout: Duration,
    max_output_bytes: usize,
) -> Result<ProcessOutput, String> {
    let started = Instant::now();
    let mut command = Command::new(path);
    command
        .args(args)
        .current_dir(cwd)
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());
    configure_process_group(&mut command);
    apply_native_pipe_env_allowlist(&mut command);
    let mut child = command
        .spawn()
        .map_err(|error| format!("Failed to spawn native OS action command: {error}"))?;

    let stdout = match child.stdout.take() {
        Some(stdout) => stdout,
        None => {
            let _ = kill_and_wait_child(&mut child);
            return Err("Failed to capture native OS action stdout.".to_string());
        }
    };
    let stderr = match child.stderr.take() {
        Some(stderr) => stderr,
        None => {
            let _ = kill_and_wait_child(&mut child);
            return Err("Failed to capture native OS action stderr.".to_string());
        }
    };

    let stdout_handle = thread::spawn(move || read_limited(stdout, max_output_bytes));
    let stderr_handle = thread::spawn(move || read_limited(stderr, max_output_bytes));
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || loop {
        match child.try_wait() {
            Ok(Some(status)) => {
                let _ = tx.send((status.code(), false));
                break;
            }
            Ok(None) => {
                if started.elapsed() >= timeout {
                    let status = kill_and_wait_child(&mut child);
                    let _ = tx.send((status, true));
                    break;
                }
                thread::sleep(Duration::from_millis(40));
            }
            Err(_) => {
                let _ = kill_and_wait_child(&mut child);
                let _ = tx.send((None, false));
                break;
            }
        }
    });

    let (exit_code, timed_out) = rx
        .recv_timeout(timeout + Duration::from_millis(500))
        .map_err(|error| format!("Failed to wait for native OS action command: {error}"))?;
    let stdout_bytes = stdout_handle
        .join()
        .map_err(|_| "Failed to join native OS action stdout reader.".to_string())?;
    let stderr_bytes = stderr_handle
        .join()
        .map_err(|_| "Failed to join native OS action stderr reader.".to_string())?;
    let stdout = String::from_utf8_lossy(&stdout_bytes).trim().to_string();
    let stderr = String::from_utf8_lossy(&stderr_bytes).trim().to_string();
    let status = if timed_out {
        "timed_out"
    } else if exit_code == Some(0) {
        "passed"
    } else {
        "failed"
    };

    Ok(ProcessOutput {
        status: status.to_string(),
        exit_code,
        stdout,
        stderr,
        duration_ms: started.elapsed().as_millis(),
    })
}

fn poll_session_locked(
    app: &AppHandle,
    session_id: &str,
    session: &mut CliSession,
) -> CliSessionReport {
    if !session.finished {
        match session.child.try_wait() {
            Ok(Some(status)) => {
                let next_status = if status.success() {
                    "exited".to_string()
                } else {
                    "failed".to_string()
                };
                mark_session_finished(session, next_status, status.code());
            }
            Ok(None) => {
                if session.started.elapsed() >= session.timeout {
                    let exit_code = kill_and_wait_child(&mut session.child);
                    mark_session_finished(session, "timed_out", exit_code);
                }
            }
            Err(_) => {
                let exit_code = kill_and_wait_child(&mut session.child);
                mark_session_finished(session, "error", exit_code);
            }
        }
    }

    if !session.finished {
        auto_defer_session_questions_locked(session_id, session);
    }
    if session.finished {
        finalize_finished_cli_session_runtime(session);
    } else {
        join_finished_reader(&mut session.stdout_handle);
        join_finished_reader(&mut session.stderr_handle);
    }
    let report = session_report(session_id, session);
    let persist_signature = task_run_persist_signature(&report);
    if session.task_record_path.is_none() || session.last_persist_signature != persist_signature {
        match persist_session_task_run(app, session_id, session, &report) {
            Ok(paths) => {
                session.task_record_path = Some(paths.record_path);
                session.stdout_log_path = Some(paths.stdout_log_path);
                session.stderr_log_path = Some(paths.stderr_log_path);
                session.persistence_error = None;
                session.last_persist_signature = persist_signature;
            }
            Err(error) => {
                session.persistence_error = Some(error);
            }
        }
    }
    session_report(session_id, session)
}

fn join_finished_reader(handle: &mut Option<thread::JoinHandle<()>>) {
    let should_join = handle
        .as_ref()
        .map(|value| value.is_finished())
        .unwrap_or(false);
    if should_join {
        if let Some(value) = handle.take() {
            let _ = value.join();
        }
    }
}

fn join_reader_with_grace(handle: &mut Option<thread::JoinHandle<()>>) {
    let deadline = Instant::now() + Duration::from_millis(SESSION_READER_JOIN_GRACE_MS);
    while handle
        .as_ref()
        .map(|value| !value.is_finished())
        .unwrap_or(false)
        && Instant::now() < deadline
    {
        thread::sleep(Duration::from_millis(SESSION_READER_JOIN_POLL_MS));
    }
    join_finished_reader(handle);
}

fn cli_session_readers_closed(session: &CliSession) -> bool {
    session.stdout_handle.is_none() && session.stderr_handle.is_none()
}

fn finalize_finished_cli_session_runtime(session: &mut CliSession) {
    session.stdin.take();
    join_reader_with_grace(&mut session.stdout_handle);
    join_reader_with_grace(&mut session.stderr_handle);
    if !cli_session_readers_closed(session) {
        kill_child_process_tree(&mut session.child);
        join_reader_with_grace(&mut session.stdout_handle);
        join_reader_with_grace(&mut session.stderr_handle);
    }
}

fn dispose_cli_session_runtime(session: &mut CliSession, status: &str) {
    session.stdin.take();
    if !session.finished {
        let exit_code = kill_and_wait_child(&mut session.child);
        mark_session_finished(session, status, exit_code);
    }
    finalize_finished_cli_session_runtime(session);
}

fn mark_session_finished(
    session: &mut CliSession,
    status: impl Into<String>,
    exit_code: Option<i32>,
) {
    session.exit_code = exit_code;
    session.status = status.into();
    session.finished = true;
    if session.finished_at.is_none() {
        session.finished_at = Some(Instant::now());
    }
    session.stdin.take();
}

fn configure_process_group(command: &mut Command) {
    #[cfg(unix)]
    {
        command.process_group(0);
    }
}

fn kill_child_process_tree(child: &mut Child) {
    #[cfg(unix)]
    {
        let pid = child.id();
        if pid > 0 && pid <= i32::MAX as u32 {
            unsafe {
                let _ = libc::kill(-(pid as libc::pid_t), libc::SIGKILL);
            }
        }
    }
    let _ = child.kill();
}

fn kill_and_wait_child(child: &mut Child) -> Option<i32> {
    kill_child_process_tree(child);
    child.wait().ok().and_then(|exit_status| exit_status.code())
}

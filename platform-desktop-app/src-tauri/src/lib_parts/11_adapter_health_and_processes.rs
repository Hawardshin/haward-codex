fn find_adapter(adapter_id: &str) -> Option<&'static AdapterDefinition> {
    ADAPTERS
        .iter()
        .find(|adapter| adapter.adapter_id == adapter_id)
}

fn find_pipeline_preset(task_kind: &str) -> Option<&'static PipelineTaskPreset> {
    PIPELINE_PRESETS
        .iter()
        .find(|preset| preset.task_kind == task_kind)
}

fn normalize_task_kind(value: Option<&str>, fallback: &str) -> Result<String, String> {
    let candidate = value
        .map(str::trim)
        .filter(|item| !item.is_empty())
        .unwrap_or(fallback);
    if candidate.len() > 80 {
        return Err("Task kind is too long. Max length is 80 characters.".to_string());
    }
    if !candidate.chars().all(|character| {
        character.is_ascii_lowercase() || character.is_ascii_digit() || character == '_'
    }) {
        return Err(
            "Task kind may only use lowercase letters, numbers, and underscores.".to_string(),
        );
    }
    Ok(candidate.to_string())
}

fn pipeline_preset_report(preset: &PipelineTaskPreset) -> CliTaskPipelinePresetReport {
    CliTaskPipelinePresetReport {
        task_kind: preset.task_kind,
        label: preset.label,
        intent: preset.intent,
        lane_count: preset.lanes.len(),
        adapter_ids: preset.lanes.iter().map(|lane| lane.adapter_id).collect(),
        merge_gate: preset.merge_gate,
    }
}

fn pipeline_lane_prompt(
    preset: &PipelineTaskPreset,
    lane: &PipelineLaneDefinition,
    prompt: &str,
) -> String {
    format!(
        "[Platform task pipe init]\nTask kind: {}\nPreset: {}\nLane id: {}\nLane role: {}\nMerge gate: {}\nPipe contract: read task input from stdin, stream stdout/stderr continuously, send questions as explicit decision prompts, and avoid source-affecting decisions until the platform merge gate accepts them.\n\nTask input:\n{}\n\nLane instruction:\n{}",
        preset.task_kind,
        preset.label,
        lane.lane_id,
        lane.role,
        preset.merge_gate,
        prompt,
        lane.prompt_suffix
    )
}

fn append_pipe_edges(
    pipes: &mut Vec<CliPipeEdgeReport>,
    pipeline_id: &str,
    lane_id: &str,
    merge_gate: &str,
    status: &str,
) {
    pipes.push(CliPipeEdgeReport {
        pipe_id: format!("{pipeline_id}_{lane_id}_stdin_init"),
        from_node: "task_intake".to_string(),
        to_node: lane_id.to_string(),
        stream: "stdin".to_string(),
        mode: "pipe_init".to_string(),
        status: status.to_string(),
    });
    pipes.push(CliPipeEdgeReport {
        pipe_id: format!("{pipeline_id}_{lane_id}_stdout_stderr_capture"),
        from_node: lane_id.to_string(),
        to_node: "platform_event_store".to_string(),
        stream: "stdout_stderr".to_string(),
        mode: "bounded_capture".to_string(),
        status: status.to_string(),
    });
    pipes.push(CliPipeEdgeReport {
        pipe_id: format!("{pipeline_id}_{lane_id}_decision_inbox"),
        from_node: lane_id.to_string(),
        to_node: "human_decision_inbox".to_string(),
        stream: "question_events".to_string(),
        mode: "decision_pipe".to_string(),
        status: status.to_string(),
    });
    pipes.push(CliPipeEdgeReport {
        pipe_id: format!("{pipeline_id}_{lane_id}_merge_gate"),
        from_node: lane_id.to_string(),
        to_node: merge_gate.to_string(),
        stream: "accepted_summary".to_string(),
        mode: "artifact_pipe".to_string(),
        status: status.to_string(),
    });
}

fn adapter_status(adapter: &AdapterDefinition) -> CliAdapterStatus {
    match resolve_command(adapter.command) {
        Some(path) => {
            let version = run_bounded_command(
                &path,
                adapter.version_args,
                Duration::from_millis(HEALTH_TIMEOUT_MS),
                MAX_HEALTH_OUTPUT_BYTES,
            )
            .ok()
            .and_then(|output| {
                first_non_empty_line(&output.stdout)
                    .or_else(|| first_non_empty_line(&output.stderr))
            });

            CliAdapterStatus {
                adapter_id: adapter.adapter_id,
                label: adapter.label,
                command: adapter.command,
                available: true,
                resolved_path: Some(path.to_string_lossy().to_string()),
                version,
                last_error: None,
            }
        }
        None => CliAdapterStatus {
            adapter_id: adapter.adapter_id,
            label: adapter.label,
            command: adapter.command,
            available: false,
            resolved_path: None,
            version: None,
            last_error: Some("Command was not found on PATH.".to_string()),
        },
    }
}

fn run_adapter_health(adapter: &AdapterDefinition) -> CliRunReport {
    let started = Instant::now();
    let Some(path) = resolve_command(adapter.command) else {
        return CliRunReport {
            adapter_id: adapter.adapter_id,
            label: adapter.label,
            command: adapter.command,
            status: "capability_missing".to_string(),
            exit_code: None,
            duration_ms: started.elapsed().as_millis(),
            output: String::new(),
            stderr: "Command was not found on PATH.".to_string(),
            decision_prompts: Vec::new(),
            bounded: true,
            max_output_bytes: MAX_HEALTH_OUTPUT_BYTES,
        };
    };

    match run_bounded_command(
        &path,
        adapter.version_args,
        Duration::from_millis(HEALTH_TIMEOUT_MS),
        MAX_HEALTH_OUTPUT_BYTES,
    ) {
        Ok(output) => {
            let combined = format!("{}\n{}", output.stdout, output.stderr);
            CliRunReport {
                adapter_id: adapter.adapter_id,
                label: adapter.label,
                command: adapter.command,
                status: output.status,
                exit_code: output.exit_code,
                duration_ms: output.duration_ms,
                output: output.stdout,
                stderr: output.stderr,
                decision_prompts: detect_decision_prompts(adapter, &combined),
                bounded: true,
                max_output_bytes: MAX_HEALTH_OUTPUT_BYTES,
            }
        }
        Err(error) => CliRunReport {
            adapter_id: adapter.adapter_id,
            label: adapter.label,
            command: adapter.command,
            status: "error".to_string(),
            exit_code: None,
            duration_ms: started.elapsed().as_millis(),
            output: String::new(),
            stderr: error,
            decision_prompts: Vec::new(),
            bounded: true,
            max_output_bytes: MAX_HEALTH_OUTPUT_BYTES,
        },
    }
}

fn run_bounded_command(
    path: &PathBuf,
    args: &[&str],
    timeout: Duration,
    max_output_bytes: usize,
) -> Result<ProcessOutput, String> {
    run_bounded_command_with_cwd(path, args, None, timeout, max_output_bytes)
}

fn run_bounded_command_in_dir(
    path: &PathBuf,
    args: &[&str],
    cwd: &Path,
    timeout: Duration,
    max_output_bytes: usize,
) -> Result<ProcessOutput, String> {
    run_bounded_command_with_cwd(path, args, Some(cwd), timeout, max_output_bytes)
}

fn run_bounded_command_with_cwd(
    path: &PathBuf,
    args: &[&str],
    cwd: Option<&Path>,
    timeout: Duration,
    max_output_bytes: usize,
) -> Result<ProcessOutput, String> {
    let started = Instant::now();
    let mut command = Command::new(path);
    command
        .args(args)
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());
    configure_process_group(&mut command);
    if let Some(cwd) = cwd {
        command.current_dir(cwd);
    }
    let mut child = command
        .spawn()
        .map_err(|error| format!("Failed to spawn command: {error}"))?;

    let stdout = match child.stdout.take() {
        Some(stdout) => stdout,
        None => {
            let _ = kill_and_wait_child(&mut child);
            return Err("Failed to capture stdout.".to_string());
        }
    };
    let stderr = match child.stderr.take() {
        Some(stderr) => stderr,
        None => {
            let _ = kill_and_wait_child(&mut child);
            return Err("Failed to capture stderr.".to_string());
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
        .map_err(|error| format!("Failed to wait for command: {error}"))?;
    let stdout_bytes = stdout_handle
        .join()
        .map_err(|_| "Failed to join stdout reader.".to_string())?;
    let stderr_bytes = stderr_handle
        .join()
        .map_err(|_| "Failed to join stderr reader.".to_string())?;

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

fn run_native_pipe_probe_processes(
    execution: NativePipeExecution,
) -> Result<NativePipeProbeReport, String> {
    let started = Instant::now();
    let (pipe_reader, pipe_writer) =
        pipe().map_err(|error| format!("Failed to open native OS pipe: {error}"))?;

    let mut producer_command = Command::new(&execution.producer_path);
    producer_command
        .args(&execution.producer_args)
        .current_dir(&execution.working_dir)
        .stdin(Stdio::null())
        .stdout(Stdio::from(pipe_writer))
        .stderr(Stdio::piped());
    configure_process_group(&mut producer_command);
    apply_native_pipe_env_allowlist(&mut producer_command);

    let mut producer = producer_command
        .spawn()
        .map_err(|error| format!("Failed to spawn native pipe producer: {error}"))?;
    drop(producer_command);
    let producer_stderr = match producer.stderr.take() {
        Some(stderr) => stderr,
        None => {
            let _ = kill_and_wait_child(&mut producer);
            return Err("Failed to capture producer stderr.".to_string());
        }
    };

    let mut consumer_command = Command::new(&execution.consumer_path);
    consumer_command
        .args(&execution.consumer_args)
        .current_dir(&execution.working_dir)
        .stdin(Stdio::from(pipe_reader))
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());
    configure_process_group(&mut consumer_command);
    apply_native_pipe_env_allowlist(&mut consumer_command);

    let mut consumer = match consumer_command.spawn() {
        Ok(child) => child,
        Err(error) => {
            let _ = kill_and_wait_child(&mut producer);
            return Err(format!("Failed to spawn native pipe consumer: {error}"));
        }
    };
    drop(consumer_command);
    let consumer_stdout = match consumer.stdout.take() {
        Some(stdout) => stdout,
        None => {
            let _ = kill_and_wait_child(&mut producer);
            let _ = kill_and_wait_child(&mut consumer);
            return Err("Failed to capture consumer stdout.".to_string());
        }
    };
    let consumer_stderr = match consumer.stderr.take() {
        Some(stderr) => stderr,
        None => {
            let _ = kill_and_wait_child(&mut producer);
            let _ = kill_and_wait_child(&mut consumer);
            return Err("Failed to capture consumer stderr.".to_string());
        }
    };

    let max_output_bytes = execution.max_output_bytes;
    let producer_stderr_handle =
        thread::spawn(move || read_limited(producer_stderr, max_output_bytes));
    let consumer_stdout_handle =
        thread::spawn(move || read_limited(consumer_stdout, max_output_bytes));
    let consumer_stderr_handle =
        thread::spawn(move || read_limited(consumer_stderr, max_output_bytes));
    let timeout = execution.timeout;
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let wait_result = wait_native_pipe_children(producer, consumer, started, timeout);
        let _ = tx.send(wait_result);
    });

    let wait_result = rx
        .recv_timeout(timeout + Duration::from_millis(500))
        .unwrap_or_else(|error| NativePipeWaitResult {
            producer_exit_code: None,
            consumer_exit_code: None,
            timed_out: true,
            error: Some(format!("Failed to wait for native pipe processes: {error}")),
        });
    let producer_stderr_bytes = producer_stderr_handle
        .join()
        .map_err(|_| "Failed to join producer stderr reader.".to_string())?;
    let consumer_stdout_bytes = consumer_stdout_handle
        .join()
        .map_err(|_| "Failed to join consumer stdout reader.".to_string())?;
    let consumer_stderr_bytes = consumer_stderr_handle
        .join()
        .map_err(|_| "Failed to join consumer stderr reader.".to_string())?;

    let output_truncated = producer_stderr_bytes.len() >= execution.max_output_bytes
        || consumer_stdout_bytes.len() >= execution.max_output_bytes
        || consumer_stderr_bytes.len() >= execution.max_output_bytes;
    let status = if wait_result.timed_out {
        "timed_out"
    } else if wait_result.error.is_some() {
        "error"
    } else if wait_result.producer_exit_code == Some(0) && wait_result.consumer_exit_code == Some(0)
    {
        "passed"
    } else {
        "failed"
    };

    Ok(NativePipeProbeReport {
        status: status.to_string(),
        pipe_kind: "os_pipe_stdout_to_stdin".to_string(),
        producer_command: execution.producer_command,
        producer_args: execution.producer_args,
        producer_resolved_path: path_to_string(&execution.producer_path),
        producer_exit_code: wait_result.producer_exit_code,
        producer_stderr: String::from_utf8_lossy(&producer_stderr_bytes)
            .trim()
            .to_string(),
        consumer_command: execution.consumer_command,
        consumer_args: execution.consumer_args,
        consumer_resolved_path: path_to_string(&execution.consumer_path),
        consumer_exit_code: wait_result.consumer_exit_code,
        consumer_stdout: String::from_utf8_lossy(&consumer_stdout_bytes)
            .trim()
            .to_string(),
        consumer_stderr: String::from_utf8_lossy(&consumer_stderr_bytes)
            .trim()
            .to_string(),
        working_dir: path_to_string(&execution.working_dir),
        duration_ms: started.elapsed().as_millis(),
        timeout_ms: execution.timeout_ms,
        timed_out: wait_result.timed_out,
        bounded: true,
        max_output_bytes: execution.max_output_bytes,
        output_truncated,
        error: wait_result.error,
    })
}

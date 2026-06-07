fn provider_default_base_url(provider_id: &str) -> &'static str {
    match provider_id {
        OLLAMA_PROVIDER_ID => OLLAMA_BASE_URL,
        "openai" => OPENAI_BASE_URL,
        "anthropic" => ANTHROPIC_BASE_URL,
        "google-gemini" => GEMINI_BASE_URL,
        _ => "",
    }
}

fn default_provider_overrides() -> Vec<DesktopProviderOverride> {
    PROVIDER_CREDENTIALS
        .iter()
        .map(|definition| DesktopProviderOverride {
            provider_id: definition.provider_id.to_string(),
            default_model: definition.default_model.to_string(),
            base_url: provider_default_base_url(definition.provider_id).to_string(),
        })
        .collect()
}

fn default_terminal_quick_commands() -> Vec<DesktopTerminalQuickCommand> {
    vec![
        DesktopTerminalQuickCommand {
            id: "pwd".to_string(),
            label: "현재 위치".to_string(),
            detail: "pwd".to_string(),
            input: "pwd\n".to_string(),
        },
        DesktopTerminalQuickCommand {
            id: "list".to_string(),
            label: "파일 목록".to_string(),
            detail: "ls -la".to_string(),
            input: "ls -la\n".to_string(),
        },
        DesktopTerminalQuickCommand {
            id: "git".to_string(),
            label: "Git 상태".to_string(),
            detail: "git status --short".to_string(),
            input: "git status --short\n".to_string(),
        },
    ]
}

static PLATFORM_IMPROVEMENT_LANES: &[PipelineLaneDefinition] = &[
    PipelineLaneDefinition {
        lane_id: "implementation_lane",
        adapter_id: "codex-cli",
        role: "implementation and source-edit lane",
        prompt_suffix: "Focus on scoped implementation. Emit source-affecting decisions as explicit questions.",
    },
    PipelineLaneDefinition {
        lane_id: "review_lane",
        adapter_id: "claude-code-cli",
        role: "requirements and review lane",
        prompt_suffix: "Check requirements, policy, risks, and missing validation before merge.",
    },
    PipelineLaneDefinition {
        lane_id: "research_lane",
        adapter_id: "gemini-cli",
        role: "research and alternative-discovery lane",
        prompt_suffix: "Look for comparable patterns and source-backed alternatives, then summarize uncertainty.",
    },
    PipelineLaneDefinition {
        lane_id: "orchestration_lane",
        adapter_id: "claw-code-cli",
        role: "slash-command and team-orchestration critique lane",
        prompt_suffix: "Review whether this task should become a slash command, team lane, skill, hook, plugin, or parity-gap record before merge.",
    },
    PipelineLaneDefinition {
        lane_id: "fallback_build_lane",
        adapter_id: "opencode-cli",
        role: "fallback implementation and build lane",
        prompt_suffix: "Provide a second implementation path and call out conflicts with the primary lane.",
    },
];

static KNOWLEDGE_ACCUMULATION_LANES: &[PipelineLaneDefinition] = &[
    PipelineLaneDefinition {
        lane_id: "structure_lane",
        adapter_id: "gemini-cli",
        role: "unstructured output structuring lane",
        prompt_suffix: "Turn logs and mixed output into schema, provenance, null handling, and validation notes.",
    },
    PipelineLaneDefinition {
        lane_id: "skeptic_lane",
        adapter_id: "claude-code-cli",
        role: "grounding and skeptic lane",
        prompt_suffix: "Separate supported facts, unsupported claims, assumptions, and required user decisions.",
    },
    PipelineLaneDefinition {
        lane_id: "record_lane",
        adapter_id: "codex-cli",
        role: "durable record and validation lane",
        prompt_suffix: "Map accepted knowledge into requirements, specs, history, and evaluator-ready records.",
    },
];

static REVIEW_VERIFY_LANES: &[PipelineLaneDefinition] = &[
    PipelineLaneDefinition {
        lane_id: "bug_review_lane",
        adapter_id: "claude-code-cli",
        role: "bug, regression, and risk review lane",
        prompt_suffix: "Prioritize concrete bugs, regressions, missing tests, and source references.",
    },
    PipelineLaneDefinition {
        lane_id: "validation_lane",
        adapter_id: "codex-cli",
        role: "validation command and repair lane",
        prompt_suffix: "Run or propose validation commands, then isolate repairable failures from deferred work.",
    },
    PipelineLaneDefinition {
        lane_id: "contrary_lane",
        adapter_id: "gemini-cli",
        role: "contrary evidence and edge-case lane",
        prompt_suffix: "Find edge cases, contrary examples, and weak assumptions before merge.",
    },
];

static SEARCH_AGENT_LANES: &[PipelineLaneDefinition] = &[
    PipelineLaneDefinition {
        lane_id: "research_insight_lane",
        adapter_id: "codex-cli",
        role: "existing research-insight-planner-agent execution lane",
        prompt_suffix: "Act as research-insight-planner-agent using agent-platform/configs/agents/research-insight-planner-agent.json and agent-platform/configs/planning/research-insight-plan-template.json. Return grounded evidence, uncertainty, plan steps, validation steps, and capture targets.",
    },
    PipelineLaneDefinition {
        lane_id: "source_ranking_lane",
        adapter_id: "gemini-cli",
        role: "source discovery and ranking lane",
        prompt_suffix: "Broaden the search query ladder, rank high-authority and contrary sources, and separate adoption signals from factual evidence.",
    },
    PipelineLaneDefinition {
        lane_id: "grounding_review_lane",
        adapter_id: "claude-code-cli",
        role: "citation grounding and skeptic review lane",
        prompt_suffix: "Check unsupported claims, missing source methodology, citation coverage, and user decisions that should be deferred.",
    },
];

static PIPELINE_PRESETS: &[PipelineTaskPreset] = &[
    PipelineTaskPreset {
        task_kind: "research_insight_agent_pipe",
        label: "Search Agent Pipe",
        intent: "Initialize the existing research-insight-planner-agent with source ranking and skeptic review lanes.",
        lanes: SEARCH_AGENT_LANES,
        merge_gate: "research_insight_merge_gate",
    },
    PipelineTaskPreset {
        task_kind: "platform_improvement_pipe",
        label: "Platform Improvement Pipe",
        intent:
            "Initialize implementation, review, research, orchestration, and fallback lanes for platform changes.",
        lanes: PLATFORM_IMPROVEMENT_LANES,
        merge_gate: "platform_merge_gate",
    },
    PipelineTaskPreset {
        task_kind: "knowledge_accumulation_pipe",
        label: "Knowledge Accumulation Pipe",
        intent: "Initialize structuring, skeptic, and record lanes for durable knowledge capture.",
        lanes: KNOWLEDGE_ACCUMULATION_LANES,
        merge_gate: "knowledge_merge_gate",
    },
    PipelineTaskPreset {
        task_kind: "review_verify_pipe",
        label: "Review & Verify Pipe",
        intent: "Initialize review, validation, and contrary lanes before release or merge.",
        lanes: REVIEW_VERIFY_LANES,
        merge_gate: "validation_merge_gate",
    },
];

#[tauri::command]
fn list_cli_adapters() -> Vec<CliAdapterStatus> {
    ADAPTERS.iter().map(adapter_status).collect()
}

#[tauri::command]
fn run_cli_adapter_health(adapter_id: String) -> Result<CliRunReport, String> {
    let adapter =
        find_adapter(&adapter_id).ok_or_else(|| format!("Unknown adapter id: {adapter_id}"))?;
    Ok(run_adapter_health(adapter))
}

#[tauri::command]
fn run_all_cli_adapter_health() -> Vec<CliRunReport> {
    ADAPTERS.iter().map(run_adapter_health).collect()
}

#[tauri::command]
fn check_runtime_terminal_setup(
    app: AppHandle,
    command: Option<String>,
    working_dir: Option<String>,
) -> RuntimeTerminalSetupCheckReport {
    let raw_command = command
        .unwrap_or_default()
        .trim()
        .chars()
        .take(MAX_TERMINAL_COMMAND_CHARS)
        .collect::<String>();
    let command_source = if raw_command.is_empty() {
        "system_default"
    } else {
        "custom"
    };
    let checked_command = if raw_command.is_empty() {
        default_native_shell()
    } else {
        raw_command
    };

    let working_dir_result = resolve_workspace_dir(&app, working_dir.as_deref());
    let working_dir_label = working_dir_result
        .as_ref()
        .map(|path| path.to_string_lossy().to_string())
        .unwrap_or_else(|error| format!("unresolved: {error}"));
    let resolved_path = resolve_command(&checked_command);
    let command_error = if resolved_path.is_some() {
        None
    } else {
        Some(format!(
            "Terminal shell command '{}' was not found on PATH or is not executable.",
            checked_command
        ))
    };
    let working_dir_error = working_dir_result.err();
    let errors: Vec<String> = [working_dir_error, command_error]
        .into_iter()
        .flatten()
        .collect();
    let status = if errors.is_empty() { "ready" } else { "failed" };

    RuntimeTerminalSetupCheckReport {
        status: status.to_string(),
        command: checked_command,
        command_source: command_source.to_string(),
        resolved_path: resolved_path.map(|path| path.to_string_lossy().to_string()),
        working_dir: working_dir_label,
        error: if errors.is_empty() {
            None
        } else {
            Some(errors.join(" "))
        },
    }
}

#[tauri::command]
async fn run_desktop_cli_setup(app: AppHandle) -> Result<String, String> {
    let root = workspace_root_for_app(Some(&app))?;
    let script_path = root.join("platform-desktop-app/scripts/install-awp-cli.mjs");
    let path_script_path = root.join("platform-desktop-app/scripts/configure-awp-path.mjs");

    if !script_path.exists() {
        return Err(format!(
            "CLI setup script not found: {}",
            script_path.display()
        ));
    }

    let output = Command::new("node")
        .arg(script_path)
        .current_dir(&root)
        .output()
        .map_err(|e| format!("Failed to run install script: {e}"))?;

    let path_output = Command::new("node")
        .arg(path_script_path)
        .current_dir(&root)
        .output()
        .map_err(|e| format!("Failed to run path configuration script: {e}"))?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();
    let path_stdout = String::from_utf8_lossy(&path_output.stdout).to_string();
    let path_stderr = String::from_utf8_lossy(&path_output.stderr).to_string();

    if !output.status.success() || !path_output.status.success() {
        return Err(format!("Setup failed.\nStdout: {stdout}\nStderr: {stderr}\nPath Stdout: {path_stdout}\nPath Stderr: {path_stderr}"));
    }

    Ok(format!(
        "CLI setup completed successfully.\n{stdout}\n{path_stdout}"
    ))
}

#[tauri::command]
fn run_native_pipe_probe(
    app: AppHandle,
    request: NativePipeProbeRequest,
) -> Result<NativePipeProbeReport, String> {
    let working_dir = resolve_workspace_dir(&app, request.working_dir.as_deref())?;
    let producer_command = normalize_native_pipe_command(&request.producer_command, "producer")?;
    let consumer_command = normalize_native_pipe_command(&request.consumer_command, "consumer")?;
    let producer_args = normalize_native_pipe_args(request.producer_args)?;
    let consumer_args = normalize_native_pipe_args(request.consumer_args)?;
    let producer_path = resolve_command(&producer_command)
        .ok_or_else(|| format!("Producer command '{producer_command}' was not found on PATH."))?;
    let consumer_path = resolve_command(&consumer_command)
        .ok_or_else(|| format!("Consumer command '{consumer_command}' was not found on PATH."))?;
    let timeout_ms = request
        .timeout_ms
        .unwrap_or(NATIVE_PIPE_PROBE_TIMEOUT_MS)
        .clamp(500, MAX_NATIVE_PIPE_PROBE_TIMEOUT_MS);
    let max_output_bytes = request
        .max_output_bytes
        .unwrap_or(MAX_HEALTH_OUTPUT_BYTES)
        .clamp(1_000, MAX_SESSION_OUTPUT_BYTES);

    run_native_pipe_probe_processes(NativePipeExecution {
        producer_command,
        producer_args,
        producer_path,
        consumer_command,
        consumer_args,
        consumer_path,
        working_dir,
        timeout: Duration::from_millis(timeout_ms),
        timeout_ms,
        max_output_bytes,
    })
}

#[tauri::command]
fn run_native_os_action(
    app: AppHandle,
    request: NativeOsActionRequest,
) -> Result<NativeOsActionReport, String> {
    let action = normalize_native_os_action(&request.action)?;
    let working_dir = resolve_workspace_dir(&app, request.working_dir.as_deref())?;
    let directory_required = action == "open_external_terminal";
    let target = resolve_native_os_action_target(
        &app,
        request.target_path.as_deref(),
        &working_dir,
        directory_required,
    )?;
    let started = Instant::now();
    let operating_system = env::consts::OS.to_string();

    match action.as_str() {
        "open_path" => {
            app.opener()
                .open_path(path_to_string(&target), None::<&str>)
                .map_err(|error| format!("Failed to open path with Tauri opener: {error}"))?;
            Ok(NativeOsActionReport {
                status: "opened".to_string(),
                action,
                operating_system,
                method: "tauri_opener_open_path".to_string(),
                target_path: path_to_string(&target),
                working_dir: path_to_string(&working_dir),
                command: None,
                args: Vec::new(),
                exit_code: Some(0),
                stdout: String::new(),
                stderr: String::new(),
                duration_ms: started.elapsed().as_millis(),
                bounded: true,
                error: None,
            })
        }
        "reveal_path" => {
            app.opener()
                .reveal_item_in_dir(&target)
                .map_err(|error| format!("Failed to reveal path with Tauri opener: {error}"))?;
            Ok(NativeOsActionReport {
                status: "opened".to_string(),
                action,
                operating_system,
                method: "tauri_opener_reveal_item_in_dir".to_string(),
                target_path: path_to_string(&target),
                working_dir: path_to_string(&working_dir),
                command: None,
                args: Vec::new(),
                exit_code: Some(0),
                stdout: String::new(),
                stderr: String::new(),
                duration_ms: started.elapsed().as_millis(),
                bounded: true,
                error: None,
            })
        }
        "open_external_terminal" => {
            let command_plan = native_external_terminal_command(&target)?;
            let output = run_native_os_action_command(
                &command_plan.command_path,
                &command_plan.args,
                &target,
                Duration::from_millis(NATIVE_OS_ACTION_TIMEOUT_MS),
                MAX_NATIVE_OS_ACTION_OUTPUT_BYTES,
            )?;
            Ok(NativeOsActionReport {
                status: if output.status == "passed" {
                    "opened".to_string()
                } else {
                    output.status.clone()
                },
                action,
                operating_system,
                method: command_plan.method,
                target_path: path_to_string(&target),
                working_dir: path_to_string(&working_dir),
                command: Some(path_to_string(&command_plan.command_path)),
                args: command_plan.args,
                exit_code: output.exit_code,
                stdout: output.stdout,
                stderr: output.stderr,
                duration_ms: output.duration_ms,
                bounded: true,
                error: None,
            })
        }
        _ => Err("Unsupported native OS action.".to_string()),
    }
}

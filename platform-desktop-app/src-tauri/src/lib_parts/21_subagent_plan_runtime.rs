fn run_subagent_tool_plan_report(
    app: &AppHandle,
    mut input: SubagentToolPlanInput,
) -> Result<SubagentToolPlanReport, String> {
    input.goal = input.goal.trim().to_string();
    input.context = input.context.trim().to_string();
    if input.goal.is_empty() {
        return Err("Subagent tool plan goal is required.".to_string());
    }
    if input.goal.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Subagent tool plan goal is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }
    if input.context.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Subagent tool plan context is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let root = workspace_root_for_app(Some(app))?;
    let _requested_working_dir = resolve_workspace_dir(app, input.working_dir.as_deref())?;
    let agent_platform_dir = root
        .join("agent-platform")
        .canonicalize()
        .map_err(|error| format!("Failed to resolve agent-platform directory: {error}"))?;
    ensure_workspace_path(&root, &agent_platform_dir)?;
    if !agent_platform_dir.is_dir() {
        return Err(
            "agent-platform directory was not found in the selected workspace.".to_string(),
        );
    }
    let python_path = resolve_command("python3")
        .or_else(|| resolve_command("python"))
        .ok_or_else(|| "Python command was not found on PATH.".to_string())?;

    let manager_agent = input
        .manager_agent
        .trim()
        .to_string()
        .if_empty("agent-orchestrator-agent");
    let preferred_pattern = input
        .preferred_pattern
        .trim()
        .to_string()
        .if_empty("supervisor_router");
    let max_subagents = input.max_subagents.clamp(1, 8);
    let request_id = new_session_id("subagent-tool-plan");
    let task_run_id = format!("task-run-{request_id}");
    let run_dir = task_run_dir(app, &task_run_id)?;
    fs::create_dir_all(&run_dir)
        .map_err(|error| format!("Failed to create subagent tool plan directory: {error}"))?;
    let input_path = run_dir.join("input.json");
    let plan_input = json!({
        "goal": input.goal,
        "context": input.context,
        "manager_agent": manager_agent,
        "preferred_pattern": preferred_pattern,
        "requested_agents": normalize_string_list(input.requested_agents),
        "required_capabilities": normalize_string_list(input.required_capabilities),
        "allowed_tools": normalize_string_list(input.allowed_tools),
        "blocked_tools": normalize_string_list(input.blocked_tools),
        "human_checkpoint_triggers": [
            "subagent requests direct access to private files",
            "subagent requests overlapping write ownership",
            "new external framework installation"
        ],
        "output_targets": [
            "subagent tool plan",
            "task-run record",
            "validation result"
        ],
        "validation_targets": [
            "PYTHONPATH=src python3 -m agent_platform.cli plan-agent-orchestration configs/orchestration/manager-tool-plan-template.json"
        ],
        "constraints": [
            "Manager owns route, merge, evaluation, and final answer.",
            "Do not execute autonomous subagents from this planning command.",
            "Persist the plan as a runtime task-run record outside the source tree."
        ],
        "max_subagents": max_subagents
    });
    let request_prompt_preview = plan_input
        .get("goal")
        .and_then(Value::as_str)
        .unwrap_or("")
        .to_string();
    write_pretty_json(&input_path, &plan_input)?;

    let started_at = current_unix_millis_label();
    let args = vec![
        "-c".to_string(),
        "import sys; sys.path.insert(0, 'src'); from agent_platform.cli import main; raise SystemExit(main(sys.argv[1:]))".to_string(),
        "plan-agent-orchestration".to_string(),
        path_to_string(&input_path),
        "--agents".to_string(),
        "configs/agents".to_string(),
        "--orchestration-registry".to_string(),
        "configs/orchestration/agent-orchestration-registry.json".to_string(),
    ];
    let command_label = "agent-platform:plan-agent-orchestration".to_string();
    let output = run_native_os_action_command(
        &python_path,
        &args,
        &agent_platform_dir,
        Duration::from_millis(60_000),
        MAX_SESSION_OUTPUT_BYTES,
    )?;
    let plan_value = serde_json::from_str::<Value>(&output.stdout).ok();
    let plan_status = plan_value
        .as_ref()
        .and_then(|value| value.get("status"))
        .and_then(Value::as_str)
        .unwrap_or(if output.exit_code == Some(0) {
            "plan_parse_failed"
        } else {
            "command_failed"
        })
        .to_string();
    let requires_rework = plan_value
        .as_ref()
        .and_then(|value| value.get("requires_rework"))
        .and_then(Value::as_bool)
        .unwrap_or(output.exit_code != Some(0));
    let subagent_tools = plan_value
        .as_ref()
        .map(subagent_tool_summaries_from_plan)
        .unwrap_or_default();
    let status = if output.exit_code != Some(0) {
        "failed"
    } else if requires_rework {
        "rework_required"
    } else if plan_status == "plan_parse_failed" {
        "plan_parse_failed"
    } else {
        "completed"
    }
    .to_string();
    let output_truncated = output.stdout.len() >= MAX_SESSION_OUTPUT_BYTES
        || output.stderr.len() >= MAX_SESSION_OUTPUT_BYTES;

    let mut report = SubagentToolPlanReport {
        task_run_id,
        request_id,
        status,
        plan_status,
        command: command_label,
        exit_code: output.exit_code,
        duration_ms: output.duration_ms,
        working_dir: path_to_string(&agent_platform_dir),
        subagent_tool_count: subagent_tools.len(),
        subagent_tools,
        output: output.stdout,
        stderr: output.stderr,
        output_truncated,
        task_record_path: None,
        stdout_log_path: None,
        stderr_log_path: None,
        persistence_error: None,
    };

    match persist_subagent_tool_plan_task_run(
        app,
        &report,
        &started_at,
        &input_path,
        &request_prompt_preview,
    ) {
        Ok(paths) => {
            report.task_record_path = Some(paths.record_path);
            report.stdout_log_path = Some(paths.stdout_log_path);
            report.stderr_log_path = Some(paths.stderr_log_path);
        }
        Err(error) => {
            report.persistence_error = Some(error);
        }
    }

    Ok(report)
}

fn persist_subagent_tool_plan_task_run(
    app: &AppHandle,
    report: &SubagentToolPlanReport,
    started_at: &str,
    input_path: &Path,
    request_prompt_preview: &str,
) -> Result<TaskRunPersistPaths, String> {
    let root = workspace_root_for_app(Some(app))?;
    let run_dir = task_run_dir(app, &report.task_run_id)?;
    fs::create_dir_all(&run_dir).map_err(|error| {
        format!("Failed to create subagent tool plan task run directory: {error}")
    })?;

    let record_path = run_dir.join("record.json");
    let stdout_log_path = run_dir.join("stdout.log");
    let stderr_log_path = run_dir.join("stderr.log");
    fs::write(&stdout_log_path, report.output.as_bytes())
        .map_err(|error| format!("Failed to write subagent tool plan stdout log: {error}"))?;
    fs::write(&stderr_log_path, report.stderr.as_bytes())
        .map_err(|error| format!("Failed to write subagent tool plan stderr log: {error}"))?;

    let relative_record_path = workspace_relative_display_path(&root, &record_path);
    let relative_stdout_path = workspace_relative_display_path(&root, &stdout_log_path);
    let relative_stderr_path = workspace_relative_display_path(&root, &stderr_log_path);
    let relative_input_path = workspace_relative_display_path(&root, input_path);
    let updated_at = current_unix_millis_label();
    let exit_code = if report.status == "completed" { 0 } else { 1 };
    let paths = json!({
        "record": relative_record_path,
        "stdout_log": relative_stdout_path,
        "stderr_log": relative_stderr_path,
        "input": relative_input_path
    });
    let subagent_tool_plan = json!({
        "plan_status": report.plan_status.clone(),
        "subagent_tool_count": report.subagent_tool_count,
        "subagent_tools": report.subagent_tools.clone(),
        "command": report.command.clone(),
        "input_path": relative_input_path
    });
    let record = json!({
        "schema_version": 1,
        "record_id": format!("record-{}", report.request_id),
        "session_id": report.request_id.clone(),
        "task_run_id": report.task_run_id.clone(),
        "task_kind": "subagent_tool_plan",
        "pipeline_id": Value::Null,
        "lane_id": Value::Null,
        "lane_role": Value::Null,
        "adapter_id": "agent-platform",
        "label": "Subagent Tool Plan",
        "command": report.command.clone(),
        "status": report.status.clone(),
        "exit_code": exit_code,
        "started_at": started_at,
        "updated_at": updated_at,
        "elapsed_ms": u64::try_from(report.duration_ms).unwrap_or(u64::MAX),
        "working_dir": report.working_dir.clone(),
        "prompt_preview": prompt_preview(request_prompt_preview),
        "stdout_bytes": report.output.len(),
        "stderr_bytes": report.stderr.len(),
        "output_truncated": report.output_truncated,
        "decision_inbox_items": 0,
        "pending_decision_prompts": 0,
        "deferred_prompt_count": 0,
        "auto_defer_questions": false,
        "auto_defer_triggered": false,
        "defer_message_sent": false,
        "bounded": true,
        "max_output_bytes": MAX_SESSION_OUTPUT_BYTES,
        "decision_prompts": [],
        "subagent_tool_plan": subagent_tool_plan,
        "paths": paths
    });
    let formatted = serde_json::to_string_pretty(&record)
        .map_err(|error| format!("Failed to serialize subagent tool plan record: {error}"))?;
    fs::write(&record_path, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write subagent tool plan record: {error}"))?;

    Ok(TaskRunPersistPaths {
        record_path: relative_record_path,
        stdout_log_path: relative_stdout_path,
        stderr_log_path: relative_stderr_path,
    })
}

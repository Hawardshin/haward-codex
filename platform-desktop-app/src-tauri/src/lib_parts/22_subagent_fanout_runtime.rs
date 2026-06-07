fn start_subagent_tool_execution_report(
    app: &AppHandle,
    store: State<'_, SessionStore>,
    mut input: SubagentToolExecutionInput,
) -> Result<CliSessionReport, String> {
    input.plan_task_run_id = input.plan_task_run_id.trim().to_string();
    input.tool_name = input.tool_name.trim().to_string();
    input.adapter_id = input.adapter_id.trim().to_string();
    if input.plan_task_run_id.is_empty() {
        return Err("Subagent plan task-run id is required.".to_string());
    }
    if input.tool_name.is_empty() {
        return Err("Subagent tool name is required.".to_string());
    }
    if input.adapter_id.is_empty() {
        return Err("Subagent execution adapter id is required.".to_string());
    }

    let adapter = find_adapter(&input.adapter_id)
        .ok_or_else(|| format!("Unknown adapter id: {}", input.adapter_id))?;
    let working_dir = resolve_workspace_dir(app, input.working_dir.as_deref())?;
    let tool = subagent_tool_from_plan_record(app, &input.plan_task_run_id, &input.tool_name)?;
    let prompt = render_subagent_cli_execution_prompt(&input, &tool);
    if prompt.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Subagent execution prompt is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let (session_id, mut session, report) = create_cli_session(
        app,
        adapter,
        &prompt,
        working_dir,
        input.auto_defer_questions.unwrap_or(true),
        "subagent_tool_execution",
        Some(&input.plan_task_run_id),
        Some(&tool.tool_name),
        Some(&tool.agent_name),
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

fn start_subagent_tool_fanout_report(
    app: &AppHandle,
    store: State<'_, SessionStore>,
    mut input: SubagentToolFanoutInput,
) -> Result<SubagentToolFanoutReport, String> {
    input.plan_task_run_id = input.plan_task_run_id.trim().to_string();
    input.adapter_id = input.adapter_id.trim().to_string();
    input.tool_names = input
        .tool_names
        .into_iter()
        .map(|tool| tool.trim().to_string())
        .filter(|tool| !tool.is_empty())
        .collect();
    if input.plan_task_run_id.is_empty() {
        return Err("Subagent plan task-run id is required.".to_string());
    }
    if input.adapter_id.is_empty() {
        return Err("Subagent fan-out adapter id is required.".to_string());
    }

    let requested_cap = input.max_sessions.unwrap_or(MAX_SUBAGENT_FANOUT_SESSIONS);
    if requested_cap == 0 || requested_cap > MAX_SUBAGENT_FANOUT_SESSIONS {
        return Err(format!(
            "Subagent fan-out max sessions must be between 1 and {MAX_SUBAGENT_FANOUT_SESSIONS}."
        ));
    }

    let adapter = find_adapter(&input.adapter_id)
        .ok_or_else(|| format!("Unknown adapter id: {}", input.adapter_id))?;
    let resolved_working_dir = resolve_workspace_dir(app, input.working_dir.as_deref())?;
    let plan_tools = subagent_tools_from_plan_record(app, &input.plan_task_run_id)?;
    let selected_tools = select_subagent_fanout_tools(&plan_tools, &input.tool_names)?;
    if selected_tools.is_empty() {
        return Err("Subagent fan-out plan has no tools to start.".to_string());
    }

    let selected_tool_count = selected_tools.len();
    let skipped_tools = selected_tools
        .iter()
        .skip(requested_cap)
        .map(|tool| tool.tool_name.clone())
        .collect::<Vec<_>>();
    let pipeline_id = new_session_id("subagent_tool_fanout");
    let mut lane_reports = Vec::new();
    let mut pipe_reports = Vec::new();
    let mut pending_sessions: Vec<(String, CliSession)> = Vec::new();

    for tool in selected_tools.iter().take(requested_cap) {
        if resolve_command(adapter.command).is_none() {
            let status = "capability_missing".to_string();
            lane_reports.push(CliTaskPipelineLaneReport {
                lane_id: tool.tool_name.clone(),
                adapter_id: adapter.adapter_id.to_string(),
                role: tool.agent_name.clone(),
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
                &tool.tool_name,
                SUBAGENT_FANOUT_MERGE_GATE,
                &status,
            );
            continue;
        }

        let lane_prompt = render_subagent_cli_fanout_prompt(&input, tool, &pipeline_id);
        if lane_prompt.len() > MAX_SESSION_INPUT_BYTES {
            let status = "init_failed".to_string();
            lane_reports.push(CliTaskPipelineLaneReport {
                lane_id: tool.tool_name.clone(),
                adapter_id: adapter.adapter_id.to_string(),
                role: tool.agent_name.clone(),
                status: status.clone(),
                session: None,
                error: Some(format!(
                    "Subagent fan-out lane prompt is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
                )),
            });
            append_pipe_edges(
                &mut pipe_reports,
                &pipeline_id,
                &tool.tool_name,
                SUBAGENT_FANOUT_MERGE_GATE,
                &status,
            );
            continue;
        }

        match create_cli_session(
            app,
            adapter,
            &lane_prompt,
            resolved_working_dir.clone(),
            input.auto_defer_questions.unwrap_or(true),
            "subagent_tool_fanout",
            Some(&pipeline_id),
            Some(&tool.tool_name),
            Some(&tool.agent_name),
        ) {
            Ok((session_id, session, report)) => {
                let status = report.status.clone();
                lane_reports.push(CliTaskPipelineLaneReport {
                    lane_id: tool.tool_name.clone(),
                    adapter_id: adapter.adapter_id.to_string(),
                    role: tool.agent_name.clone(),
                    status: status.clone(),
                    session: Some(report),
                    error: None,
                });
                append_pipe_edges(
                    &mut pipe_reports,
                    &pipeline_id,
                    &tool.tool_name,
                    SUBAGENT_FANOUT_MERGE_GATE,
                    &status,
                );
                pending_sessions.push((session_id, session));
            }
            Err(error) => {
                let status = "init_failed".to_string();
                lane_reports.push(CliTaskPipelineLaneReport {
                    lane_id: tool.tool_name.clone(),
                    adapter_id: adapter.adapter_id.to_string(),
                    role: tool.agent_name.clone(),
                    status: status.clone(),
                    session: None,
                    error: Some(error),
                });
                append_pipe_edges(
                    &mut pipe_reports,
                    &pipeline_id,
                    &tool.tool_name,
                    SUBAGENT_FANOUT_MERGE_GATE,
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
    } else if !lane_reports.is_empty() && missing_lanes == lane_reports.len() {
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

    Ok(SubagentToolFanoutReport {
        pipeline_id,
        plan_task_run_id: input.plan_task_run_id,
        task_kind: "subagent_tool_fanout".to_string(),
        label: "Subagent tool fan-out".to_string(),
        status: status.to_string(),
        intent: "Start a bounded set of saved subagent tool lanes and hold output behind a manual merge gate.".to_string(),
        adapter_id: adapter.adapter_id.to_string(),
        working_dir: resolved_working_dir.to_string_lossy().to_string(),
        prompt_bytes: input.prompt.len(),
        selected_tool_count,
        started_sessions,
        missing_lanes,
        skipped_tools,
        process_cap: requested_cap,
        merge_gate: SUBAGENT_FANOUT_MERGE_GATE.to_string(),
        bounded: true,
        max_output_bytes: MAX_SESSION_OUTPUT_BYTES,
        lanes: lane_reports,
        pipes: pipe_reports,
    })
}

fn subagent_tool_from_plan_record(
    app: &AppHandle,
    plan_task_run_id: &str,
    tool_name: &str,
) -> Result<SubagentToolSummary, String> {
    let tools = subagent_tools_from_plan_record(app, plan_task_run_id)?;
    tools
        .into_iter()
        .find(|tool| tool.tool_name == tool_name)
        .ok_or_else(|| format!("Tool '{tool_name}' was not found in plan '{plan_task_run_id}'."))
}

fn subagent_tools_from_plan_record(
    app: &AppHandle,
    plan_task_run_id: &str,
) -> Result<Vec<SubagentToolSummary>, String> {
    let detail = read_task_run_detail(app, plan_task_run_id)?;
    if detail.record.task_kind != "subagent_tool_plan" {
        return Err(format!(
            "Task run '{}' is not a subagent tool plan.",
            plan_task_run_id
        ));
    }
    let record_value: Value = serde_json::from_str(&detail.record_json)
        .map_err(|error| format!("Failed to parse subagent tool plan record: {error}"))?;
    let plan_value = record_value
        .get("subagent_tool_plan")
        .ok_or_else(|| "Subagent tool plan metadata is missing.".to_string())?;
    Ok(subagent_tool_summaries_from_plan(plan_value))
}

fn select_subagent_fanout_tools(
    plan_tools: &[SubagentToolSummary],
    requested_tool_names: &[String],
) -> Result<Vec<SubagentToolSummary>, String> {
    if requested_tool_names.is_empty() {
        return Ok(plan_tools.to_vec());
    }

    let mut selected = Vec::new();
    let mut seen = HashSet::new();
    for requested in requested_tool_names {
        if !seen.insert(requested.clone()) {
            continue;
        }
        let tool = plan_tools
            .iter()
            .find(|tool| tool.tool_name == *requested)
            .ok_or_else(|| format!("Tool '{requested}' was not found in the subagent plan."))?;
        selected.push(tool.clone());
    }
    Ok(selected)
}

fn render_subagent_cli_execution_prompt(
    input: &SubagentToolExecutionInput,
    tool: &SubagentToolSummary,
) -> String {
    let user_prompt = input.prompt.trim();
    let allowed_tools = if tool.allowed_tools.is_empty() {
        "- none declared".to_string()
    } else {
        tool.allowed_tools
            .iter()
            .map(|tool| format!("- {tool}"))
            .collect::<Vec<_>>()
            .join("\n")
    };
    format!(
        "You are running as a bounded subagent tool lane.\n\nPlan task-run id: {plan_task_run_id}\nTool name: {tool_name}\nAgent name: {agent_name}\nLane role: {agent_name}\n\nManager-owned boundaries:\n- The manager owns routing, merge, validation, and final answer.\n- This is a single advisory lane, not a parallel fan-out execution.\n- Do not access _private or outputs.\n- Do not perform destructive file operations, installs, or global environment changes.\n- If a task needs write access, propose the exact patch and wait for manager merge.\n\nAllowed tool metadata from the plan:\n{allowed_tools}\n\nOutput contract:\n{output_contract}\n\nManager prompt:\n{manager_prompt}\n\nReturn a concise result with summary, evidence, risks, validation, and next_action.",
        plan_task_run_id = input.plan_task_run_id,
        tool_name = tool.tool_name,
        agent_name = tool.agent_name,
        allowed_tools = allowed_tools,
        output_contract = tool.output_contract,
        manager_prompt = if user_prompt.is_empty() {
            "Execute the selected subagent lane against the current manager task, then report findings without taking final ownership."
        } else {
            user_prompt
        }
    )
}

fn render_subagent_cli_fanout_prompt(
    input: &SubagentToolFanoutInput,
    tool: &SubagentToolSummary,
    pipeline_id: &str,
) -> String {
    let user_prompt = input.prompt.trim();
    let allowed_tools = if tool.allowed_tools.is_empty() {
        "- none declared".to_string()
    } else {
        tool.allowed_tools
            .iter()
            .map(|tool| format!("- {tool}"))
            .collect::<Vec<_>>()
            .join("\n")
    };
    format!(
        "You are running as one bounded subagent lane in a fan-out group.\n\nPlan task-run id: {plan_task_run_id}\nPipeline id: {pipeline_id}\nTool name: {tool_name}\nAgent name: {agent_name}\nLane role: {agent_name}\nMerge gate: {merge_gate}\n\nManager-owned boundaries:\n- The manager owns routing, fan-in, merge, validation, and final answer.\n- This lane must not coordinate directly with other lanes or claim final ownership.\n- Do not access _private or outputs.\n- Do not perform destructive file operations, installs, or global environment changes.\n- If a task needs write access, propose the exact patch and wait for manager merge.\n- Return only lane-local findings that the manager can compare with other lane outputs.\n\nAllowed tool metadata from the plan:\n{allowed_tools}\n\nOutput contract:\n{output_contract}\n\nManager prompt:\n{manager_prompt}\n\nReturn a concise result with summary, evidence, risks, validation, conflicts_or_dependencies, and next_action.",
        plan_task_run_id = input.plan_task_run_id,
        pipeline_id = pipeline_id,
        tool_name = tool.tool_name,
        agent_name = tool.agent_name,
        merge_gate = SUBAGENT_FANOUT_MERGE_GATE,
        allowed_tools = allowed_tools,
        output_contract = tool.output_contract,
        manager_prompt = if user_prompt.is_empty() {
            "Execute this lane against the current manager task. Keep the result self-contained for manual fan-in."
        } else {
            user_prompt
        }
    )
}

fn subagent_tool_summaries_from_plan(value: &Value) -> Vec<SubagentToolSummary> {
    value
        .get("subagent_tools")
        .and_then(Value::as_array)
        .map(|tools| {
            tools
                .iter()
                .filter_map(|tool| {
                    let tool_name = tool.get("tool_name")?.as_str()?.to_string();
                    let agent_name = tool
                        .get("agent_name")
                        .and_then(Value::as_str)
                        .unwrap_or("")
                        .to_string();
                    let allowed_tools = tool
                        .get("allowed_tools")
                        .and_then(Value::as_array)
                        .map(|items| {
                            items
                                .iter()
                                .filter_map(Value::as_str)
                                .map(ToOwned::to_owned)
                                .collect()
                        })
                        .unwrap_or_default();
                    let output_contract = tool
                        .get("output_contract")
                        .and_then(Value::as_str)
                        .unwrap_or("")
                        .to_string();
                    Some(SubagentToolSummary {
                        tool_name,
                        agent_name,
                        allowed_tools,
                        output_contract,
                    })
                })
                .collect()
        })
        .unwrap_or_default()
}

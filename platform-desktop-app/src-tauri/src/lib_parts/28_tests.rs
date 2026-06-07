#[cfg(test)]
mod tests {
    use super::*;

    #[cfg(unix)]
    #[test]
    fn native_pipe_probe_connects_producer_stdout_to_consumer_stdin() {
        let producer_path = resolve_command("printf").expect("printf must be available on Unix");
        let consumer_path = resolve_command("wc").expect("wc must be available on Unix");
        let working_dir = env::current_dir().expect("current dir must resolve");

        let report = run_native_pipe_probe_processes(NativePipeExecution {
            producer_command: "printf".to_string(),
            producer_args: vec!["hello".to_string()],
            producer_path,
            consumer_command: "wc".to_string(),
            consumer_args: vec!["-c".to_string()],
            consumer_path,
            working_dir,
            timeout: Duration::from_millis(2_500),
            timeout_ms: 2_500,
            max_output_bytes: 20_000,
        })
        .expect("native pipe probe should run");

        assert_eq!(report.status, "passed");
        assert_eq!(report.producer_exit_code, Some(0));
        assert_eq!(report.consumer_exit_code, Some(0));
        assert_eq!(report.consumer_stdout.trim(), "5");
        assert_eq!(report.pipe_kind, "os_pipe_stdout_to_stdin");
    }

    #[test]
    fn native_os_action_accepts_only_bounded_actions() {
        assert_eq!(
            normalize_native_os_action("open_path").expect("open_path should be accepted"),
            "open_path"
        );
        assert_eq!(
            normalize_native_os_action("reveal_path").expect("reveal_path should be accepted"),
            "reveal_path"
        );
        assert_eq!(
            normalize_native_os_action("open_external_terminal")
                .expect("open_external_terminal should be accepted"),
            "open_external_terminal"
        );
        assert!(normalize_native_os_action("shutdown").is_err());
        assert!(normalize_native_os_action("rm -rf").is_err());
    }

    #[test]
    fn desktop_prompt_customization_keeps_only_allowed_prompt_keys() {
        let mut session_prompts = HashMap::new();
        session_prompts.insert(
            "user_task".to_string(),
            "  custom user prompt  ".to_string(),
        );
        session_prompts.insert("unknown".to_string(), "should be dropped".to_string());
        session_prompts.insert("review_verify".to_string(), "".to_string());

        let mut task_pipe_prompts = HashMap::new();
        task_pipe_prompts.insert(
            "selected-preset:platform_improvement_pipe".to_string(),
            "  custom pipe prompt  ".to_string(),
        );
        task_pipe_prompts.insert("selected-preset:unknown".to_string(), "drop".to_string());

        let normalized = normalize_prompt_customization(DesktopPromptCustomization {
            session_prompts,
            task_pipe_prompts,
        });

        assert_eq!(
            normalized
                .session_prompts
                .get("user_task")
                .map(String::as_str),
            Some("custom user prompt")
        );
        assert!(!normalized.session_prompts.contains_key("unknown"));
        assert!(!normalized.session_prompts.contains_key("review_verify"));
        assert_eq!(
            normalized
                .task_pipe_prompts
                .get("selected-preset:platform_improvement_pipe")
                .map(String::as_str),
            Some("custom pipe prompt")
        );
        assert!(!normalized
            .task_pipe_prompts
            .contains_key("selected-preset:unknown"));
    }

    #[test]
    fn subagent_cli_execution_prompt_keeps_manager_boundaries() {
        let input = SubagentToolExecutionInput {
            plan_task_run_id: "task-run-subagent-tool-plan-1".to_string(),
            tool_name: "run_research_insight_planner_agent".to_string(),
            adapter_id: "codex-cli".to_string(),
            prompt: "Review the implementation risk.".to_string(),
            working_dir: None,
            auto_defer_questions: Some(true),
        };
        let tool = SubagentToolSummary {
            tool_name: "run_research_insight_planner_agent".to_string(),
            agent_name: "research-insight-planner-agent".to_string(),
            allowed_tools: vec!["web-search".to_string(), "repository-docs".to_string()],
            output_contract: "summary, evidence, risks, validation, next_action".to_string(),
        };
        let prompt = render_subagent_cli_execution_prompt(&input, &tool);

        assert!(prompt.contains("task-run-subagent-tool-plan-1"));
        assert!(prompt.contains("run_research_insight_planner_agent"));
        assert!(prompt.contains("research-insight-planner-agent"));
        assert!(prompt.contains("The manager owns routing, merge, validation, and final answer."));
        assert!(prompt.contains("Do not access _private or outputs."));
        assert!(prompt.contains("Review the implementation risk."));
    }

    #[test]
    fn subagent_cli_fanout_prompt_keeps_merge_gate_boundaries() {
        let input = SubagentToolFanoutInput {
            plan_task_run_id: "task-run-subagent-tool-plan-1".to_string(),
            tool_names: vec!["run_research_insight_planner_agent".to_string()],
            adapter_id: "codex-cli".to_string(),
            prompt: "Compare the implementation risk with other lanes.".to_string(),
            working_dir: None,
            auto_defer_questions: Some(true),
            max_sessions: Some(2),
        };
        let tool = SubagentToolSummary {
            tool_name: "run_research_insight_planner_agent".to_string(),
            agent_name: "research-insight-planner-agent".to_string(),
            allowed_tools: vec!["web-search".to_string(), "repository-docs".to_string()],
            output_contract: "summary, evidence, risks, validation, next_action".to_string(),
        };
        let prompt = render_subagent_cli_fanout_prompt(&input, &tool, "subagent-pipeline-1");

        assert!(prompt.contains("subagent-pipeline-1"));
        assert!(prompt.contains(SUBAGENT_FANOUT_MERGE_GATE));
        assert!(prompt
            .contains("The manager owns routing, fan-in, merge, validation, and final answer."));
        assert!(prompt.contains("must not coordinate directly with other lanes"));
        assert!(prompt.contains("Do not access _private or outputs."));
        assert!(prompt.contains("Compare the implementation risk with other lanes."));
    }

    #[test]
    fn subagent_fanout_tool_selection_rejects_unknown_tools() {
        let plan_tools = vec![
            SubagentToolSummary {
                tool_name: "run_research".to_string(),
                agent_name: "research-agent".to_string(),
                allowed_tools: vec![],
                output_contract: "summary".to_string(),
            },
            SubagentToolSummary {
                tool_name: "run_review".to_string(),
                agent_name: "review-agent".to_string(),
                allowed_tools: vec![],
                output_contract: "summary".to_string(),
            },
        ];
        let selected = select_subagent_fanout_tools(
            &plan_tools,
            &[
                "run_review".to_string(),
                "run_review".to_string(),
                "run_research".to_string(),
            ],
        )
        .expect("known tools should be selected");

        assert_eq!(selected.len(), 2);
        assert_eq!(selected[0].tool_name, "run_review");
        assert!(select_subagent_fanout_tools(&plan_tools, &["missing".to_string()]).is_err());
    }

    #[cfg(target_os = "macos")]
    #[test]
    fn native_external_terminal_plan_uses_macos_open_without_shell_string() {
        let target_dir = env::current_dir().expect("current dir must resolve");
        let plan =
            native_external_terminal_command(&target_dir).expect("macOS open should be available");

        assert_eq!(plan.method, "macos_open_terminal_app");
        assert!(plan.command_path.ends_with("open"));
        assert_eq!(
            plan.args,
            vec![
                "-a".to_string(),
                "Terminal".to_string(),
                path_to_string(&target_dir)
            ]
        );
    }
}

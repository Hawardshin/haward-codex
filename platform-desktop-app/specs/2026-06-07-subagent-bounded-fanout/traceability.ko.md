# Traceability: Subagent Bounded Fan-Out

| Requirement | Implementation | Verification |
| --- | --- | --- |
| REQ-SBF-001 | `fanoutSubagentTools`, `start_subagent_tool_fanout` | workspace-monitor test, Browser smoke |
| REQ-SBF-002 | `subagent_tools_from_plan_record`, `select_subagent_fanout_tools` | Rust unit/static test |
| REQ-SBF-003 | `DEFAULT_SUBAGENT_FANOUT_SESSIONS`, `MAX_SUBAGENT_FANOUT_SESSIONS` | static test |
| REQ-SBF-004 | `create_cli_session` reuse | cargo check, resource check |
| REQ-SBF-005 | `task_kind=subagent_tool_fanout`, `pipeline_id`, `lane_id`, `lane_role` | static test |
| REQ-SBF-006 | `render_subagent_cli_fanout_prompt` | Rust unit test |
| REQ-SBF-007 | fan-out result card, `pipelineReports`, session merge | workspace-monitor test |

## 변경 파일

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/src-tauri/src/features/agent_factory.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

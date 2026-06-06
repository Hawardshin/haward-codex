# Traceability: Subagent Tool Selection

| Requirement | Implementation | Validation |
| --- | --- | --- |
| tool별 선택 컨트롤 | `MonitorShell.tsx` `data-subagent-tool-selector` | `tool-studio.test.mjs` static contract |
| 기본 첫 2개 선택 | `setSelectedSubagentToolNames(report.subagentTools.slice(0, defaultSubagentFanoutSelections))` | renderer check |
| 최대 3개 선택 | `maxSubagentFanoutSelections = 3` 및 checkbox disabled | static contract, Browser smoke |
| 단일 실행 선택 tool 사용 | `executeSubagentTools` `selectedSubagentTool` | renderer check |
| fan-out 선택 tool 사용 | `toolNames: selectedSubagentFanoutToolNames`, `maxSessions: selectedSubagentFanoutToolNames.length` | static contract |
| 기존 안전 경계 유지 | Rust `start_subagent_tool_fanout` 재사용 | `check-cli-pipeline`, `check-resources` |

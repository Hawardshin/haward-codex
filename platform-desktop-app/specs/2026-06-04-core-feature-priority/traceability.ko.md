# 추적성

| 요구사항 | 구현/문서 | 검증 |
| --- | --- | --- |
| REQ-PDA-094 | `MonitorShell.tsx`, `ProductFeatureArchitecturePanel.tsx`, `product-feature-registry.json` | renderer check/test, platform readiness/test |
| REQ-PDA-095 | `root_tool_management`, root tool setup panels, execution settings | product registry contract, Browser smoke |
| REQ-PDA-096 | Home workload strip, `work_visibility` layer | snapshot collector tests, Browser smoke |
| REQ-PDA-097 | `view-mode-registry.json`, `view_modes.py`, user allowed sections | `check-view-modes`, `tests.test_view_modes` |
| REQ-PDA-098 | `coreSetupSteps`, settings setup grid, readiness metric | renderer check, platform tests |

## 출처

- OpenAI Agents SDK docs: agents, sessions, handoffs, tracing
- Claude Code docs: custom subagents, MCP, hooks
- LangGraph docs: multi-agent and supervisor patterns
- 기존 platform desktop product feature, user flow, runtime contract registries


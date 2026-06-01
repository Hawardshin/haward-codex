# 2026-06-01 Deep Research Agent Evaluation

## Evaluation Input

- Work mode: `standard`
- Initial instruction: Create a deep research agent that searches in specific situations, performs multiple deep research steps, gathers many materials, and writes highly detailed reports.
- Result summary: Added `deep-research-agent` as a Python research package readiness agent, including the `complete-deep-research` CLI, deep research profile/template, agent spec, docs, workflow, prompt, memory/bootstrap links, workspace-health config check, research records, and unit tests.

## References Checked

- OpenAI API Deep Research: https://developers.openai.com/api/docs/guides/deep-research
- OpenAI Help Center Deep Research: https://help.openai.com/articles/10500283
- Exa Research API: https://exa.ai/docs/reference/exa-research
- LangChain Deep Agents Deep Research: https://docs.langchain.com/oss/python/deepagents/deep-research
- langchain-ai/open_deep_research: https://github.com/langchain-ai/open_deep_research
- Cited but Not Verified: https://arxiv.org/abs/2605.06635
- ReportBench: https://arxiv.org/abs/2508.15804
- `agent-platform/src/agent_platform/planning/research_insight_planner.py`
- `agent-platform/src/agent_platform/planning/coding_research.py`
- `agent-platform/src/agent_platform/cli.py`

## Verification

- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research ../_specs/workspace-platform/2026-06-01-deep-research-agent/research-insight-plan-input.json`: `ready_to_plan`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research ../_specs/workspace-platform/2026-06-01-deep-research-agent/coding-research-input.json`: `ready_to_implement`
- `PYTHONPATH=src python3 -m unittest agent-platform/tests/test_deep_research.py`: 6 tests passed
- `PYTHONPATH=src python3 -m agent_platform.cli complete-deep-research configs/planning/deep-research-template.json`: `ready_to_write_report`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/research/deep-research-profile.json configs/planning/deep-research-template.json`: `self_documenting`
- `PYTHONPATH=src python3 -m unittest discover -s tests` from `agent-platform/`: 110 tests passed
- core config contract: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/workspace-index/src/workspace_index.py`: maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-01-deep-research-agent.json`: `ready`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance`: 7 checks passed
- `npm run build` from `workspace-monitor/`: passed
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`

## Evaluation Result

- Status: `ready_to_close`
- Blocking gaps: none
- Commit/push: pending
- Improvement ideas:
  - Add a real search API, browser, file-search, or MCP connector channel when concrete deep research runs need automation.
  - Tune source/evidence thresholds by depth after several real reports accumulate.

## Main Artifacts

- `agent-platform/src/agent_platform/planning/deep_research.py`
- `agent-platform/configs/research/deep-research-profile.json`
- `agent-platform/configs/planning/deep-research-template.json`
- `agent-platform/configs/agents/deep-research-agent.json`
- `agent-platform/docs/deep-research-agent.en.md`
- `_ops/workflows/57-deep-research.md`
- `_ops/prompts/87-deep-research.md`
- `_specs/workspace-platform/2026-06-01-deep-research-agent/`
- `_history/web-searches/2026/2026-06-01-deep-research-agent.en.md`
- `_history/work-timings/2026/2026-06-01-deep-research-agent.json`

## Evaluator Output Summary

```json
{
  "status": "ready_to_close",
  "requires_rework": false,
  "work_mode": "standard",
  "gaps": [],
  "improvements": [
    "Add real search API, browser, file-search, or MCP connector integration when a concrete deep research run needs automation.",
    "Tune depth thresholds after multiple real deep research reports accumulate."
  ]
}
```

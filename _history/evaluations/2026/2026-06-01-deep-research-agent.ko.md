# 2026-06-01 딥리서치 에이전트 평가

## 평가 입력

- 작업 모드: `standard`
- 초기 지시: 특정 상황에서 검색을 수행하고, 여러 깊은 조사 단계를 거쳐 자료를 많이 모아 매우 자세한 보고서를 쓰는 딥리서치 에이전트를 요청함.
- 결과 요약: `deep-research-agent`를 Python 기반 research package readiness agent로 추가하고, `complete-deep-research` CLI, deep research profile/template, agent spec, 문서, workflow, prompt, memory/bootstrap 연결, workspace-health config check, 연구 기록, 단위 테스트를 추가했다.

## 확인한 레퍼런스

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

## 검증

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

## 평가 결과

- 상태: `ready_to_close`
- blocking gap: 없음
- 커밋/push: `8bb2e73` pushed
- 개선 아이디어:
  - 실제 딥리서치 실행이 필요해지면 search API, browser, file-search, MCP connector 중 적합한 실행 채널을 연결한다.
  - 실제 보고서 누적 후 depth별 source/evidence threshold를 조정한다.

## 주요 산출물

- `agent-platform/src/agent_platform/planning/deep_research.py`
- `agent-platform/configs/research/deep-research-profile.json`
- `agent-platform/configs/planning/deep-research-template.json`
- `agent-platform/configs/agents/deep-research-agent.json`
- `agent-platform/docs/deep-research-agent.ko.md`
- `_ops/workflows/57-deep-research.md`
- `_ops/prompts/87-deep-research.md`
- `_specs/workspace-platform/2026-06-01-deep-research-agent/`
- `_history/web-searches/2026/2026-06-01-deep-research-agent.ko.md`
- `_history/work-timings/2026/2026-06-01-deep-research-agent.json`

## evaluator 출력 요약

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

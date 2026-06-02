# Workspace Platform Philosophy 발표 검증 계획

## 검증 명령

```bash
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/workspace-platform-philosophy.ko.json presentation-agent/artifacts/html/workspace-platform-philosophy.html
PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests
cd presentation-agent && npm run test:browser
python3 _tools/workspace-index/src/workspace_index.py
python3 _tools/naming-audit/src/naming_audit.py --check
python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-workspace-platform-philosophy.json
PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-workspace-platform-philosophy-grounding.json
PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-workspace-platform-philosophy-omission.json
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-workspace-platform-philosophy-evaluation-input.json
git diff --check
```

## 수동 검토

- 슬라이드 수와 발표 흐름이 30분 발표에 맞는지 확인한다.
- 발표 스크립트가 먼저 완성되어 있고 deck spec은 그 축약본인지 확인한다.
- 사실 주장에는 내부 문서 또는 외부 출처가 연결되어 있는지 확인한다.

# 추적성

## 사용자 요청

- `UR-2026-06-01-027`: 핫한 오픈소스 하네스를 조사하고 현재 구조에 적용할 만한 것이 있는지 찾아달라는 요청.

## 요구사항

- `REQ-PA-014`: 발표 품질 하네스.

## 산출물

- `presentation-agent/configs/evaluation/harness-candidates.json`
- `presentation-agent/docs/workflows/presentation-quality-harness-workflow.ko.md`
- `presentation-agent/docs/research/2026-06-01-open-source-harness-review.ko.md`
- `_research/topics/presentation/2026-06-01-open-source-harness-review.ko.md`
- `_history/web-searches/2026/2026-06-01-open-source-harness-review.ko.md`

## 검증

- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.catalog presentation-agent/data/reference-index/starter-reference-catalog.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../presentation-agent/configs/evaluation/harness-candidates.json`

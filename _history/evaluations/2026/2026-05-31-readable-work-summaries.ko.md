# 작업 요약 인덱스 평가

## 초기 지시

사용자가 "너가 어떤걸 했는지 내가 나중에 문서를 보고 쉽게 알 수 있게 해줘야해"라고 지시했다.

## 결과 요약

- `_history/work-summaries/`를 빠른 작업 요약 계층으로 추가했다.
- 한국어/영어 README, 2026-05-31 날짜별 요약, 브라우저용 `index.html`, 재사용 템플릿을 만들었다.
- 지속 지시, AGENTS, README, 운영 인덱스, close/evaluation 프롬프트와 워크플로를 갱신했다.
- `work-evaluator-agent`에 `work_summary_targets`를 추가해 사용자용 요약 파일이 없으면 종료 평가에서 blocking gap으로 잡히게 했다.
- memory bootstrap manifest에 작업 요약 정책을 warm required anchor로 추가했다.
- 관련 조사 노트와 계획 기록을 저장했다.

## 확인한 레퍼런스

- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
- [Architectural Decision Records](https://adr.github.io/)
- [Microsoft Learn: Maintain an architecture decision record](https://learn.microsoft.com/da-dk/azure/well-architected/architect-role/architecture-decision-record)
- [Diataxis](https://diataxis.fr/)
- `_history/README.md`
- `_ops/workflows/30-close-and-index.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `agent-platform/docs/work-evaluator-agent.md`

## 검증

- `PYTHONPATH=src python3 -m unittest discover -s tests`: 46 tests OK
- `python3 -m json.tool configs/memory/bootstrap-manifest.json`: 통과
- `python3 -m json.tool configs/evaluation/work-evaluation-template.json`: 통과
- `python3 -m json.tool _ops/coordination/status.json`: 통과
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `check-config-contract`: `self_documenting`
- `workspace-index`: maps regenerated
- `task-board`: coordination boards regenerated
- `workspace-index --check`: 통과
- `task-board --check`: 통과
- `git diff --check`: 통과
- `knowledge-skeptic-agent`: `ready_to_reference`
- `hallucination-guard-agent`: `ready_to_publish`
- `work-evaluator-agent`: `ready_to_close`, gaps 없음

## 평가 결과

초기 지시와 결과가 일치한다. 이제 사용자는 `_history/work-summaries/index.html` 또는 `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md`를 먼저 열어 완료된 작업을 빠르게 파악할 수 있고, 필요하면 상세 일지, 계획, 평가, 주요 파일로 이동할 수 있다.

## 개선 아이디어

나중에 작업 요약이 많아지면 `_history/work-summaries/index.html`과 날짜별 요약을 자동 동기화하는 Python 도구를 추가할 수 있다.

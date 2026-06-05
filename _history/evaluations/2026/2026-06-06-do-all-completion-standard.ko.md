# 평가: Do-All Completion Standard

## 결과

사용자 지시 “다하기”를 durable instruction과 omission prevention workflow에 반영했다. 앞으로 부분 처리로 완료 선언하지 않고, 적용 가능한 전체 결과물과 검증을 완료 기준으로 삼는다.

## 변경 사항

- `AGENTS.md`: do-all completion standard 추가.
- `_docs/instructions/persistent-instructions.*.md`: 한국어/영어/공통 지속 지시 추가.
- `_ops/workflows/68-omission-prevention.md`: “다하기/전부/모두/do all”을 expected items로 확장.
- `agent-platform/configs/memory/bootstrap-manifest.json`: do-all completion standard를 memory anchor와 update trigger에 반영.
- `_history/mode-selections/2026/2026-06-06-do-all-completion-standard.json`: durable behavior 변경으로 `governance` mode 선택 기록.
- `_history/work-timings/2026/2026-06-06-do-all-completion-standard.json`: partial timing 기록.

## 검증

- 통과: `python3 _tools/docs-audit/src/docs_audit.py --check`
- 통과: `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`
- 통과: `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json >/dev/null && git diff --check`
- 통과: `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- 통과: `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-06-do-all-completion-standard.json`
- Commit/push는 이 평가 기록을 포함해 close-out gate에서 수행한다.

## 리스크

- 이 변경은 운영 규칙 문서와 bootstrap config 변경이며 앱 빌드 산출물에는 영향이 없다.

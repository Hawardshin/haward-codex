# 요청 추적: 사용자 관점 품질 Gate

## 요청

- 요청 ID: `UR-2026-06-03-048`
- 요약: 앞으로도 사용자 측면을 계속 생각하며 만들고, 사용자 관점을 제품 품질 gate로 적용한다.

## 구현

- `_docs/instructions/persistent-instructions.md`에 사용자 관점 제품 품질 gate를 추가했다.
- `_docs/instructions/persistent-instructions.ko.md`와 `_docs/instructions/persistent-instructions.en.md`에 같은 지속 지시를 한/영으로 반영했다.
- `agent-platform/configs/memory/bootstrap-manifest.json`의 persistent instruction 참조 용도에 `user-point-of-view product quality gate`를 추가했다.
- 요청/작업/검색/평가/누락 점검/타이밍 기록을 남겨 다음 세션에서도 해당 지시가 추적되도록 했다.

## 검증

- Web-first intake: ISO 9241-210, NN/g usability heuristics, Apple HIG, Microsoft Fluent accessibility를 확인했다.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: 통과
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`: 통과
- `git diff --check`: 통과

## 결과

- 사용자 관점은 앞으로 의미 있는 제품/UI/workflow/문서/setup/자동화 작업의 close-out gate가 된다.
- 기술적으로는 맞더라도 시작하기 어렵거나, 이해하기 어렵거나, 복구하기 어렵거나, 실제 사용자 흐름과 어긋나는 결과는 재작업 대상으로 취급한다.

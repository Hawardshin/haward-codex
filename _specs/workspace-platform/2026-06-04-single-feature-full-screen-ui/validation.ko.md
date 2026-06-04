# 검증: 단일 주 기능 화면 공간 원칙

## 검증 계획

- `_docs/instructions/`와 `_docs/policies/` 문서가 `_docs/registry.json` 구조 규칙을 지키는지 확인한다.
- `agent-platform/configs/memory/bootstrap-manifest.json`이 JSON으로 파싱되는지 확인한다.
- 변경 diff에서 기존 생성 snapshot 변경을 건드리지 않았는지 확인한다.
- 단일 주 기능 화면 원칙이 persistent instructions, UI policy, runtime adapter, memory bootstrap에 연결됐는지 확인한다.

## 결과

- passed: `python3 _tools/docs-audit/src/docs_audit.py --check`
- passed: `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json >/dev/null`
- passed: `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`
- passed: `git diff --check`
- reviewed: `git diff --stat`

## 주의

`git diff --stat`에는 작업 전부터 존재하던 generated snapshot 변경 3개가 함께 표시됐다. 이 파일들은 이번 변경 범위가 아니므로 stage/commit 대상에서 제외한다.

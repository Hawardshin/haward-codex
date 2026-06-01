# 구현 계획

## 작업 모드

- 선택: `governance`
- 이유: shared evaluator-adjacent platform behavior, persistent instructions, core config, workflow, requirements를 바꾸는 변경이다.

## 근거 출처

- Python `tempfile`: temporary file/directory cleanup과 context manager
- Node.js `fs`: file stream/write behavior
- OWASP Path Traversal: absolute path와 `../` 위험
- CWE-22: filename/path validation과 traversal class
- 기존 내부 근거: `REQ-WS-058`, `cli-pipeline-agent`, `resource-guard-agent`

## 단계

1. web-first intake와 mode selection 기록을 남긴다.
2. 요구사항 `REQ-WS-059`를 추가한다.
3. `cli_pipeline.py`에 artifact data model과 검증기를 추가한다.
4. 템플릿과 docs/workflow/prompt/persistent instructions를 갱신한다.
5. path traversal, missing artifact id, unknown producer, ready artifact handoff 테스트를 추가한다.
6. config, memory, unit test, omission, resource, grounding, evaluator 검증을 실행한다.
7. history, timing, request trace, work summary를 남기고 commit/push 한다.

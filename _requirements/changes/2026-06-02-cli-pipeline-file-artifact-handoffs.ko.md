# CLI Pipeline 파일/아티팩트 Handoff 요구사항 변경

## 변경 ID

- `REQ-WS-059`
- 날짜: 2026-06-02
- 출처 요청: `UR-2026-06-02-014`
- 작업 모드: `governance`

## 변경 요약

사용자가 기존 pipe 중심 설명에 이어 “파일과 기타 등등”을 추가로 언급했다. 이를 multi-CLI orchestration에서 stdout/stderr/stdin pipe뿐 아니라 파일, 임시 파일, 디렉터리, cache, log, report, 기타 artifact handoff까지 명시적으로 관리하라는 요구로 해석했다.

## 요구사항

CLI pipeline이 파일 또는 artifact로 데이터를 넘기면 각 handoff는 다음을 기록해야 한다.

- `artifact_id`
- kind
- workspace-relative path
- producer/consumer process
- size bound
- format
- cleanup 또는 retention policy
- provenance
- validation

`mode=file` 또는 `mode=artifact` pipe는 반드시 `artifact_id`를 참조해야 한다. 경로에 absolute path, drive prefix, backslash, `~`, `..`가 있으면 재작업 대상이다.

## 근거

- Python `tempfile` 공식 문서는 고수준 temporary file/directory API가 context manager와 자동 cleanup을 제공하지만 lower-level API는 수동 cleanup이 필요함을 설명한다.
- Node.js `fs` 공식 문서는 file stream/write 동작과 반복 write의 안전성 주의를 제공한다.
- OWASP Path Traversal과 CWE-22는 absolute path, `../`, directory separator 등 path input validation 위험을 다룬다.

## 영향 파일

- `agent-platform/src/agent_platform/integrations/cli_pipeline.py`
- `agent-platform/configs/integrations/cli-pipeline-template.json`
- `agent-platform/docs/cli-pipeline-agent.ko.md`
- `_ops/workflows/71-cli-pipeline-orchestration.md`
- `_ops/prompts/101-cli-pipeline-orchestration.md`

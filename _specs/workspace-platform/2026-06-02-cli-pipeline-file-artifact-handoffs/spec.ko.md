# CLI Pipeline 파일/아티팩트 Handoff Spec

## 목적

CLI orchestration이 pipe뿐 아니라 파일, 임시 파일, 디렉터리, cache, log, report 같은 handoff를 사용할 때, 암묵적 경로나 임시 산출물이 생기지 않도록 검증 가능한 artifact 계약을 둔다.

## 요구사항 연결

- `REQ-WS-059`
- 관련: `REQ-WS-053`, `REQ-WS-057`, `REQ-WS-058`

## 기능 범위

- `CliPipelineInput`에 `artifacts`를 추가한다.
- `PipelinePipe`에 `artifact_id`를 추가한다.
- `mode=file` 또는 `mode=artifact` pipe는 존재하는 artifact를 참조해야 한다.
- artifact는 kind, path, producer/consumer, size bound, format, cleanup/retention, provenance, validation을 검증한다.
- artifact path는 workspace-relative여야 하며 absolute path, drive prefix, backslash, `~`, `..`를 금지한다.

## 비범위

- 실제 CLI process runner
- 실제 파일 I/O 실행
- 파일 parser 구현
- workspace outside path resolution 실행

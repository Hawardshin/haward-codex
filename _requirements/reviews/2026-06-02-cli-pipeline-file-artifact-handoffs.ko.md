# CLI Pipeline 파일/아티팩트 Handoff 요구사항 검토

## 검토 대상

- `REQ-WS-059`
- 관련 기존 요구사항: `REQ-WS-053`, `REQ-WS-057`, `REQ-WS-058`

## 판단

이 요구사항은 기존 `REQ-WS-058`을 대체하지 않고 확장한다. 기존 요구사항은 multi-CLI process graph와 pipe/fan-in merge를 다뤘고, 새 요구사항은 파일 기반 handoff에서 누락될 수 있는 path boundary, cleanup/retention, provenance, validation을 보강한다.

## 수용 기준

- `check-cli-pipeline`은 `artifacts`를 읽고 검증한다.
- `mode=file` 또는 `mode=artifact` pipe는 `artifact_id`가 없거나 존재하지 않는 artifact를 참조하면 실패한다.
- artifact path는 workspace-relative여야 하며 absolute path, drive prefix, backslash, `~`, `..`를 거부한다.
- required artifact는 positive `max_bytes`와 validation을 가져야 한다.
- temporary/cache artifact는 `cleanup_policy`가 필요하다.
- retained output/log/report/directory는 `retention_policy`가 필요하다.

## 비범위

- 실제 multi-process runner 구현
- 실제 파일 생성/삭제 실행
- CLI별 output parser 구현

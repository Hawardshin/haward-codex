# Work Summary: Storage Architecture Review

작성일: 2026-06-06

## 요약

Desktop app 저장소 구조를 검토해 전체 파일시스템 유지와 전체 DB 전환 모두를 배제하고, durable repository files와 embedded SQLite operational DB를 결합하는 하이브리드 전략을 기록했다.

## 핵심 결론

- 정책/요구사항/스펙/철학/히스토리는 파일과 Git을 유지한다.
- task run, decision inbox, workspace/history/source index, telemetry는 SQLite operational plane 후보로 둔다.
- generated snapshots는 renderer/package용 rebuildable cache로 유지한다.
- SQLite dependency 설치는 다음 slice에서 audit와 rollback 계획 후 진행한다.

## 검증

- JSON validation passed
- `collect`, `check`, `test`, `build` passed
- `desktop:package:internal` passed

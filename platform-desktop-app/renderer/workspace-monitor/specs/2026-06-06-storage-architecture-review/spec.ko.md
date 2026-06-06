# Storage Architecture Review 스펙

## 목표

Workspace Monitor와 Tauri desktop runtime의 파일 기반 저장 구조를 검토하고, 파일로 남길 durable knowledge와 embedded DB로 옮길 operational data를 분리한다.

## 설계 결정

- 선택 구조: hybrid files plus embedded operational DB.
- durable repository files는 Git diff, review, migration trace가 필요한 진실원으로 유지한다.
- generated snapshots는 renderer/package용 rebuildable cache로 유지한다.
- task run, decision inbox, workspace/history/source index, performance telemetry는 SQLite operational DB 후보로 분리한다.
- DB 의존성 설치는 별도 installation audit, license/security review, rollback, package verification 이후 진행한다.

## 수용 기준

- storage architecture registry가 self-documenting fields를 가진다.
- 현재 파일 기반 pressure point가 source path와 함께 기록된다.
- DB migration slice가 task runs, decisions, workspace index, telemetry를 다룬다.
- 전체 DB 전환을 금지하고 hybrid 기준을 명시한다.
- `collect`, `check`, `test`, `build`, internal package를 통과한다.

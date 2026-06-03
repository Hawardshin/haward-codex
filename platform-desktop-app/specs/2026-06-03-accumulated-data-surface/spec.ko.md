# Accumulated Data Surface 스펙

## 목표

- 사용자가 설치형 데스크톱 앱 안에서 축적되는 데이터를 쉽게 볼 수 있게 한다.
- task run, decision inbox, installer payload audit, support bundle, agent workspace를 하나의 읽기 전용 인덱스로 보여준다.
- 이 인덱스는 platform source tree를 탐색하게 하는 기능이 아니라, 앱이 소유한 runtime data store의 상태를 요약하는 제품 surface여야 한다.
- raw store scan은 refresh 수단으로만 쓰고, 사용자-visible 조회 기준은 `app_data/runtime-data/indexes/accumulated-data-overview.v1.json` versioned manifest로 남긴다.

## 기능

- `get_accumulated_data_overview`: Tauri backend command로 누적 데이터 store 목록, record count, total size, latest update, path, visibility, purpose, action label을 반환한다.
- `AccumulatedDataOverviewReport`: `schemaVersion`, `storageFormatVersion`, `indexPath`, `formatMigrationStatus`를 포함하고 같은 내용을 versioned manifest로 저장한다.
- Bounded scan: 각 store는 `MAX_ACCUMULATED_DATA_SCAN_FILES` 상한 안에서 metadata를 읽고, symlink는 따라가지 않는다.
- Workspace Monitor Desktop: `Accumulated Data` metric, command palette action, `축적 데이터 인덱스` 패널을 추가한다.
- Runtime contract: installer shell runtime contract의 command surface와 data accumulation targets에 accumulated data index를 포함한다.

## 비범위

- raw stdout/stderr 전체 검색 UI.
- 고객이 임의 경로를 file explorer처럼 직접 순회하는 기능.
- retention 설정, backup/export 정책 전체 구현.
- public release readiness blocker 해소.

## 수용 기준

- 사용자는 Desktop Runtime 화면에서 전체 누적 record 수, store 수, size, latest update를 볼 수 있다.
- 사용자는 Accumulated Data 패널에서 manifest schema, storage format, migration status, index path를 볼 수 있다.
- 각 store card는 경로와 visibility를 표시한다.
- backend command는 report를 반환하기 전에 `accumulated-data-overview.v1.json`을 app data runtime index 위치에 저장한다.
- 새 backend command와 UI token은 readiness/test에서 검증된다.
- Rust/TypeScript/check/test가 통과한다.

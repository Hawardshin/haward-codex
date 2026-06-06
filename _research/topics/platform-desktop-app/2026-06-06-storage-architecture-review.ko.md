# Platform Desktop App Storage Architecture Research

작성일: 2026-06-06

## 요약

Desktop app은 파일시스템만으로 모든 런타임 데이터를 관리할 수도 있지만, task timeline, decision inbox, search index, telemetry처럼 반복 조회되는 운영 데이터는 embedded DB가 더 적합하다. 현재 `platform-desktop-app`은 Git-auditable repository knowledge를 핵심 자산으로 삼기 때문에 전체 DB 전환은 맞지 않는다.

## 채택한 인사이트

- SQLite는 local embedded database로 적합한 공식 선택지다.
- Tauri v2 환경에서도 SQLite plugin 경로가 존재한다.
- app data/cache/log 디렉터리를 쓰는 desktop storage plane은 소스 트리와 분리해야 한다.
- DB는 운영 인덱스와 이벤트 저장소로 사용하고, 정책/스펙/히스토리는 파일로 유지한다.

## 로컬 소스 영향

- `collect-workspace.mjs`: document/source/history scan과 generated JSON snapshot 생성이 있음.
- `src-tauri/src/lib.rs`: task run record/log와 workspace state JSON persistence가 있음.
- `runtime-data-boundary-registry.json`: runtime data가 source가 아니라는 기존 원칙이 있음.

## 결정

`hybrid_files_plus_embedded_operational_db`를 선택한다.

## 다음 조사 필요

- `rusqlite` vs `sqlx` vs `tauri-plugin-sql` 구현 선택
- SQLite WAL, backup, migration, corrupt DB recovery
- full-text search 필요성
- DB rebuild/export UX

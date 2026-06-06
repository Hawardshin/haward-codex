# Coding Research: Desktop Storage Architecture

작성일: 2026-06-06
대상 프로젝트: `platform-desktop-app`

## technology_stack

- Desktop shell: Tauri v2, Rust
- Renderer: TypeScript/React/Vite workspace monitor
- Runtime records: current Rust `serde_json` file-backed records
- Candidate embedded DB: SQLite through Rust-owned commands or Tauri SQL plugin

## reference_config_paths

- `platform-desktop-app/configs/runtime-data-boundary-registry.json`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/configs/storage-architecture-registry.json`

## source_types

- official_docs
- local_source
- architecture_decision_record
- repository_policy

## technology_official_docs

- SQLite: https://www.sqlite.org/whentouse.html
- Tauri SQL plugin: https://v2.tauri.app/plugin/sql/
- Apple Core Data: https://developer.apple.com/documentation/coredata
- Electron app API: https://www.electronjs.org/docs/latest/api/app

## stack_version_constraints

- Current Cargo dependencies include Tauri v2 and `serde_json`; no SQLite crate or Tauri SQL plugin is installed yet.
- SQLite migration must be project-local and must not require global installs.

## language_options

| 옵션 | 장점 | 단점 | 판단 |
| --- | --- | --- | --- |
| Rust/Tauri-owned SQLite commands | renderer SQL 권한을 제한하고 app data path, migration, recovery를 Rust에서 통제 가능 | command/schema 작성 필요 | 선택 기본값 |
| Frontend Tauri SQL plugin direct usage | 빠른 prototyping, JS binding 제공 | renderer가 SQL 호출 계층을 직접 알게 되어 권한/경계가 흐려질 수 있음 | 보조/제한적 사용 후보 |
| Node/Vite-side JSON index 유지 | 현 구조와 가까움 | installed desktop runtime의 app data, migration, query 성능을 충분히 활용하지 못함 | 장기 해법으로 부적합 |

## selected_language

Rust-owned SQLite operational store, with TypeScript renderer consuming typed Tauri commands.

## language_decision_notes

Rust가 desktop runtime 권한, 파일 경계, app data path, migration, corruption recovery, support export를 소유하는 편이 유지보수성과 보안 경계에 맞다. TypeScript는 UI와 typed command 호출만 담당한다.

## architecture_options

| 옵션 | 설명 | 장점 | 위험 | 판단 |
| --- | --- | --- | --- | --- |
| All filesystem | 모든 state/index를 Markdown/JSON/log 파일로 유지 | Git/audit 쉬움 | scan/parse/sort/index 비용 증가, query 약함 | 현 구조의 병목 |
| All database | 모든 docs/history/settings/runtime을 DB로 이동 | indexed query 쉬움 | Git diff와 durable knowledge provenance 약화 | 부적합 |
| Hybrid files + embedded operational DB | durable knowledge는 파일, runtime/index는 DB | audit성과 성능 균형 | schema/fallback/rebuild 설계 필요 | 선택 |

## architecture_reference_sources

- SQLite official appropriate uses
- Tauri SQL plugin docs
- Apple Core Data docs
- Electron app data path docs
- Local source: `collect-workspace.mjs`, `src-tauri/src/lib.rs`

## architecture_theory_sources

- embedded database for local app data
- app-specific data/cache/log directory separation
- rebuildable cache/materialized view pattern

## architecture_practitioner_sources

- Tauri official plugin shape
- Electron official app path API
- Current repo runtime data boundary registry

## architecture_decision_notes

하이브리드가 맞다. 파일은 durable source and audit plane, DB는 operational query/index plane이다. generated snapshot은 rebuildable cache로 유지한다.

## architecture_tradeoff_notes

- DB 도입은 warm startup과 indexed query에 유리하지만 schema migration, recovery, backup, privacy policy가 필요하다.
- 파일 유지 방식은 투명하지만 high-churn runtime query에는 부적합하다.
- DB만으로 React tab remount 비용은 해결되지 않는다.

## folder_structure_options

| 옵션 | 구조 | 판단 |
| --- | --- | --- |
| `platform-desktop-app/configs/storage-architecture-registry.json` | 제품 저장소 의사결정 registry | 선택 |
| `agent-platform/configs/storage/...` | 전역 플랫폼 storage policy | 이번 요청은 desktop app 특화라 과함 |

## folder_structure_decision_notes

Desktop app 저장소 전략이므로 `platform-desktop-app/configs/`에 registry를 두고, 요구사항과 architecture docs는 같은 프로젝트 `docs/` 아래 둔다.

## folder_semantics_notes

- `configs/`: 실행 가능한 제품 결정 registry
- `docs/architecture/`: 사람이 읽는 판단 근거
- `renderer/workspace-monitor/specs/`: 구현 가능한 migration slice spec

## maintainability_notes

다음 구현자는 `storage-architecture-registry.json`의 `migration_slices`에서 `db-001`부터 시작하면 된다. SQLite dependency를 추가하기 전 installation audit를 남겨야 한다.

## issue_discussion_sources

이번 변경은 dependency 설치 없이 공식 문서와 로컬 소스 기반의 architecture review라 high-signal issue/discussion 조사는 구현 전 단계로 보류했다.

## issue_discussion_notes

SQLite crate/plugin 선택 구현 단계에서는 Tauri plugin issues, sqlx/rusqlite issues, SQLite WAL/corruption/backup guidance를 추가 조사해야 한다.

## community_signal_notes

공식 문서가 충분한 1차 근거였다. 커뮤니티 신호는 adoption/risk discovery 용도로만 다음 implementation slice에서 사용한다.

## code_reference_sources

- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/configs/runtime-data-boundary-registry.json`

## code_reference_notes

현재 collector는 많은 repository docs/history/config roots를 scan/parse해서 generated JSON snapshots를 만든다. Tauri runtime은 task run과 workspace state를 JSON/log files로 누적한다. 이 둘은 DB operational index 후보와 durable file source를 분리해야 하는 직접 근거다.

## post_research_answers

- DB가 필요한가: 예, task run/decision/index/telemetry에는 필요하다.
- 모든 파일을 DB로 옮겨야 하나: 아니오, durable knowledge는 파일 유지가 맞다.
- 지금 설치해야 하나: 아니오, dependency audit와 schema/fallback 계획 후 `db-001`에서 설치한다.
- 성능 개선 범위: warm startup/query/index 개선에는 유효하나 React render/remount 문제는 별도 최적화가 필요하다.

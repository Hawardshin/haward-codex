# Rust 런타임 기능별 소스 분리 스펙

날짜: 2026-06-06

## 목표

Tauri Rust runtime의 단일 `lib.rs` 중심 구조를 기능별 source folder 구조로 나누기 시작한다. 첫 slice는 큰 helper 이동보다 안전한 feature ownership map을 추가하고, 새 Tauri command와 UI metric으로 기능별 구조를 노출한다.

## 구조

- `src-tauri/src/features/mod.rs`: report schema, group aggregation, test
- `src-tauri/src/features/app_shell.rs`: app health, contract, feature map
- `src-tauri/src/features/cli.rs`: CLI adapters, sessions, task pipelines
- `src-tauri/src/features/native.rs`: terminal setup, OS pipe, OS action, PTY, clipboard
- `src-tauri/src/features/workspace.rs`: workspace host, source files, cache, Git, resource snapshot
- `src-tauri/src/features/providers.rs`: provider credentials, model catalog, provider task
- `src-tauri/src/features/diagnostics.rs`: runtime data, accumulated data, payload audit, support, readiness, preferences
- `src-tauri/src/features/agent_factory.rs`: agent proposal and learning feedback
- `src-tauri/src/features/decisions.rs`: human decision inbox and resume

## 새 command

`get_rust_runtime_feature_map`은 read-only static report를 반환한다.

반환 내용:

- `sourceLayout`: root module, feature root, grouping policy, command registration rule
- `groups`: 기능별 source module, 역할, command 목록, risk boundary, follow-up
- `totalGroups`, `totalCommands`
- `migrationNotes`

## 설계 선택

| 선택지 | 판단 |
| --- | --- |
| 모든 Rust helper 즉시 이동 | 충돌과 regression 위험이 큼 |
| command wrapper만 먼저 이동 | Tauri macro/test/script를 많이 바꿔야 함 |
| 기능별 feature map module을 먼저 추가 | 선택. 안전하게 구조 경계를 만들고 다음 이동 기준을 제공 |

## 유지할 제약

- Tauri `invoke_handler`는 한 번만 등록한다.
- command 이름은 module이 달라도 중복하지 않는다.
- process/PTY/pipe/credential/workspace path 경계는 기능별로 분리해서 기록한다.
- 새 권한이나 외부 dependency 없이 read-only 기능 구조를 노출한다.

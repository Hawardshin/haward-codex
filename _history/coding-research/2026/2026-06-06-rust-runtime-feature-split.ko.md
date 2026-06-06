# Rust Runtime Feature Split 코딩 리서치

날짜: 2026-06-06

## technology_stack

- Rust 2021
- Tauri v2
- React/Next renderer
- Existing `platform-desktop-app/src-tauri`

## source_types

- official_docs: Rust Reference modules, Cargo Book workspaces, Tauri calling Rust
- source_code: current `src-tauri/src/lib.rs`, runtime contract scripts, readiness tests
- local_tests: cargo tests, Node tests, renderer checks

## language_options

| option | 판단 |
| --- | --- |
| Rust module split | 선택. native runtime 소유권과 기능 경계를 명확히 함 |
| TypeScript-only feature map | 제외. Rust source 분리 요구를 충족하지 못함 |

## architecture_options

| option | 판단 |
| --- | --- |
| 전체 `lib.rs` 즉시 대분해 | 위험이 큼. command/helper visibility와 Tauri macro 회귀 가능 |
| 기능별 metadata module 먼저 추가 | 선택. 구조 경계와 검증을 세우고 후속 이동 가능 |
| 별도 Rust crate workspace 생성 | 이번 범위에는 과함. 현 Tauri crate 내부 module이 충분 |

## code_reference_sources

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/scripts/check-runtime-contract.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## decision

`src-tauri/src/features/`를 기능별 source root로 만들고, 각 module이 command inventory와 risk boundary를 선언하게 했다. 실제 command wrapper/helper 이동은 다음 slice에서 feature별 테스트를 붙이며 진행한다.

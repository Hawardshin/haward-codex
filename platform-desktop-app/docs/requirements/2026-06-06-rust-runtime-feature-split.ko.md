# Rust 런타임 기능별 소스 분리 요구사항

날짜: 2026-06-06

## 요청 요약

사용자는 Rust source를 분리하고, 폴더 구조를 기능별로 나누며, 기능별 추가 기능을 넣으라고 요청했다.

## 요구사항

| ID | 요구사항 | 수용 기준 | 상태 |
| --- | --- | --- | --- |
| REQ-RFS-001 | Rust native runtime source에 기능별 폴더 구조를 만든다. | `src-tauri/src/features/` 아래 기능별 module 파일이 존재한다. | 충족 |
| REQ-RFS-002 | 기능별 command surface를 기계가 읽을 수 있게 노출한다. | `get_rust_runtime_feature_map` Tauri command가 feature groups와 commands를 반환한다. | 충족 |
| REQ-RFS-003 | 기존 native command와 process boundary를 깨지 않는다. | `cargo check`, `cargo test`, runtime contract, readiness, renderer tests가 통과한다. | 충족 |
| REQ-RFS-004 | UI에서 Rust 기능 구조를 확인할 수 있어야 한다. | Desktop Runtime diagnostics metrics에 Rust module/command count가 표시된다. | 충족 |
| REQ-RFS-005 | 다음 source 이동의 기준선을 남긴다. | spec/traceability에 후속 이동 대상이 기록된다. | 충족 |

## 비범위

- 12,000줄 `lib.rs`의 모든 helper를 한 번에 이동하지 않는다.
- unrestricted shell 실행이나 새 권한을 추가하지 않는다.
- 새 외부 Rust crate를 설치하지 않는다.

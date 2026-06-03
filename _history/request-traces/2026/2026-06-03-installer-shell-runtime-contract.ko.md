# 요청 추적: Installer Shell Runtime Contract

## 요청

- 요청 ID: `UR-2026-06-03-030`
- 날짜: 2026-06-03
- 요약: 프로젝트 전체 구조를 설치 프로그램과 설치 앱 shell/runtime 중심으로 리팩토링하고, shell이 저장소의 사용법/기능/규칙을 읽어 강제하며 데이터를 축적하는 구조로 만들어 달라는 요청.

## 결정

- 소유 프로젝트는 `platform-desktop-app/`이다.
- shared governance 폴더를 이동하지 않고, 설치 shell이 읽는 계약을 `platform-desktop-app/runtime-contracts/`에 추가한다.
- 계약은 Tauri resource로 번들하고 Rust command로 읽는다.
- 외부 shell sidecar 설치는 이번 범위에서 제외하고, 현재 Rust/Tauri shell runtime과 optional CLI adapter lane 구조를 유지한다.

## 산출물

- 요구사항: `PDA-REQ-030`
- 스펙: `platform-desktop-app/specs/2026-06-03-installer-shell-runtime-contract/`
- 구현: `platform-desktop-app/runtime-contracts/`, `platform-desktop-app/scripts/check-runtime-contract.mjs`, `platform-desktop-app/src-tauri/src/lib.rs`, `platform-desktop-app/src-tauri/tauri.conf.json`
- 평가: `_history/evaluations/2026/2026-06-03-installer-shell-runtime-contract-evaluation-result.json`

## 검증

- 결과: runtime contract check, config contract, Rust check, platform test/check, structure audit, omission/resource/evaluate-work 통과

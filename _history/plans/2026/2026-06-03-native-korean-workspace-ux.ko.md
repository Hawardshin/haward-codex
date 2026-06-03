# 계획 기록: 네이티브 한국어 작업공간 UX

- 날짜: 2026-06-03
- 요청 ID: `UR-2026-06-03-039`
- 소유 프로젝트: `platform-desktop-app/`
- 선택 모드: `standard`

## 계획

1. 웹 우선으로 Tauri dialog/folder picker와 frontend-to-Rust command 구조를 확인한다.
2. 현재 Workspace Monitor/Tauri 파일 작업공간 구현을 읽고, 기존 기능을 중복 구현하지 않고 제품 섹션으로 이동할 수 있는지 확인한다.
3. 요구사항 `PDA-REQ-039`와 spec/plan/tasks/validation/traceability를 만든다.
4. project-local Rust dependency 설치 감사를 남기고 `tauri-plugin-dialog`를 설치한다.
5. Rust command, capability, runtime contract를 연결한다.
6. `파일/코드` 섹션을 한국어 우선 native file workspace로 바꾸고 UI language state/settings를 추가한다.
7. readiness/test gate를 갱신한다.
8. Rust/TypeScript/Next/platform checks와 browser smoke를 실행한다.
9. 설치 기록, 요청 trace, work summary, omission/resource/grounding/evaluation 기록을 남긴다.

## 계획 변경

- 기존 Source Review 기능은 새로 만들지 않고 `DesktopRuntimePanel`의 파일 편집 엔진을 `surface="files"`로 재사용했다.
- Next dev server smoke는 in-app browser에서 HMR origin 경고가 있어 정적 `out/` 서버 smoke로 변경했다.

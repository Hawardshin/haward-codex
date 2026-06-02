# 요청-결과 추적: Desktop Decision Resume

- 요청 ID: `UR-2026-06-02-051`
- 날짜: 2026-06-02
- 작업 모드: `governance`
- 소유 프로젝트: `platform-desktop-app`, `workspace-monitor`

## 요청 요약

사용자가 설치형 다중 CLI 데스크톱 앱 구현을 계속 진행하라고 요청했다.

## 결과

- Tauri backend에 `answer_and_resume_human_decision` command를 추가했다.
- decision answer 저장 로직을 helper로 분리해 answer-only와 answer-and-resume이 같은 persistence contract를 공유한다.
- decision metadata의 `session_id`가 active session에 연결된 경우에만 answer text를 session stdin으로 보낸다.
- session이 없거나 finished/stdin unavailable이면 answer 저장은 유지하고 resume status/detail을 반환한다.
- Workspace Monitor Desktop 탭에 linked session id/status와 `Answer & Resume` 버튼을 추가했다.

## 연결 요구사항

- `PDA-REQ-023`
- `PDA-UX-016`

## 주요 산출물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/`
- `_history/web-searches/2026/2026-06-02-desktop-decision-resume.ko.md`

## 검증

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- omission/resource/grounding/evaluate-work checks

## 한계

- Rust/Cargo 미설치로 Tauri compile은 검증하지 못했다.
- 실제 CLI별 approval protocol은 다를 수 있어 free-form answer stdin injection만 제공한다.

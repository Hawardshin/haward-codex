# 요청-결과 추적: 데스크톱 사용자 개선

- 요청 ID: `UR-2026-06-02-050`
- 날짜: 2026-06-02
- 작업 모드: `governance`
- 소유 프로젝트: `platform-desktop-app`, `workspace-monitor`

## 요청 요약

사용자가 설치형 다중 CLI 오케스트레이션 데스크톱 앱에서 개선할 부분과 사용자 측면에서 더 넣으면 좋은 기능을 찾아 실제 구현까지 진행해 달라고 요청했다.

## 반영 결과

- Workspace Monitor Desktop 탭에 CLI별 설치/검증 안내를 추가했다.
- CLI session launcher에 `User Task`, `Platform Improvement`, `Knowledge Accumulation`, `Review & Verify` 모드 프리셋을 추가했다.
- Tauri command에 `_ops/coordination/human-decision-inbox.json` 조회/답변 기능을 추가했다.
- Desktop 탭에서 보류된 human decision을 선택하고 답변을 저장할 수 있게 했다.
- 자동 설치는 하지 않고 공식 출처와 검증 명령을 안내하는 방식으로 제한했다.

## 연결 요구사항

- `PDA-REQ-022`: 설치형 데스크톱 앱은 선택형 CLI별 설정 안내, 작업 모드 프리셋, 보류 결정 답변 UI를 제공해야 한다.
- `PDA-UX-015`: 사용자는 Desktop 탭에서 CLI 설정, 작업 모드, decision inbox 답변을 한 흐름으로 처리할 수 있어야 한다.

## 주요 산출물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/`
- `_history/web-searches/2026/2026-06-02-desktop-user-improvements.ko.md`
- `_research/topics/desktop-app/2026-06-02-desktop-user-improvements.ko.md`

## 검증

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-desktop-user-improvements-omission-input.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-02-desktop-user-improvements-resource-input.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-desktop-user-improvements-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-desktop-user-improvements-evaluation-input.json`

## 남은 한계

- 이 환경에는 Rust/Cargo가 없어 Tauri `.app` 컴파일과 실제 macOS signing/notarization 검증은 수행하지 못했다.
- 실제 CLI 인증, PTY 기반 terminal, Monaco 수준 편집기, installer/update flow는 후속 slice로 남겼다.

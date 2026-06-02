# 계획: Desktop User Improvements

## 작업 모드

- 선택: `governance`
- 이유: 데스크톱 앱의 사용자 흐름, CLI 설정 안내, human decision inbox 상태 변경 command를 추가한다.

## 개선 후보

- CLI setup assistant
- 작업 모드 기반 session prompt preset
- human decision inbox 조회/답변 UI
- provider auth 상태 점검
- PTY/xterm.js/Monaco 기반 더 강한 작업 표면

## 이번 선택

- 선택: setup guide, mode preset, decision inbox list/answer
- 제외: 자동 설치, provider auth 저장, PTY/xterm.js/Monaco 설치
- 이유: dependency 설치 없이 사용자 마찰을 줄이고, 이전 구현의 “defer 후 저장”을 “복귀 후 답변”까지 닫을 수 있다.

## touch paths

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/docs/requirements/`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/`
- `_history/`, `_requirements/`, `_research/`

## 검증

- TypeScript check
- Workspace Monitor tests/build
- Platform desktop readiness/tests
- Omission/resource/grounding/evaluation close-out
- Rust/Tauri compile은 Rust toolchain 미설치로 제외

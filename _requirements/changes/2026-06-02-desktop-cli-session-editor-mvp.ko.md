# 요구사항 변경: Desktop CLI Session / Source Editor MVP

## 변경 요약

- `PDA-REQ-020`: allowlist CLI pipe session, stdin, defer, cancel, human decision inbox 저장 요구사항 추가.
- `PDA-REQ-021`: workspace-scoped source file read/write와 backup 요구사항 추가.
- `PDA-UX-014`: Desktop 탭 session console/source editor 요구사항 추가.

## 변경 이유

사용자가 health-check MVP 이후 부족한 구현도 진행하라고 요청했다. 다음 최소 구현은 full PTY가 아니라 dependency 설치 없이 가능한 pipe session, defer 질문의 human decision inbox 저장, scoped file editing이다.

## 검증 대상

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/`

# 요청-결과 추적: terminal workspace continuation

## 요청 요약

사용자는 데스크톱 프로젝트 관리 플랫폼 구현을 계속 진행하고, 터미널 탭/CLI 실행/adapter 진단 문제를 근본적으로 줄이며, Rust와 TypeScript 대형 파일을 기능별로 분리하라고 요청했다.

## 결과 링크

- 요구사항: `_requirements/changes/2026-06-08-terminal-workspace-continuation.ko.md`, `platform-desktop-app/docs/requirements/2026-06-08-terminal-workspace-continuation.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-08-terminal-workspace-continuation/`
- 구현: `platform-desktop-app/renderer/workspace-monitor/components/workbench/runtime-terminal/`, `platform-desktop-app/renderer/workspace-monitor/components/workbench/native-git/`, `platform-desktop-app/src-tauri/src/features/providers_parts/`, `platform-desktop-app/src-tauri/src/features/service_readiness_parts/`, `platform-desktop-app/tools/awp/worktrees.py`
- 검증: `platform-desktop-app/specs/2026-06-08-terminal-workspace-continuation/validation.ko.md`
- 평가 입력: `_history/evaluations/2026/2026-06-08-terminal-workspace-continuation-evaluation-input.json`

## 결정

- worktree 진단은 Git mutation 없이 `git worktree list --porcelain`만 실행한다.
- Rust provider/service readiness 분리는 public command surface를 바꾸지 않는 `include!` 구조로 한다.
- 직접 변경된 TypeScript 작업대 파일은 500줄 미만으로 낮추되, 기존 giant file인 `MonitorShell.tsx`와 `ToolStudioPanel.tsx`는 다음 대형 분리 루프로 남긴다.

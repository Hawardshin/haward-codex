# 웹 검색 기록: terminal workspace continuation

- 날짜: 2026-06-08
- 목적: 터미널/작업공간 계속 구현 전에 공식 문서 기준을 확인.

## 검색

- `Tauri v2 official shell plugin command sidecar documentation`
- `xterm.js official addons fit search serialize documentation`
- `Git official worktree documentation`

## 확인한 출처

- Git worktree 공식 문서: `https://git-scm.com/docs/git-worktree.html`
- Tauri shell plugin 공식 문서: `https://v2.tauri.app/plugin/shell/`
- xterm.js addon 공식 문서: `https://xtermjs.org/docs/guides/using-addons/`

## 계획 영향

- worktree report는 Git 공식 porcelain 출력 기반으로 읽기 전용 진단만 구현한다.
- Tauri shell/sidecar 문서는 이번 slice에서 새 설치 없이 기존 native PTY/CLI runtime을 유지하는 근거로만 사용한다.
- xterm.js addon 문서는 터미널 표면이 addon 기반으로 확장 가능해야 한다는 방향을 확인했지만 이번 slice는 파일 분리에 집중한다.

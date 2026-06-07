# 출처 기록: terminal workspace continuation

## 외부 출처

- Git worktree 공식 문서: `https://git-scm.com/docs/git-worktree.html`
  - 사용처: AWP doctor의 `git worktree list --porcelain` 기반 읽기 전용 진단 설계.
- Tauri shell plugin 공식 문서: `https://v2.tauri.app/plugin/shell/`
  - 사용처: 데스크톱 앱이 CLI/셸을 게스트 어댑터로 다루는 기존 방향의 근거 확인.
- xterm.js addon 공식 문서: `https://xtermjs.org/docs/guides/using-addons/`
  - 사용처: 터미널 UI를 작은 addon/view 단위로 분리하는 설계 근거 확인.

## 로컬 출처

- `platform-desktop-app/docs/requirements/2026-06-08-terminal-workspace-continuation.ko.md`
- `platform-desktop-app/specs/2026-06-08-terminal-workspace-continuation/`
- `platform-desktop-app/scripts/readiness/source-structure.mjs`
- `platform-desktop-app/tests/awp-cli.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-scroll-containers.mjs`

## 적용 판단

외부 출처는 API/명령 형식과 설계 방향 확인용으로만 사용했다. 구현 세부는 현재 저장소의 기존 컴포넌트, readiness registry, 테스트 구조를 기준으로 맞췄다.

# 실행 계획: terminal workspace continuation

## 확인한 근거

- Git worktree 공식 문서로 `git worktree list --porcelain`의 읽기 전용 진단 적합성을 확인했다.
- Tauri shell plugin 공식 문서로 플랫폼이 CLI/셸을 직접 앱 런타임에서 호출할 수 있는 구조를 확인했다.
- xterm.js addon 문서로 터미널 UI는 작은 addon/view 단위로 분리해도 기존 렌더링 계약을 유지할 수 있음을 확인했다.
- 기존 구현에서 `RuntimeTerminalDrawer.tsx`, `NativeGitWorkbench.tsx`, Rust provider/service readiness feature, AWP CLI, AgentBuilder/source editor controller가 직접 변경 영역이었다.

## 실행 슬라이스

1. 터미널 drawer view 분리와 scroll/source readiness registry 갱신.
2. AWP doctor의 Git submodule/worktree/repository boundary 진단 보강.
3. Rust provider와 service readiness feature를 include part 파일로 분리.
4. Native Git, AgentBuilder, source editor controller의 직접 변경 영역을 작은 컴포넌트/hook으로 분리.
5. renderer check, platform test, cargo check, renderer build, Browser smoke 실행.
6. 운영 기록, omission/resource/evaluation close-out, 커밋과 푸시.

## 잔여 큐

- `ToolStudioPanel.tsx`와 `MonitorShell.tsx`는 여전히 큰 legacy 파일이다. 이번 루프에서는 직접 변경된 작업대 파일을 먼저 줄였고, 두 파일은 다음 대형 분리 루프에서 화면/상태/데이터 계층 단위로 분리해야 한다.

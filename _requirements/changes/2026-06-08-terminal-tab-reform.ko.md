# 요구사항 변경: 터미널 탭 개혁

## 변경 요약

- `REQ-WM-077`: 터미널 탭은 고급 설정과 원시 세션 목록을 먼저 보여주는 화면이 아니라 실행/복구 허브로 동작해야 한다.
- 사용자 기본 흐름은 런타임 준비 상태 확인, 작업 시작, 실제 셸 열기, CLI 연결 점검, 설정 복구 액션을 먼저 보여준다.
- 고급 프롬프트와 작업 폴더 세부 조정은 접힌 영역에 둔다.

## 근거

- 사용자가 터미널 탭과 PTY/CLI 연결 상태가 실제 동작과 다르게 보이고, 첫 실행을 시작하기 어렵다고 지적했다.
- xterm.js 공식 문서는 fit/search/link 같은 terminal addon 기반 상호작용을 터미널 surface에 붙이는 방식을 제공한다.
- Tauri shell/sidecar 문서는 외부 명령 실행이 명시적 권한과 상태 노출을 필요로 하는 런타임 경계임을 보여준다.

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`
- close-out omission/resource/evaluation guard

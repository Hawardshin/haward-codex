# 작업 요약: IDE Action Navigation

- Tool Studio에 `Alt+Enter` quick action menu를 추가했다.
- 상위 흐름 rail과 세부 mode rail을 Radix ContextMenu trigger로 감싸 우클릭 action menu를 제공했다.
- `Alt+1/2`로 parent flow, `Alt+←/→`로 이전/다음 detail mode를 이동하게 했다.
- 기존 `⌘B`, `⌘⇧E`, `⌘⏎`, `⌘⌥T` shortcut은 `selectMode` 경로를 사용해 parent stage와 selected tool을 함께 동기화한다.
- 스크린샷 artifact:
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-ide-action-navigation-desktop.png`
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-ide-action-navigation-mobile.png`

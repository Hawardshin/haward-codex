# 작업 요약: Terminal Agent Bridge

날짜: 2026-06-06

Desktop Runtime에 `terminal-agent-bridge`를 추가해 native PTY, CLI adapter, agent session 상태를 한 흐름으로 표시했다. 새 `startTerminalAgentBridge`는 PTY를 먼저 만들고 writable 상태가 아니면 agent CLI session을 시작하지 않는다. 기존 선택 실행 버튼도 action feedback용 실행 함수가 실패를 전파하도록 분리했다.

검증: workspace-monitor check/test, desktop renderer build, Browser smoke, developer collect, platform-desktop-app check, evaluate-work, git diff --check 통과.

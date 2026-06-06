# Traceability: Terminal Agent Bridge

| Requirement | Source target | Validation |
| --- | --- | --- |
| PTY와 agent 실행을 한 흐름으로 표시 | `MonitorShell.tsx`, `.terminal-agent-bridge` | Browser smoke, test |
| PTY 성공 후 CLI session 시작 | `startTerminalAgentBridge`, `createNativePtySession`, `createCliAdapterSession` | TypeScript check, test |
| 실패를 action feedback에 전파 | `startSelectedLaneAction`, `runDesktopAction` callers | TypeScript check, test |
| runtime 없는 preview에서 안전 비활성 | `terminalAgentBridgeCanStart` | Browser smoke |
| 새 dependency 없음 | `package.json` unchanged | git diff, build |

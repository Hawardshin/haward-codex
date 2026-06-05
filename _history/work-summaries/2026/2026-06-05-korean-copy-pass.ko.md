# Workspace Monitor Korean Copy Pass

- PDA-REQ-045를 추가해 고빈도 한국어 UI에서 어색한 한영 혼용 표현을 막는 기준을 남겼다.
- `MonitorShell.tsx`, Tool Studio, Runtime Terminal Drawer, Native Git Workbench의 사용자 표시 문구를 정리했다.
- `tool-studio.test.mjs`에 금지 표현 회귀 검사를 추가했다.
- 검증: `workspace-monitor test`, `workspace-monitor check`, `workspace-monitor build` 통과.

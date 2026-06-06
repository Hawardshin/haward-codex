# 추적성

| 요구사항 | 구현 대상 | 검증 |
| --- | --- | --- |
| 단계형 CLI 안내 | `MonitorShell.tsx` adapter settings | 정적 테스트, 빌드 |
| 명령 후보 표시/복사 | `MonitorShell.tsx`, CSS | `data-cli-command-copy` 테스트 |
| 누락 CLI degrade | Cockpit card setup ladder | 정적 테스트 |
| Provider 연결 상태 반영 | `adapterAuthReadyForAdapter`, `providerAuthStatusForAdapter` | 정적 테스트 |
| 버튼 목적 구분 | `cli-command-copy-row`, `agent-cli-command-stack` | CSS 테스트 |

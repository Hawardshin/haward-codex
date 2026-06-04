# Traceability: Button Interaction Latency

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| `REQ-WM-041` first paint와 heavy mount 분리 | `interactionContentReady`, Desktop/Source staged shell | CPU throttle 6 67-button audit |
| `REQ-WM-041` native refresh 지연 | `scheduleAfterFirstPaint`, mount refresh effect | in-app Browser settled smoke, check/test |
| `REQ-WM-041` 보조 계산 게이트 | `shouldPrepareSourceWorkspace`, `runRecordsOpen` guards | TypeScript, button audit long task 0 |
| runtime surface에서 source JSX 제거 | Source early return | Agents/Source/Intent → Desktop click audit |
| 작은 화면/overflow 보존 | staged shell CSS | button audit body overflow 0, scroll contract check |

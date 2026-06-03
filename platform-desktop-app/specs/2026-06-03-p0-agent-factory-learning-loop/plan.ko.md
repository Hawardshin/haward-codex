# Plan: P0 Agent Factory and Learning Loop

1. 제품 갭 레지스트리에서 남은 P0 항목과 acceptance를 확인한다.
2. Tauri app-data runtime store에 proposal/decision JSON을 저장하는 command를 추가한다.
3. Agents 화면에 Agent Factory wizard와 Learning Feedback Loop panel을 추가한다.
4. Runtime contract와 accumulated data overview가 새 저장소를 노출하도록 연결한다.
5. readiness/test를 구현 기준으로 갱신한다.
6. TypeScript, Rust, platform check/test, customer build를 실행한다.
7. 요구사항/spec/history/evaluation을 남기고 commit/push한다.

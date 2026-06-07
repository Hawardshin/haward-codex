# Omission Check

- 날짜: 2026-06-07
- 확인 항목:
  - 수동 동기화 버튼이 보이는가: 통과.
  - 계정 저장/삭제/검증 후 런타임 동기화 요청이 남는가: 통과.
  - workspace/source/AGENTS.md 변경 후 source cache와 readiness가 같이 갱신되는가: 통과.
  - 중복 동기화 요청이 폭주하지 않도록 큐가 있는가: 통과.
  - TypeScript와 계약 테스트가 새 토큰을 검사하는가: 통과.
- 남은 한계:
  - desktop/source 런타임 패널이 마운트되지 않은 상태에서는 요청이 대기하고, 패널이 활성화될 때 소비된다.


# 작업 요약: 구조/메모리/성능 마이그레이션

전체 구조를 성능/메모리 관점에서 점검했고, 근본 개선은 필요하다고 판정했다. 다만 전면 재작성 대신 실제 hot path를 먼저 줄였다.

이번 구현은 source snapshot full content 제거, bounded preview 전환, preview budget gate 추가, Monaco editor draft 입력의 throttled React sync다. developer snapshot은 source content 0개, preview 약 136KB로 내려갔다.

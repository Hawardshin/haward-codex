# 작업 요약: Agent Detail Switch Speed

- Agents 세부 기능 버튼 클릭 시 선택 상태는 즉시 바뀌고, 실제 heavy workspace 렌더는 첫 paint 이후 commit되도록 분리했다.
- 빠른 연속 클릭, disclosure 닫기, Agents 섹션 이탈 시 stale scheduled commit을 취소한다.
- `data-agent-detail-render-view`, `data-agent-detail-pending`, `aria-busy`를 추가해 상태를 검증 가능하게 했다.
- CPU throttle 6 버튼 감사에서 synthetic feedback p95 1.4ms, real click p95 29.1ms를 확인했다.

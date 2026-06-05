# 작업 요약: History Payload Migration

- Workspace Monitor 기본 snapshot에서 누적 `_history` 전체 중복 적재를 제거했다.
- 최근 history 96개만 inline으로 유지하고, 전체 2,220개 기록은 `admin-history-index.json`으로 생성했다.
- History/Documents 섹션 진입 시 관리자 색인을 lazy load해 병합하도록 UI를 변경했다.
- customer build는 내부 admin history index를 빈 색인으로 대체하도록 했다.

# Request Trace: History Payload Migration

| 항목 | 내용 |
| --- | --- |
| 사용자 요청 | 누적 history 기록을 파일 관리/token 측면에서 마이그레이션하고, 앞으로 더 좋은 표시 방식을 적용 |
| 요구사항 | PDA-REQ-043 |
| 구현 | 기본 snapshot inline history 제한, `admin-history-index.json`, History/Documents lazy load |
| 검증 | `collect`, `check:history-payload`, `test`, `check`; 최종 build/audit 예정 |
| 결과 | 기존 history 기록 2,220개는 보존하고 관리자 색인으로 분리 |

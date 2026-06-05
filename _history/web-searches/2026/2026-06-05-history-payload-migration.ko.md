# 2026-06-05 History Payload Migration Web Search

## 검색

- `JSON Lines format official documentation append-only logs`
- `SQLite WAL mode official documentation write-ahead logging`
- `Next.js optimize large JSON payload client performance official documentation`
- `WCAG 2.2 admin dashboard content readability information overload official`

## 확인한 출처

- JSON Lines 공식 문서: log file에 적합한 줄 단위 JSON 형식을 확인했다.
- SQLite WAL 공식 문서: append/write-ahead 계열 저장 전략은 장기 기록 저장 후보로 남겼다.
- Next.js large page data 공식 문서: 큰 JSON payload는 client parse와 memory 비용을 만든다는 점을 확인했다.
- W3C/WCAG 검색 결과: 관리자 화면도 읽기와 탐색 가능성을 잃지 않아야 한다는 접근성 기준을 재확인했다.

## 계획 영향

- 이번 slice에서는 원본 `_history` 파일을 이동하지 않고, static app과 호환되는 generated admin index를 먼저 도입한다.
- 기본 snapshot은 작게 유지하고, 관리자 History/Documents 표면에서만 전체 history index를 lazy load한다.
- SQLite/JSONL 원본 저장소 전환은 별도 migration plan과 rollback 검증이 필요하므로 보류한다.

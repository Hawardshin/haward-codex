# 작업 요약: History Payload Check Customer Snapshot

- 날짜: 2026-06-06
- 원인: customer renderer build 후 `public/admin-history-index.json`이 empty customer index로 남아 `check-history-payload.mjs`가 developer migrated index 요구와 충돌했다.
- 수정: collector가 `src/generated/admin-history-index.json`을 항상 쓰도록 하고, history payload check는 이 developer 원본을 기준으로 검증한다.
- 보강: public admin index는 developer migrated index 또는 customer empty index와 customer public snapshot 조합만 허용한다.
- 관련 smoke: source controls/terminal provider smoke가 developer snapshot과 같은 `src/generated/admin-history-index.json`을 복사하도록 변경했다.

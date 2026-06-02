# 질문 보류 성능 스펙

## 목적

다중 CLI lane과 긴 terminal output에서도 질문 보류 기능이 UI와 backend를 불필요하게 느리게 만들지 않도록 한다.

## 요구사항

- 질문 후보 감지는 전체 누적 output이 아니라 bounded recent tail만 scan해야 한다.
- active session polling은 이전 poll이 끝나기 전 새 poll을 시작하지 않아야 한다.
- decision inbox refresh는 자동 보류 감지 후에도 throttle되어야 한다.
- polling 결과는 기존 session report와 병합되어 실질 변경이 없으면 React state object를 재사용해야 한다.
- idle session의 elapsed display는 bucket 단위로 갱신해 출력 변화 없는 session이 2초마다 큰 rerender를 만들지 않게 해야 한다.

## 비범위

- Rust/Tauri native benchmark harness
- adapter별 semantic question classifier
- public macOS installer performance certification

## 수용 기준

- `MAX_DECISION_SCAN_BYTES`가 backend 질문 scan 상한으로 사용된다.
- UI에 `activeSessionPollInFlightRef`, `INBOX_REFRESH_THROTTLE_MS`, `mergeSessionReports`가 적용된다.
- readiness/test/typecheck/build/performance budget validation이 통과한다.

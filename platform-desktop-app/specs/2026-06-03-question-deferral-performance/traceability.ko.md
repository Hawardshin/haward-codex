# 질문 보류 성능 추적성

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| PDA-UX-022 bounded scan | `MAX_DECISION_SCAN_BYTES`, `recent_session_output` | readiness/test/static token |
| PDA-UX-022 overlap 방지 | `activeSessionPollInFlightRef` | TypeScript check |
| PDA-UX-022 throttle | `INBOX_REFRESH_THROTTLE_MS` | TypeScript check |
| PDA-UX-022 render 병합 | `mergeSessionReports`, render signature bucket | TypeScript check, performance budget |

## 외부 근거

- React `useEffect`는 외부 시스템 동기화와 interval cleanup에 사용된다.
- Rust `std::process::Child`는 child lifecycle과 wait/cleanup을 명시적으로 관리해야 한다.

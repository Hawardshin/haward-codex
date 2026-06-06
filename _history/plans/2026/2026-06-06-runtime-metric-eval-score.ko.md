# 2026-06-06 runtime metric EVAL score 계획

## 선택 이유

직전 작업의 잔여 위험은 종합 개선 점수가 실제 runtime metric보다 문서/계약 근거에 치우쳐 있다는 점이었다. 사용자는 반복적으로 "데스크톱 앱이 실제 OS 자원, RAM, CPU를 써야 한다"고 요구했으므로 다음 slice는 runtime metric을 EVAL score에 연결하는 것이 가장 직접적이다.

## 실행 순서

1. Web-first intake와 memory bootstrap.
2. 이전 close-out과 현재 source contract 확인.
3. Rust/Tauri snapshot에 semantic metric 추가.
4. `MonitorShell`에서 runtime snapshot 공유.
5. EVAL UI와 scoring 반영.
6. 테스트/계약/스냅샷 갱신.
7. build/package/Browser smoke.
8. history/evaluation/trace 정리.

## 후속 후보

- external EVAL runner 설치와 audit.
- tab transition latency와 long task time-series 수집.
- persistent telemetry store와 score trend 비교.

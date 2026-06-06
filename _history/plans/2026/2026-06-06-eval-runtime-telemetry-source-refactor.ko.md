# 2026-06-06 EVAL runtime telemetry source refactor 계획

## 선택 이유

사용자가 소스 개선을 요청했다. 가장 최근 변경에서 EVAL runtime telemetry score 계산이 UI component 내부에 커졌으므로, 기능 변화 없이 소스 구조를 개선하기 좋은 위치다.

## 실행 순서

1. Web-first intake와 memory bootstrap.
2. `EvaluationReportPanel.tsx` runtime telemetry 계산 위치 확인.
3. helper module 분리.
4. contract/test 업데이트.
5. check/test/build/package/Browser smoke.
6. 기록, 평가, commit, push.

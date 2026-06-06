# 계획: EVAL runtime telemetry source refactor

## 단계

1. Web-first intake와 memory bootstrap을 수행한다.
2. source 개선 범위를 EVAL runtime telemetry score model 분리로 제한한다.
3. 새 TypeScript helper module을 만든다.
4. `EvaluationReportPanel`이 helper를 사용하도록 바꾼다.
5. static contract check와 tests를 새 source boundary에 맞춘다.
6. package pipeline에 stale macOS DMG intermediate cleanup step을 추가한다.
7. collector, check, test, build, package, Browser smoke를 실행한다.
8. 요구사항/spec/history/evaluation/trace 기록을 완료하고 commit/push한다.

## 리스크 관리

- 새 dependency를 설치하지 않는다.
- score formula는 보존하고 위치만 바꾼다.
- static/browser fallback row는 유지한다.
- cleanup script는 Tauri macOS bundle root 바로 아래의 `rw.*.dmg` 파일만 삭제한다.

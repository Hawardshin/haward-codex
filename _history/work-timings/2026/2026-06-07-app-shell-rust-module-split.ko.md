# 2026-06-07 작업 시간 기록: 앱 셸 Rust 모듈 분리

## 단계별 기록

- 웹 우선 확인과 large-scope 분해: 약 4분
- 앱 셸 Rust 모듈 이동: 약 8분
- readiness/test 검사 기준 조정: 약 7분
- 개별 검증: 약 5분
- 내부 패키징, DMG 실패 조사, cleanup/recovery wrapper 구현, 반복 재검증: 약 25분
- 기록과 close-out 점검: 약 5분

## 병목

DMG bundling 단계가 generated intermediate 상태 때문에 반복 실패했다. 수동 script 재현으로 generated `bundle_dmg.sh --skip-jenkins` 복구 가능성을 확인했고, 이후 pipeline wrapper로 자동화했다.

## 다음 개선 후보

public package path에서도 동일한 recovery가 필요한지 별도 검토할 수 있다. 현재 public packaging은 signing/notarization/updater 게이트가 다르므로 내부 prepared build wrapper만 복구 대상으로 삼았다.

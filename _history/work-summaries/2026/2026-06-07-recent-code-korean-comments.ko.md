# 2026-06-07 작업 요약: 최근 구현 코드 한국어 주석

## 변경 요약

- 앱 셸 command 모듈에 runtime feature map, health check, installer contract fallback 의도를 설명하는 한국어 주석을 추가했다.
- 앱 업데이트 모듈에 pending update 상태, 실패 시 pending 제거, install 중 lock 해제, restart 경계를 설명하는 한국어 주석을 추가했다.
- DMG cleanup/recovery script에 반복 패키징 실패 방지, 복구 조건, `--skip-jenkins` 사용 이유, 삭제 범위 제한을 설명하는 한국어 주석을 추가했다.
- readiness source aggregate에 모듈 분리 후 검사 기준을 한 곳에서 관리하는 이유를 설명하는 한국어 주석을 추가했다.

## 범위 조정

모든 줄에 주석을 다는 방식은 피했다. 유지보수자가 의도와 안전 조건을 알아야 하는 경계에만 주석을 남겼다.

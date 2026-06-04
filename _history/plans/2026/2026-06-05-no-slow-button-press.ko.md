# 계획 기록: 버튼 클릭 무지연 계약

## 범위

- 대상 프로젝트: `platform-desktop-app/renderer/workspace-monitor`
- touch paths: `MonitorShell.tsx`, `globals.css`, `package.json`, tests, scripts, requirements/spec/history records
- 제외: generated snapshot 3개, 새 dependency 설치, native command 완료 시간 최적화

## 실행 계획

1. 공식 INP/long-task/React 문서 확인
2. 기존 버튼 성능 요구사항 확인
3. capture-phase instant button feedback 구현
4. CSS pressed state와 static regression test 추가
5. CPU throttle 6 `perf:buttons` audit 추가
6. test/check/build/perf/browser 검증
7. 기록, 평가, 커밋, 푸시

## 검증 게이트

- 67개 representative button sample 모두 즉시 feedback attr를 받아야 한다.
- synthetic feedback p95와 real nav click feedback p95가 CPU throttle 6에서 60ms 이하이어야 한다.
- generated snapshot 파일은 기존 dirty 상태로 유지한다.

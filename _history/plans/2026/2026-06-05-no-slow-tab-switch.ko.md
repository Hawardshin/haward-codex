# 계획 기록: 탭 전환 무지연 계약

## 범위

- 대상 프로젝트: `platform-desktop-app/renderer/workspace-monitor`
- touch paths: `MonitorShell.tsx`, `globals.css`, Tool Studio static tests, workspace-monitor requirements/spec/history records
- 제외: generated snapshot 3개, 새 dependency 설치, 실제 backend/runtime 구조 변경

## 실행 계획

1. 공식 성능/React 문서 확인
2. 기존 `section` 기반 렌더와 Source filter 경로 확인
3. `readySection` first-paint gate 구현
4. 전환 shell과 Source query gate 추가
5. static test, check, customer build, perf budget 실행
6. Browser/Playwright로 active-response timing 검증
7. 기록, 평가, 커밋, 푸시

## 검증 게이트

- 정적 테스트가 staged mount 계약을 잡아야 한다.
- CPU throttle 6에서 대표 탭 active-response p95 60ms 이하를 목표로 한다.
- generated snapshot 파일은 기존 dirty 상태로 남긴다.

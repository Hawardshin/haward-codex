# 누락/리소스 점검

## 누락 방지

- 사용자 요구: IntelliJ 디자인 참고, 더 많은 기능 UI 통합, 데스크톱 앱다운 구조.
- 반영: Run Configuration, Services, Problems, status bar를 `작업 실행` 상단에 구현.
- 반영: 검색 에이전트, CLI 세션, task pipe, readiness 점검 버튼을 기존 runtime action과 연결.
- 반영: 다크/라이트 토큰과 responsive collapse CSS 추가.
- 반영: product feature, user flow, reference advantage registries, readiness script, requirements/spec/history 업데이트.

## 리소스 점검

- 새 long-running process는 추가하지 않았다.
- 새 interval, subscription, file handle, network stream은 추가하지 않았다.
- 버튼은 기존 runtime 함수만 호출한다.
- 브라우저 스모크용 로컬 서버는 검증 후 종료해야 한다.

## 남은 확인

- 전체 테스트/build/browser smoke 완료 후 tasks와 evaluation에 결과를 반영한다.

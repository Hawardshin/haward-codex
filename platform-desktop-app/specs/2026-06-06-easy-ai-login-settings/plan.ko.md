# 계획: 쉬운 AI 로그인 설정

1. 공식 provider 인증 문서를 확인하고, 앱 내 가짜 OAuth가 아니라 공식 로그인/API key 흐름으로 범위를 정한다.
2. 기존 provider credential/report/model command surface를 inventory한다.
3. `ProviderAccountsPanel`을 가이드, 필터, 상태 pill, 모델 확인, 작업 기본값 선택이 있는 설정 센터로 확장한다.
4. CSS와 테스트/readiness 토큰을 추가해 기본 버튼처럼 보이는 provider 설정 UI 회귀를 막는다.
5. renderer/platform tests, readiness, collect, internal desktop package build를 실행한다.
6. history/evaluation/trace를 남기고 commit/push한다.

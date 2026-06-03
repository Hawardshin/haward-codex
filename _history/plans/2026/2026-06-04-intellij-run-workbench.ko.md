# 계획: IntelliJ식 실행 작업대

## 작업 모드

- `standard`
- 이유: UI 구현, 제품 레지스트리, 요구사항, 스펙, 검증 계약이 함께 바뀌는 의미 있는 기능 변경이다.

## 단계

1. 웹 검색으로 IntelliJ 공식 tool window 패턴을 확인한다.
2. 기존 Desktop Runtime UI와 runtime action 함수를 확인한다.
3. Run Configuration, Services, Problems, status bar 패널을 구현한다.
4. CSS를 테마 토큰과 responsive grid로 정리한다.
5. readiness script와 registries에 계약을 남긴다.
6. 요구사항, 스펙, 히스토리, 평가 기록을 만든다.
7. renderer/platform/test/build/browser smoke 검증을 완료한다.

## 제외

- IntelliJ asset 복사
- 신규 backend adapter
- 실사용 provider live API 호출

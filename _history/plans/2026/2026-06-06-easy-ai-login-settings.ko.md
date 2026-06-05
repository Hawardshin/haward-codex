# 계획 기록: 쉬운 AI 로그인 설정

## 범위

- Settings > Execution > provider accounts 화면을 AI 로그인/API key setup center로 개선한다.
- 기존 Tauri provider credential command를 재사용한다.
- 공식 provider 문서 기준으로 비공식 웹 세션 저장을 피한다.

## 실행 순서

1. 공식 docs와 기존 provider account 구현을 확인한다.
2. 요구사항/spec/history를 작성한다.
3. renderer panel과 CSS를 수정한다.
4. renderer test/readiness token을 추가한다.
5. tests/check/collect/internal package build를 실행한다.
6. omission/evaluation/trace를 작성하고 commit/push한다.

## Plan Impact

- fake OAuth 대신 공식 provider page opener + API key save flow로 구현한다.
- 새 native command는 추가하지 않는다.
- UX 개선은 필터, 상태 pill, 모델 확인, 작업 기본값 선택으로 제한한다.

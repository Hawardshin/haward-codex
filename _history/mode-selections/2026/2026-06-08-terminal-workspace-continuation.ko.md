# 모드 선택: terminal workspace continuation

- 날짜: 2026-06-08
- 선택 모드: `standard`
- 소유 프로젝트: `platform-desktop-app`

## 선택 이유

사용자 요청은 터미널 탭, Git 작업공간, 데스크톱 앱 분리 방향, 대형 파일 분리, 검증과 커밋/푸시까지 포함한 의미 있는 구현 작업이다. `quick`으로 처리할 수 없고, 정책/세계관 자체를 바꾸는 `governance`보다는 구현 중심의 `standard`가 적합하다.

## 적용 게이트

- web-first intake 기록 작성
- 요구사항/spec/plan/tasks/validation/traceability 작성
- 구현 후 renderer/Rust/platform 테스트와 build 실행
- Browser smoke 실행
- omission/resource/evaluation close-out 기록 작성

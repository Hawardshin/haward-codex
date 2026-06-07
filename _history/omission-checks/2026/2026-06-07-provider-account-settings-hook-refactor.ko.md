# 2026-06-07 provider account settings hook refactor omission check

- 사용자 요구:
  - 전반 구조 리팩토링을 계속한다.
  - 큰 소스 파일을 쪼갠다.
  - 공통 로직을 하나로 묶어 일관된 동작을 만든다.
  - TypeScript와 Rust 검증을 모두 확인한다.
- 처리 확인:
  - provider 계정/모델 로직을 `useProviderAccountSettings`로 분리했다.
  - provider 표시명/feedback id 중복 정의를 공통 catalog 사용으로 정리했다.
  - TypeScript check, JS tests, readiness scripts, Rust tests, package/run pipeline을 실행했다.
- 누락 위험:
  - 전체 `MonitorShell.tsx`가 아직 크다. 다음 슬라이스가 필요하다.
  - 공개 업데이트 배포는 signing/notarization/updater endpoint 자격증명이 없어 내부 readiness만 확인했다.
- 결론:
  - 이번 슬라이스의 기능/구조/검증 요구는 충족했다.

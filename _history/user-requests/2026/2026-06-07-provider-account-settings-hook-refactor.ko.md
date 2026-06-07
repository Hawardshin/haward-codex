# 2026-06-07 provider account settings hook refactor request

- 사용자 요청 요약: 전반적인 구조 리팩토링과 코드 분리를 계속 진행하고, 공통 로직을 일관된 동작으로 묶어 달라고 요청했다.
- 소유 프로젝트: `platform-desktop-app`
- 선택한 실행 슬라이스:
  - `MonitorShell.tsx` 안에 섞여 있던 provider 계정/모델 상태, 초기 로드, 저장/삭제/검증/모델 refresh 액션을 feature hook으로 분리한다.
  - provider 표시명과 panel feedback id 중복 정의를 `runtimeCatalog.ts` 기준으로 통합한다.
- 비범위:
  - 공개 배포용 signing/notarization 자격증명 설정.
  - 전체 `MonitorShell.tsx` 완전 분해.

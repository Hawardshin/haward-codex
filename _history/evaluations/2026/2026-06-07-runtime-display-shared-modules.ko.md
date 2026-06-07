# 작업 평가

- 날짜: 2026-06-07
- 평가 대상: `runtimeDisplay` 공통 유틸과 `MonitorSummaryWidgets` 분리.
- 기준:
  - 동작 계약 유지
  - `MonitorShell` 대형 파일 축소
  - 중복 표시 로직 제거
  - 테스트/readiness 계약 갱신
- 결과:
  - `MonitorShell.tsx` 줄 수가 13,407줄에서 12,995줄로 감소했다.
  - 터미널 드로어와 워크스페이스 탐색기의 `formatBytes`/`formatDuration`/active session 판정이 공통 파일로 모였다.
  - 새 구조 테스트가 공통 모듈 사용과 로컬 중복 제거를 확인한다.
- 검증:
  - 1차 TypeScript와 관련 테스트 통과.
  - `corepack pnpm run desktop:package:run:internal` 통과.
  - collect/check, workspace-monitor 전체 테스트, readiness, Rust 테스트/build, Tauri 내부 release build, codesign verify, DMG verify 통과.
- 잔여 리스크:
  - `DesktopRuntimePanel` 자체는 여전히 크다. 다음 슬라이스에서 상태 훅과 패널 하위 뷰 분리를 이어갈 수 있다.
  - 공개 배포용 signing/notarization/updater 입력값은 기존 경고 상태로 남아 있으며, 이번 내부 패키징 refactor 범위 밖이다.

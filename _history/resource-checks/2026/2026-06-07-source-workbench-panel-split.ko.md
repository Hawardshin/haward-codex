# 리소스 점검: 소스 워크벤치 패널 분리

- 리스크 분류: 런타임 리소스 변경 낮음, 패키징 검증 중 앱 프로세스/DMG 마운트 상태 확인 필요.
- 장기 실행 자원:
  - `desktop:package:run:internal` 실행 시 내부 앱 프로세스가 시작될 수 있음.
  - DMG 중간 마운트가 남지 않았는지 최종 확인한다.
- 검증 예정:
  - `hdiutil info`
  - `lsof -ti tcp:3217`
  - `pgrep -fl agent-workspace-platform-desktop`
- 패키징 결과:
  - `corepack pnpm run desktop:package:run:internal` 통과
  - `hdiutil verify` 통과
  - 내부 앱은 기존 인스턴스 재사용 모드로 열림

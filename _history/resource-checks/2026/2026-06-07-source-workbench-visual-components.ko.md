# 리소스 점검: 소스 워크벤치 하위 컴포넌트 분리

- 리스크: UI 파일 분리 자체는 런타임 리소스 리스크가 낮다.
- 패키징 검증 시 점검할 자원:
  - DMG 마운트 잔여 여부
  - `tcp:3217` 점유 여부
  - 내부 앱 프로세스 실행 여부
- 장기 실행 세션: 패키징 명령 완료 전에는 최종 응답하지 않는다.
- 패키징 결과:
  - `corepack pnpm run desktop:package:run:internal` 통과
  - `codesign --verify --deep --strict` 통과
  - `hdiutil verify` 통과
  - 내부 앱은 기존 인스턴스 재사용 모드로 열림

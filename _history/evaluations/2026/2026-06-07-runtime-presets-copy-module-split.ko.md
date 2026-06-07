# 작업 평가

- 날짜: 2026-06-07
- 평가 대상: 런타임 프리셋/문구 모듈 분리.
- 기준:
  - 동작 계약 유지
  - `MonitorShell` 대형 파일 축소
  - readiness/test 계약 갱신
- 결과:
  - `nativeWorkspaceCopy`는 `runtimeWorkspaceCopy.ts`로 이동했다.
  - 세션 모드, task-pipe 프리셋, task-pipe prompt key/prompt renderer, runtime init 기본값은 `runtimeSessionPresets.ts`로 이동했다.
  - 기존 호출부는 같은 이름의 import를 사용해 동작 표면을 유지한다.
- 검증:
  - 1차 TypeScript와 관련 테스트 통과.
  - `corepack pnpm run desktop:package:run:internal` 통과.
  - collect/check, workspace-monitor 전체 테스트, readiness, Rust 테스트/build, Tauri 내부 release build, codesign verify, DMG verify 통과.
- 잔여 리스크:
  - `DesktopRuntimePanel` 자체는 여전히 크다. 다음 단계에서 상태 훅 또는 런타임 하위 패널 분리를 이어가야 한다.
  - 공개 배포용 signing/notarization/updater 입력값은 기존 경고 상태로 남아 있으며, 이번 내부 패키징 refactor 범위 밖이다.

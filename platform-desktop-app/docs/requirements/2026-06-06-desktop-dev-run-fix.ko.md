# 2026-06-06 desktop dev/run fix 요구사항

## 배경

README 명령대로 desktop app을 실행하면 `tauri:dev`가 renderer 경로를 잘못 찾아 실패했고, 경로를 고친 뒤에도 updater plugin이 public updater config가 없는 dev/internal 실행을 막았다. 또한 README에는 빌드된 내부 앱을 여는 명령이 없었다.

## 요구사항

- REQ-DDR-001: `desktop:dev`는 repository root에서 실행 가능해야 하며 Workspace Monitor dev server와 Tauri shell을 정상 기동해야 한다.
- REQ-DDR-002: internal/dev config에서는 public updater 설정이 없다는 이유로 앱 시작이 실패하면 안 된다.
- REQ-DDR-003: public generated config에 `plugins.updater`가 있을 때는 updater plugin 등록 경로가 유지되어야 한다.
- REQ-DDR-004: README와 release runbook은 개발 실행, 내부 앱 실행, 패키징 후 실행 명령을 명확히 제공해야 한다.
- REQ-DDR-005: 구현 후 doctor, tests, Rust check, build/package, 실행 smoke를 수행한다.

## 수용 기준

- `corepack pnpm run desktop:dev`가 ENOENT와 updater panic 없이 앱을 시작한다.
- `corepack pnpm run desktop:run:internal -- --dry-run`이 내부 `.app` artifact를 찾는다.
- `desktop:package:internal`이 통과하고 `.app`/DMG가 생성된다.
- 실행 중 띄운 dev server/process는 close-out 전에 종료된다.

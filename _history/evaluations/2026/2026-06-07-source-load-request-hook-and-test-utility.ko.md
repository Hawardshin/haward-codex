# 2026-06-07 소스 로드 요청 훅 및 테스트 유틸 분리 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `true`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-source-load-request-hook-and-test-utility.ko.md`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-source-load-request-hook-and-test-utility.ko.md`

## 결과

- source load 요청 게이트가 source editor hook으로 분리되어 `MonitorShell.tsx`의 inline 비동기 순번 관리가 줄었다.
- 테스트용 TypeScript import shim이 공통 유틸로 이동해 helper 테스트 중복이 줄었다.
- 구조 계약 테스트와 readiness source map이 새 경계를 확인한다.
- 내부 앱 실행 스크립트의 기본 실행이 `open -n`에서 기존 인스턴스 재사용으로 바뀌어 반복 패키징 후 앱 프로세스가 누적되는 문제를 줄였다.

## 검증

- `node --test tests/source-editor-helper-behavior.test.mjs`: 통과, 3개.
- `node --test tests/source-editor-templates.test.mjs`: 통과, 9개.
- `node --test tests/tool-studio.test.mjs`: 통과, 54개.
- `node --test tests/readiness.test.mjs`: 통과, 15개.
- `node scripts/open-internal-app.mjs --dry-run`: `reuse_existing_instance` 확인.
- `node scripts/open-internal-app.mjs --dry-run --new-instance`: `new_instance` 확인.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 107개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.
- 최종 내부 앱 프로세스는 1개만 남았고, Agent Workspace Platform DMG mount와 3217 개발 서버는 남지 않았다.

## 릴리스 경계

- 내부 실행과 패키징은 통과했다.
- 공개 배포 준비는 Developer ID signing, notarization, updater signing/endpoint, clean-machine smoke가 남아 있어 아직 주장하지 않는다.

## 다음 후보

- source editor의 load/save handler를 `useSourceWorkbench` 또는 reducer로 추가 분리한다.
- source editor helper 테스트를 catalog, documents, drafts 단위로 더 세분화한다.

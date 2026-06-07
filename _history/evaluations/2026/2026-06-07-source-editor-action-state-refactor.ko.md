# 2026-06-07 소스 에디터 액션 상태 분리 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `true`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-source-editor-action-state-refactor.ko.md`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-source-editor-action-state-refactor.ko.md`

## 결과

- 이전 히스토리의 좁은 source load hook 분리에서 범위를 넓혀 source editor의 주요 액션 상태 전환까지 분리했다.
- `MonitorShell.tsx`의 직접 상태 계산을 줄이고 `sourceDraftActions.ts`에 순수 helper 경계를 만들었다.
- 테스트 importer를 확장해 helper 모듈의 상대 import 구조를 실제로 검증할 수 있게 했다.
- readiness source map과 구조 계약 테스트가 새 source editor 액션 helper 경계를 확인한다.

## 검증

- `node --test tests/source-editor-helper-behavior.test.mjs`: 통과, 4개.
- `node --test tests/source-editor-templates.test.mjs`: 통과, 10개.
- `node --test tests/tool-studio.test.mjs`: 통과, 54개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 109개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 통과, 8개.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.
- 내부 앱 실행은 `reuse_existing_instance` 모드로 열렸다.

## 릴리스 경계

- 내부 실행과 패키징은 통과했다.
- 공개 배포 준비는 Developer ID signing, notarization, updater signing/endpoint, clean-machine smoke가 남아 있어 아직 주장하지 않는다.

## 다음 후보

- source editor 전체 event handler를 hook 또는 reducer로 한 단계 더 분리한다.
- 저장 실패와 dirty draft close confirmation의 통합 행동 테스트를 보강한다.

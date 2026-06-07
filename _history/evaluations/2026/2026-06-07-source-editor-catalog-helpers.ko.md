# 2026-06-07 소스 에디터 catalog helper 분리 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `false`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-source-editor-catalog-helpers.ko.md`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-source-editor-catalog-helpers.ko.md`

## 결과

- source catalog 계산 기준을 `sourceCatalog.ts`로 모았다.
- `MonitorShell.tsx`는 source catalog 상태 wiring과 UI 렌더링에 집중하도록 한 단계 더 줄었다.
- native cache/runtime/snapshot label과 파일 필터 기준이 같은 helper를 거친다.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 102개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.

## 릴리스 경계

- 내부 실행과 패키징은 통과했다.
- 공개 배포 준비는 Developer ID signing, notarization, updater signing/endpoint, clean-machine smoke가 남아 있어 아직 주장하지 않는다.

## 다음 후보

- source workbench event handlers를 `useSourceWorkbench` 또는 reducer로 분리한다.
- source catalog helper의 직접 입력/출력 단위 테스트를 추가한다.

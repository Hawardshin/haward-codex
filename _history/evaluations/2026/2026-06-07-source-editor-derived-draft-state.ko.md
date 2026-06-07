# 2026-06-07 소스 에디터 draft 파생 상태 분리 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `false`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-source-editor-derived-draft-state.ko.md`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-source-editor-derived-draft-state.ko.md`

## 결과

- source draft 파생 계산 기준을 `sourceDrafts.ts`로 모았다.
- `MonitorShell.tsx`에는 React wiring과 UI rendering 역할만 남기는 방향으로 한 단계 더 줄였다.
- dirty 판단 기준이 save-all, tab badge, toolbar disabled state에서 같은 helper를 거친다.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 101개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.

## 릴리스 경계

- 내부 실행과 패키징은 통과했다.
- 공개 배포 준비는 Developer ID signing, notarization, updater signing/endpoint, clean-machine smoke가 남아 있어 아직 주장하지 않는다.

## 다음 후보

- source workbench event handlers를 `useSourceWorkbench` 또는 reducer로 분리한다.
- source draft helper를 직접 실행하는 TypeScript-aware test harness를 추가한다.

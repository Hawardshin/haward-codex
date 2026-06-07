# 2026-06-07 소스 에디터 draft 상태 helper 분리 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `false`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-source-editor-draft-state-helpers.ko.md`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-source-editor-draft-state-helpers.ko.md`

## 결과

- `MonitorShell.tsx`에서 source draft 객체 생성과 저장 반영 중복을 제거했다.
- source workbench draft 상태 규칙을 `source-editor/sourceDrafts.ts`가 소유하게 했다.
- 기존 save-time mutation 보호 계약을 새 helper 구조에 맞춰 유지했다.

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

- source workbench의 state/action 묶음을 `useSourceWorkbench` 또는 reducer로 분리한다.
- source draft helper에 직접 입력/출력 단위 테스트를 추가한다.

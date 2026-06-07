# 2026-06-07 소스 에디터 순수 로직 분리 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `false`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-source-editor-pure-logic-extraction.ko.md`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-source-editor-pure-logic-extraction.ko.md`

## 결과

- `MonitorShell.tsx`에서 소스 diff 계산과 Monaco language mapping 구현을 제거했다.
- `source-editor` 모듈이 소스 편집기 정적 설정과 순수 계산 로직을 소유한다.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 100개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.

## 다음 후보

- source workbench의 state/action 묶음을 `useSourceWorkbench` 계열 hook으로 분리한다.
- 저장/로드/닫기/전체 저장 동시성 테스트를 먼저 더 고정한다.

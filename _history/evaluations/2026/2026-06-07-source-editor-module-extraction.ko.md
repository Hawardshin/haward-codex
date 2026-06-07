# 2026-06-07 소스 에디터 모듈 분리 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `false`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-source-editor-module-extraction.ko.md`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-source-editor-module-extraction.ko.md`

## 결과

- `MonitorShell`이 소스 에디터 템플릿/Monaco 정적 설정을 직접 소유하지 않도록 분리했다.
- 새 모듈 구조를 테스트로 고정했다.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 98개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.

## 잔여 위험

- `MonitorShell.tsx`는 여전히 크다. 다음 슬라이스는 `DesktopRuntimePanel` 내부의 소스 workbench 상태/액션 묶음을 hook 또는 별도 panel 모듈로 분리하는 것이 적절하다.
- public 배포 준비는 서명, notarization, updater 키/엔드포인트, clean-machine smoke가 남아 있다.

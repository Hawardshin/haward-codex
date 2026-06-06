# Request Trace: Clear Tab Discrimination

## 요청

탭 변별이 명확한지 확인하고 개선한다.

## 산출물

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-clear-tab-discrimination.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-clear-tab-discrimination/`
- 구현: `MonitorShell.tsx`, `globals.css`
- 테스트: `workspace-monitor/tests/tool-studio.test.mjs`

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- Browser computed-style check: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.

## 결과 상태

- 구현과 내부 패키지 빌드 완료.
- commit/push 대기.

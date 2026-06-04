# Request Trace: UI Color System

## 요청

- ID: `UR-2026-06-05-ui-color-system`
- 요약: UI 색상을 좋은 디자인 레퍼런스와 이론을 참고해 개선한다.

## 근거

- Web-first intake: `_history/web-searches/2026/2026-06-05-ui-color-system.ko.md`
- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md` `REQ-WM-014`, `REQ-WM-035`, `REQ-WM-036`, `REQ-WM-040`
- 관련 spec: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-responsive-workflow-layout/`

## 구현

- `globals.css`
  - light/dark theme 색상을 role-based token으로 재정리했다.
  - `--text-secondary`, `--text-tertiary`, `--line-strong`, `--accent-primary-*`, `--status-*`, `--control-*`, `--action-primary-*`, `--terminal-*` token을 추가했다.
  - primary action은 blue/action token으로 통일하고, green은 success/status 의미로 남겼다.
  - dark theme의 muted/secondary text를 낮은 대비 회색 대신 밝은 foreground 계층으로 조정했다.
  - terminal/source/code preview 색상을 terminal token으로 묶었다.
- `tests/color-tokens.test.mjs`
  - light/dark 주요 text/surface/status/action/terminal 조합의 WCAG식 contrast ratio를 검사한다.

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 22 tests.
- `corepack pnpm --filter workspace-monitor check`: 통과.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 332555 bytes.
- `corepack pnpm --filter platform-desktop-app run check`: 통과, public release 관련 기존 warning만 유지.
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: 통과.
- `git diff --check`: 통과.
- Browser plugin: localhost dev 화면 접근을 시도했으나 dev hydration이 진행되지 않아 loading SSR 상태만 확인했다.
- Playwright static export smoke: `.desktop-app-shell` 렌더, light/dark computed token 확인, pageErrors 없음.

## 결과

- 색상 적용 기준이 개별 hex 값이 아니라 역할 token으로 이동했다.
- 주 행동, 선택 상태, 성공/경고/위험/info 상태, terminal surface가 서로 다른 의미 색으로 분리됐다.
- dark surface는 밝은 foreground 계층을 사용해 읽기 쉬운 계층을 유지한다.

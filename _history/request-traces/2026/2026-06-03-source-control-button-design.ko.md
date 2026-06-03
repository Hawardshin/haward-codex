# Request Trace: Source Control Button Design

## Request

- ID: `UR-2026-06-03-062`
- Summary: 편집 파일을 누를 때 나오는 버튼이 너무 기본 버튼처럼 보이고 디자인적으로 아쉽다는 요청.

## Outcome

- Source 파일 열기/저장/복사 controls를 제품형 action bar button으로 재스타일링했다.
- Undo, Find, Diff, Fold 같은 편집 명령을 compact command toolbar button으로 재스타일링했다.
- Source file browser row, draft row, editor tab button에 선택/hover/focus 상태를 추가했다.
- 1080px 이하 compact desktop에서 Source Explorer/editor를 stacked layout으로 전환해 버튼 clipping을 막았다.
- Source control design regression script를 추가하고 `workspace-monitor` 기본 `check`에 연결했다.

## Validation

- `corepack pnpm --filter workspace-monitor run check`: pass
- `corepack pnpm --filter workspace-monitor run check:source-control-design`: pass
- `corepack pnpm --filter workspace-monitor run test`: pass
- `corepack pnpm --filter workspace-monitor run build:customer`: pass
- `corepack pnpm --filter workspace-monitor run perf:budget`: pass
- `corepack pnpm --filter platform-desktop-app test`: pass
- `corepack pnpm --filter platform-desktop-app run check`: pass
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: pass
- Browser Source smoke desktop/compact/mobile: pass
- In-app Browser Source static preview: pass

## Artifacts

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-source-control-design.mjs`
- `platform-desktop-app/renderer/workspace-monitor/package.json`
- `platform-desktop-app/specs/2026-06-03-responsive-button-design/`
- `_history/evaluations/2026/2026-06-03-source-control-button-design.ko.md`

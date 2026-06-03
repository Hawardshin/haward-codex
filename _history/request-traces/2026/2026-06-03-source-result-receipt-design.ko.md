# Request Trace: Source Result Receipt Design

## Request

- ID: `UR-2026-06-03-063`
- Summary: 수정된 결과 같은 것도 예쁘지 않다는 요청.

## Outcome

- Source 편집 화면의 저장 완료 메시지를 inline save receipt로 바꿨다.
- `저장 결과` 탭을 result hero, summary strip, save result card로 재구성했다.
- 개별 result card가 상태 lozenge, 파일 경로, 저장 용량, 백업 생성 상태, 백업 경로를 분리해서 보여주게 했다.
- result summary가 compact/mobile에서 접히도록 responsive CSS에 포함했다.
- `check-source-control-design.mjs`가 Source result receipt design token까지 검사한다.

## Validation

- `corepack pnpm --filter workspace-monitor run check:source-control-design`: pass
- `corepack pnpm --filter workspace-monitor run check`: pass
- `corepack pnpm --filter workspace-monitor run test`: pass
- `corepack pnpm --filter workspace-monitor run build:customer`: pass
- `corepack pnpm --filter workspace-monitor run perf:budget`: pass
- `corepack pnpm --filter platform-desktop-app test`: pass
- `corepack pnpm --filter platform-desktop-app run check`: pass
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: pass
- `git diff --check`: pass
- In-app Browser Source results static preview: pass

## Artifacts

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-source-control-design.mjs`
- `platform-desktop-app/specs/2026-06-03-responsive-button-design/`
- `_history/evaluations/2026/2026-06-03-source-result-receipt-design.ko.md`

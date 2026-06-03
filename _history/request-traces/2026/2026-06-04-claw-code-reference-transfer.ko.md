# Request Trace: Claw Code Reference Transfer

## Request

- `UR-2026-06-04-002`

## 요구 및 해석

- `Hawardshin/claw-code`를 참고해 현재 데스크톱 플랫폼에 차용 가능한 구조와 기능을 넣는다.
- 소스 clone은 disabled 상태로 실패했으므로, 공개 README/CLAW/PARITY 문서에서 확인되는 패턴만 clean-room 방식으로 전이한다.

## Implementation Targets

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `platform-desktop-app/configs/reference-platform-advantage-registry.json`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.ko.md`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.en.md`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-user-flow.ko.md`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-user-flow.en.md`
- `platform-desktop-app/docs/architecture/multi-cli-orchestration-runtime.ko.md`
- `platform-desktop-app/docs/architecture/multi-cli-orchestration-runtime.en.md`
- `platform-desktop-app/docs/architecture/installer-shell-runtime-contract.ko.md`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/spec.ko.md`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/spec.en.md`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## Outcome

- `claw-code-cli`가 optional supported AI CLI adapter 후보가 됐다.
- Tauri runtime fallback adapter 목록에 Claw Code가 추가됐다.
- 플랫폼 개선 task pipe에 `orchestration_lane`이 추가되어 slash command, team lane, skill, hook, plugin, parity-gap 승격 관점이 merge 전에 검토된다.
- Workspace Monitor fallback UI와 setup guide가 Claw Code를 표시한다.
- reference advantage registry가 Claw식 command/team orchestration과 manifest/parity-gap audit 패턴을 추적한다.
- user-flow, desktop distribution, architecture, requirement, spec, readiness가 같은 adapter 목록을 가리킨다.

## Validation Targets

- JSON parse and config contract checks
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor run test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`
- `git diff --check`

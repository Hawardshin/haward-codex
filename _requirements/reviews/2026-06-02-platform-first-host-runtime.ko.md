# Platform-First Host Runtime Requirement Review

## Review Result

- 상태: accepted
- 이유: 기존 CLI-neutral 방향을 더 명확한 platform-first host runtime 계약으로 강화한다. 이는 `PDA-REQ-013`부터 이어진 optional CLI adapter 방향과 충돌하지 않고, 오히려 제품 runtime ownership을 명확히 한다.

## Checks

- 플랫폼은 외부 CLI 없이도 열리고 workspace/history/docs/dashboard를 보여야 한다.
- 외부 CLI는 guest adapter lane으로만 실행되어야 한다.
- task state, durable memory, decision inbox, artifact, validation, UI authority는 플랫폼이 소유해야 한다.
- public installer readiness는 여전히 signing/notarization/smoke/privacy/dependency gates 이후에만 주장한다.

## Validation Targets

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/tests/readiness.test.mjs`

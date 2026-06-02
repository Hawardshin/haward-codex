# Platform-First Host Runtime Request Trace

- 요청 ID: `UR-2026-06-02-058`
- 요청 요약: 현재 작업공간/제품을 Codex나 다른 상용 에이전트 도구 위에서 동작시키지 않고, 플랫폼을 먼저 실행한 뒤 외부 AI CLI를 그 위에 올리는 구조로 전환해 달라고 했다.
- 작업 모드: `governance`

## Outcome

- persistent instructions, AGENTS entrypoint, platform identity를 platform-first host runtime으로 갱신했다.
- CLI adapter registry에 `platform_is_primary_host_runtime`, `host_runtime_model`, `guest_adapter_on_platform` 계약을 추가했다.
- desktop/user-flow registry, architecture docs, product boundary, packaging docs, requirements/specs/readiness test를 갱신했다.
- Workspace Monitor Desktop 탭에 `Platform-first host`, `Guest adapters`, `Platform state owner`를 표시했다.

## Artifacts

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/tests/readiness.test.mjs`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/operating-models/platform-identity-operating-model.ko.md`

## Validation

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `check-config-contract` for CLI adapter, desktop registry, user-flow registry, assistant runtime registry, and memory bootstrap manifest
- Built-output HTTP/string validation was completed; desktop/mobile screenshot validation is deferred because browser automation dependencies were unavailable and Computer Use permissions remained pending.

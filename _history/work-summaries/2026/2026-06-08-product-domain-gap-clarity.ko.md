# 작업 요약: product domain gap clarity

- `product-domain-ownership-registry.json`를 추가해 Git workspace intake, guest AI run, current work timeline, reports/requirements, source/Git review, advanced agent/tool operations, settings/recovery 영역을 분리했다.
- 각 영역에 owner product, primary section, primary function, core functions, excluded functions, surface contract, acceptance gates를 넣었다.
- open planning gap 7개를 `planningGapAudit`로 collector/snapshot에 싣고, P0 gap 4개를 Product Structure 화면에서 보이게 했다.
- `DomainOwnershipBoard`를 별도 컴포넌트로 만들어 기존 ProductFeatureArchitecturePanel이 500줄을 넘지 않게 유지했다.
- readiness tests, collector tests, generated snapshots, CSS, source map, customer build를 갱신했다.

## 남은 후속 후보

- `workspace_import_real_actions`: open/clone/create Git workspace를 실제 desktop flow로 완성한다.
- `agent_tool_peer_app_scaffold`: `agent-tool-desktop-app` peer app scaffold를 실제 repo/submodule로 만든다.
- `terminal_adapter_first_run_recovery`: Codex CLI/PT Y/adapter mismatch를 첫 실행 진단 UI로 분리한다.
- `monitor_shell_domain_boundary`: `MonitorShell.tsx`를 terminal, workspace intake, timeline, recovery coordinator로 계속 분해한다.


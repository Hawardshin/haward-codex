# Claude Code Public Design Transfer Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PDA-031 | Claude Code-related platform improvements shall be grounded only in public official or otherwise verifiable sources, not leaked or non-public material. | must | Check registry `source_boundary.policy` and the web-search record |
| REQ-PDA-032 | Each borrowed Claude Code design pattern shall include a transfer principle, platform mapping, implementation target, and risk controls. | must | Check `claude-code-design-transfer-registry.json` `transfer_patterns` |
| REQ-PDA-033 | Workspace Monitor shall expose public design-transfer status and pattern count in the snapshot and Overview UI. | must | Collector test, `corepack pnpm --filter workspace-monitor run build` |
| REQ-PDA-034 | Claude Code CLI shall remain an optional guest adapter, not the platform host runtime. | must | Check README, registry, and readiness check |
| REQ-PDA-035 | Next candidates shall remain small risk-controlled units such as plan gates, permission summaries, hook registry, and worktree-aware parallel lane warnings. | should | Architecture doc, spec tasks, omission check |

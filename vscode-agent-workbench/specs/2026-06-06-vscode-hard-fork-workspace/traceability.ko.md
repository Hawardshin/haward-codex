# 추적성

날짜: 2026-06-06

| 요구사항 | 구현 | 검증 | 기록 |
| --- | --- | --- | --- |
| REQ-VSC-001 | `vscode-agent-workbench/source` clone | `git -C source log -1` | `configs/source-baseline.json` |
| REQ-VSC-002 | source commit `c7df3053` | source pre-commit hygiene | patch file |
| REQ-VSC-003 | `extensions/agent-workspace` | `compile-extensions` | spec/tasks |
| REQ-VSC-004 | `product.json` 변경 | `verify-source-state.mjs` product checks | source-baseline |
| REQ-VSC-005 | `.gitignore` source ignore | outer `git status` | hard-fork-boundary doc |
| REQ-VSC-006 | compile/client/CLI/app smoke | validation doc | work summary |
| REQ-VSC-007 | installation/resource records | installation registry check | installation/resource/evaluation records |

## Source provenance

- Upstream: `microsoft/vscode`
- Upstream commit: `6a4e80f425c2eb9d4c528862efeed9f4743692e8`
- Local source commit: `c7df3053c6da59dae9af42d5474a0d45dd3dc594`
- Replay patch: `vscode-agent-workbench/patches/0001-agent-workspace-hard-fork-foundation.patch`

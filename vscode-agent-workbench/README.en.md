# Agent Workspace Code Hard-Fork Workbench

This project is the local hard-fork workbench for turning `microsoft/vscode` into an Agent Workspace-first editor. The full upstream clone is kept in `source/` and ignored by the outer repository; durable tracking happens through source commits and replayable patches under `patches/`.

## Baseline

- Upstream repository: https://github.com/microsoft/vscode
- Upstream commit: `6a4e80f425c2eb9d4c528862efeed9f4743692e8`
- Local source branch: `awp/hard-fork-workspace-foundation`
- Local source commit: `c7df3053c6da59dae9af42d5474a0d45dd3dc594`
- Tracked patch: `patches/0001-agent-workspace-hard-fork-foundation.patch`
- Node runtime: `24.15.0`

## First Slice

The first implemented slice renames the Code - OSS product identity to `Agent Workspace Code`, adds an `extensions/agent-workspace/` built-in extension, and contributes an Activity Bar workspace timeline view that can point back to the Agent Workspace platform root.

## Verify

```bash
cd /Users/shinjoungeun/Desktop/Obsidian/brain/codex
node vscode-agent-workbench/scripts/verify-source-state.mjs
```

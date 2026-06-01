# Workspace Health Tool

## Purpose

Run the repository's baseline health checks from one entry point. This avoids having to remember every audit and project test command when checking whether the workspace structure is still healthy.

## Command

Run from the repository root:

```bash
python3 _tools/workspace-health/src/workspace_health.py
```

List checks without running them:

```bash
python3 _tools/workspace-health/src/workspace_health.py --list
```

Run selected categories:

```bash
python3 _tools/workspace-health/src/workspace_health.py --category governance
python3 _tools/workspace-health/src/workspace_health.py --category projects --category tools
```

Machine-readable JSON for automation or dashboards:

```bash
python3 _tools/workspace-health/src/workspace_health.py --json
python3 _tools/workspace-health/src/workspace_health.py --list --json
```

Include the Next.js static build:

```bash
python3 _tools/workspace-health/src/workspace_health.py --include-build
```

## Check Categories

- `governance`: docs/structure audits, map/board freshness, memory/config contracts
- `projects`: `agent-platform` and `presentation-agent` tests
- `tools`: `_tools/*/tests`
- `frontend`: `workspace-monitor` tests, typecheck, and optional build

## Inputs

- `_docs/registry.json`
- `_ops/projects/root-structure-policy.json`
- `_ops/projects/registry.json`
- `_ops/coordination/status.json`
- `agent-platform/configs/**`
- Project and tool test directories

## Outputs

- Pass/fail summary per check on standard output
- Check list from `--list`
- Machine-readable summary from `--json`
- Failed command, stdout, and stderr when a check fails

## Verification

```bash
python3 -m unittest discover -s _tools/workspace-health/tests
python3 _tools/workspace-health/src/workspace_health.py --list
python3 _tools/workspace-health/src/workspace_health.py --category governance --json
```

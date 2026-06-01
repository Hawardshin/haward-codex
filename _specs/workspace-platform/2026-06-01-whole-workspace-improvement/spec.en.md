# Spec: Whole Workspace Navigation/Health Improvement

## Goal

Make root folder roles and provenance easier to inspect, and provide one command for core audits and tests.

## Requirement

- `REQ-WS-032`

## Scope

- `_tools/workspace-index/`
- `_tools/workspace-health/`
- `_ops/maps/repository-map.md`
- `_tools/README.md`

## Behavior

- The repository map shows `Class`, `Purpose`, and `Source` for each root folder.
- Root folder metadata is read first from `_ops/projects/root-structure-policy.json` and `_ops/projects/registry.json`.
- The workspace health command runs docs audit, structure audit, map/board freshness checks, memory bootstrap, config contract, project tests, tool tests, and workspace-monitor checks.
- `--include-build` also runs the workspace-monitor static build.

## Out Of Scope

- Moving root folders
- Large project restructuring
- CI configuration

# Web Search Record: Whole Workspace Improvement

## Search Information

- Date: 2026-06-01
- Related request: `UR-2026-06-01-016`
- Work mode: `governance`
- Purpose: Check external support for improving repository-wide structure, navigation, decision records, and health checks.

## Queries

- `monorepo documentation structure best practices navigation governance`
- `software architecture documentation decision records repository structure best practices`
- `Diataxis documentation framework reference explanation how-to tutorial documentation structure`
- `repository health checklist documentation tests CI governance best practices`

## Sources Checked

| Source | Type | Checked Point | Application |
| --- | --- | --- | --- |
| https://diataxis.fr/ | documentation framework | Separating documentation by user need improves navigation clarity | Separate navigation and verification improvements instead of restructuring everything at once |
| https://docs.cloud.google.com/architecture/architecture-decision-records | official docs | ADRs can preserve timestamped decisions in source control | Keep requirements, plan, traceability, and evaluation records |
| https://learn.microsoft.com/en-ie/azure/well-architected/architect-role/architecture-decision-record | official docs | Decisions should stand alone and link supplemental material | Link requirement/spec/evaluation artifacts |
| https://mitlibraries.github.io/guides/misc/adr.html | institutional guide | Important technical decisions should be recorded in repository docs and connected to requirements/assumptions | Connect navigation work to spec and traceability |
| https://nix.dev/contributing/documentation/diataxis | project docs | Reference docs should support scanning and random access | Add root folder class/source columns to `repository-map.md` |

## Weak Sources Ignored

- Generic repository checklist blog posts were used only for context.
- Reddit discussion was treated only as broad signal; direct implementation relied on official/institutional sources and repository source-of-truth files.

## Plan Impact

- Do not rewrite everything at once; first improve the ability to see and verify the whole workspace.
- `workspace-index` reads `_ops/projects/root-structure-policy.json` and `_ops/projects/registry.json` to show root folder class, purpose, and source.
- The new `workspace-health` tool bundles docs audit, structure audit, map freshness, board freshness, memory/config checks, project tests, tool tests, and optional build.

## Uncertainty

- Whole-workspace improvement is ongoing; this change is limited to navigation and health foundations.
- Larger restructuring should be separated into future requirements after repeated friction appears in actual use.

## Public Decision Summary

The first whole-workspace improvement should be source-of-truth repository maps plus a single workspace health command.

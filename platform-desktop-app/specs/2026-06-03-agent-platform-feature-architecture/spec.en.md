# Agent Platform Feature Architecture Spec

## Goal

- Lock the installable desktop app identity as an agent capability platform, not a monitoring dashboard.
- Reframe the current shell, source review, runtime data, decision inbox, history, requirements, and monitoring pieces as named product feature layers.
- Preserve product feature architecture in customer snapshots while stripping internal source paths and validation internals.
- Keep default navigation focused on work, creation, development, and learning while moving operator, monitoring, document, and governance surfaces into Operator Center.

## Feature Layers

| ID | Role | Summary |
| --- | --- | --- |
| `agent_orchestration` | primary | Task pipe, process graph, lanes, decision inbox, and merge gates |
| `agent_work_environment` | primary | App-selected workspace, runtime data, task-run store, support bundle, and accumulated data |
| `agent_development_environment` | primary | Source review, multi-file editor, diff, templates, requirements/spec/validation workbench |
| `agent_factory` | primary | Promotion from repeated work into prompts, workflows, templates, tools, skills, agents, and features |
| `learning_improvement_loop` | primary | Intent map, history, timings, evaluations, and evidence as an improvement loop |
| `observability_monitoring` | supporting | Structure, documents, history, source inventory, and readiness as support observability |

## Requirements

- `platform-desktop-app/configs/product-feature-registry.json` is the primary/supporting feature source of truth.
- Workspace snapshots include `productFeatureArchitecture`.
- The Overview home screen shows feature architecture before monitoring details.
- User view and customer snapshots use `overview`, `desktop`, `agents`, `source`, and `intent` as the default work sections.
- `projects`, `history`, `structure`, `documents`, and `requirements` open from Operator Center instead of the primary work navigation.
- Readiness checks fail if monitoring becomes the primary product again.

## Out Of Scope

- Installing a new agent runtime framework.
- Public signing/notarization.
- Renaming the `renderer/workspace-monitor` package.

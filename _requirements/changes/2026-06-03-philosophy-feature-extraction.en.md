# Requirement Change: Philosophy Feature Extraction Structure

## Request

- The user's philosophy is not sufficiently reflected in the platform; the platform needs a structure that derives and builds features from philosophy principles.

## Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PHIL-FEAT-001 | The platform must use `_philosophy/` principles as feature-candidate inputs. | must | `check-philosophy-features` connects every required principle to a feature flow. |
| REQ-PHIL-FEAT-002 | Feature candidates must include source principle ids, human process step, smallest asset type, evidence, risk, validation, and rollback. | must | The philosophy feature registry checker and unittest fail missing fields. |
| REQ-PHIL-FEAT-003 | Philosophy feature work must prefer the smallest useful asset among prompt, workflow, template, tool, skill, agent, and project feature. | must | Registry contract and candidate records include smallest asset type. |
| REQ-PHIL-FEAT-004 | Prompt router, memory bootstrap, and philosophy traceability must expose this structure to future sessions. | must | `check-memory-bootstrap` and `check-philosophy-trace` pass. |
| REQ-PHIL-FEAT-005 | The operations UI should show philosophy-derived feature flows and candidate status. | should | Workspace Monitor snapshot/type/test/build pass and the Overview panel token is visible. |

## Scope

- Included: `agent-platform/` registry, CLI checker, tests, agent spec, docs, `_ops` prompt/workflow, memory/trace links, `workspace-monitor` overview panel.
- Excluded: implementation of queued candidates, high-risk automatic execution, exposing internal philosophy candidates in customer bundles.

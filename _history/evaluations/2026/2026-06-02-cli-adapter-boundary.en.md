# Work Evaluation: CLI Adapter Boundary

## Initial Instruction

The platform should be installable, able to use many CLIs, and not dependent on any one CLI; it should operate by using those CLIs through a layer above them.

## Result

- Added `REQ-WS-053` for the installable platform's CLI-neutral principle.
- Added `agent-platform/configs/integrations/cli-adapter-registry.json` to define external CLIs as optional adapter capabilities.
- Added `_docs/policies/cli-adapter-policy.en.md`, `_ops/workflows/66-cli-adapter-integration.md`, and `_ops/prompts/97-cli-adapter-integration.md`.
- Reflected the boundary in desktop productization docs and settings: the app is not a single CLI wrapper; it uses CLIs through an adapter layer.
- Connected the rule to persistent instructions, memory bootstrap, operations index, router, history, request trace, work summary, timing record, and monitor snapshot.

## Evidence And Verification

- Web search record: `_history/web-searches/2026/2026-06-02-cli-adapter-boundary.en.md`
- Research note: `_research/topics/runtime-language/2026-06-02-cli-adapter-boundary.en.md`
- Grounding input: `_history/evaluations/2026/2026-06-02-cli-adapter-boundary-grounding.json`
- Evaluator input: `_history/evaluations/2026/2026-06-02-cli-adapter-boundary-evaluation-input.json`
- Grounding result: `ready_to_publish`, `requires_rework=false`
- Evaluator result: `ready_to_close`, `requires_rework=false`

## Checks Run

- JSON format checks passed.
- Self-documenting config contract checks passed.
- Memory bootstrap check passed.
- Docs, naming, and structure audits passed. Existing generated-folder warnings remain in `presentation-agent`, but they are non-blocking.
- Workspace index, task board, and workspace-monitor snapshot regeneration/checks passed.
- Work timing check and `git diff --check` passed.

## Remaining Improvement Candidates

- When a concrete CLI adapter is implemented, add smoke tests for availability, version, permission, timeout, output shape, and missing-CLI fallback.
- When real adapters exist, expose adapter availability and `capability_missing` state in workspace-monitor.

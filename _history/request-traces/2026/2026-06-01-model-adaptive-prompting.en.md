# Request Trace: Model-Adaptive Prompting

## Request

- Request ID: `UR-2026-06-01-033`
- Summary: Reflect the user's rule that strong and weak models require different usage strategies, and weaker non-reasoning models can benefit from two sequential attempts.
- Work mode: `governance`

## Requirement

- `REQ-WS-044`

## Result

- Added `model_capability_profiles` and `model_adaptive_prompting_policy` to `ai-usage-gap-profile.json`.
- Added model-adaptive strategy to the operating model docs.
- Updated the bridge workflow and prompt to classify model capability and conditionally apply two-pass strategy.
- Connected the rule to persistent instructions, AGENTS, memory bootstrap, operations index, and prompt router.

## Artifacts

- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_docs/operating-models/ai-usage-gap-operating-model.en.md`
- `_docs/instructions/persistent-instructions.en.md`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_requirements/changes/2026-06-01-model-adaptive-prompting.en.md`
- `_requirements/reviews/2026-06-01-model-adaptive-prompting.en.md`
- `_specs/workspace-platform/2026-06-01-model-adaptive-prompting/`
- `_research/topics/agent-planning/2026-06-01-model-adaptive-prompting.en.md`
- `_history/web-searches/2026/2026-06-01-model-adaptive-prompting.en.md`

## Verification

- Planned checks: JSON syntax, config contract, memory bootstrap, docs/naming/structure audit, workspace index/task board, workspace health, grounding, work evaluation, timing check, and `git diff --check`.

## Commit

- `dbbe34f` pushed: `docs(platform): add model-adaptive prompting policy`

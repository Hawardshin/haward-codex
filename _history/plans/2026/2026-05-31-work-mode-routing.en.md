# 2026-05-31 Work Mode Routing Plan Record

## Selected Work Mode

- `governance`
- Reason: this changes repository-wide evaluator behavior, start/close/evaluate workflows, memory bootstrap, and persistent rules.

## Evidence Checked

- Web search: `_history/web-searches/2026/2026-05-31-work-mode-routing.en.md`
- Internal overlap audit: `_research/overlap-audits/2026-05-31-source-discovery-overlap.en.md`
- Current full-loop pressure points: `agent-platform/src/agent_platform/evaluation/work_evaluator.py`, `_ops/workflows/00-start-here.md`, `_ops/prompts/60-close-work.md`, `_ops/prompts/70-evaluate-work.md`

## Decisions

- Do not remove the full loop; gate blocking targets by mode.
- Keep `standard` as the default.
- Use `governance` for durable rule, platform, and evaluator changes.
- Let `quick`, `ship_first`, and `research` require only the relevant evidence.
- Record deferred improvements in `_ops/backlog/deferred-improvements.en.md`.

## Execution Order

1. Add `work_mode`, `deferred_improvement_targets`, and mode-specific target policy to the evaluator.
2. Add quick, ship-first, research, and unknown-mode tests.
3. Add `work-mode-registry.json` as a self-documenting settings file.
4. Update start, close, and evaluation prompts plus workflows.
5. Update requirements, specs, history, research, and evaluation docs.
6. Verify, commit, and push.

## Remaining Improvement

- After real usage, tune mode criteria through `DI-2026-05-31-001`.

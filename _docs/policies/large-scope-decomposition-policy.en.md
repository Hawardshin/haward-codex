# Large Scope Decomposition Policy

Large work should not be solved by pushing more raw context into the agent. If the scope is too broad or the file set is too large, first shrink it, split it, and turn it into verifiable units.

## Policy

- Requests such as review everything, improve all structure, too many files, or too broad should use `large-scope-decomposer-agent` first.
- Create a candidate file inventory and exclusion rules before opening many files.
- Bulk derived files, generated output, build/dist folders, and vendor folders are excluded by default and sampled only when directly relevant.
- Representative samples guide understanding; they do not prove full coverage.
- Each slice needs `touch_paths`, dependencies, outputs, and verification steps.
- Parallel work planning happens only after slices exist.
- When context grows, leave summaries and context archives.
- Close-out must include omission prevention, grounding, and evaluation.

## Related Files

- `agent-platform/configs/planning/large-scope-decomposition-profile.json`
- `agent-platform/configs/agents/large-scope-decomposer-agent.json`
- `_ops/workflows/76-large-scope-decomposition.md`
- `_ops/prompts/106-large-scope-decomposition.md`

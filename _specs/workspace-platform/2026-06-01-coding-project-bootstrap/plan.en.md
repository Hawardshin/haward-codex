# Plan: Coding Project Bootstrap

1. Use web search to check project scaffolding and generator structures.
2. Add requirement `REQ-WS-038` to the baseline plus change/review records.
3. Create `_tools/coding-project-bootstrap/` with blueprint config, Python CLI, README, and tests.
4. Add the workflow and prompt, then connect them from the prompt router, operations index, and memory bootstrap.
5. Refresh workspace index, task board, and Workspace Monitor snapshots.
6. Run unit tests, config/memory checks, workspace-health, grounding, and evaluation.
7. Commit and push to `origin/main`.

## Decisions

- Use minimal local blueprints instead of running external generators directly.
- Require `--apply` even for `create` to reduce accidental project sprawl.
- Keep dependency installation separate through the existing installation audit flow.

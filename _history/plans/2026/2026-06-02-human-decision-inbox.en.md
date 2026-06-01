# Plan Record: Human Decision Inbox

## Goal

Create an operating structure that collects human-needed decisions in one place, keeps safe work moving while waiting, and checkpoints current work before interrupting/resuming affected work when the answer arrives.

## Plan

1. Check web sources for HITL, workflow human tasks, blocked dependencies, and interrupt/resume.
2. Add `REQ-WS-048` to the requirements baseline.
3. Create the central inbox JSON and companion docs.
4. Add workflow/prompt so future agents follow the same process.
5. Connect the AI usage gap profile, notification config, persistent instructions, `AGENTS.md`, memory bootstrap, router, and index.
6. Save history, research, trace, work summary, evaluation, and timing records.
7. Update coordination board and workspace maps.
8. Verify, commit, and push.

## Decisions

- Put this in shared `_ops/coordination`, not a separate project.
- Do not build a standalone runtime scheduler in this scope; create the source-of-truth config and workflow/prompt contract first.
- Separate immediate interrupt from next-safe-point resume.

## Related Artifacts

- `_ops/coordination/human-decision-inbox.json`
- `_ops/workflows/61-human-decision-inbox.md`
- `_ops/prompts/91-human-decision-inbox.md`
- `_specs/workspace-platform/2026-06-02-human-decision-inbox/`

# Persistent Instructions

This document records durable user instructions in English.

## Active Instructions

- Manage this repository as a monorepo for a personal agent-building platform.
- Keep separate projects as root-level `kebab-case` folders.
- Commit every completed meaningful change set.
- Push completed commits to `origin/main` immediately unless explicitly told not to push.
- Before closing meaningful work, evaluate the result against the initial user instruction and rework real gaps.
- Before evaluation, summarize completed work and check prior internal work or strong references for related tasks.
- Track work history under `_history/YYYY/YYYY-MM-DD.md`.
- Use `_ops/` as the durable operations hub for prompts, workflows, and maps.
- Compress long conversation context into repository docs and history logs.
- Promote repeated workflows into templates, tools, skills, prompts, or workflows when useful.
- Keep repository and prompt maps current when navigational structure changes.
- Use `work-evaluator-agent` as the default close-out evaluator.
- Prefer Python for agent implementations, orchestration, backend automation, evaluation, and reusable local tools.
- Use mature, maintained, license-compatible open-source tools and libraries when they fit the task.
- Consider HTML artifacts when browser rendering, visual hierarchy, dashboards, or interactive review are useful.
- Use Korean for user-facing docs and history by default.
- Use English for executable prompt bodies.
- Create paired Korean and English docs for important durable policies, workflows, and project explanations.

## Maintenance Rule

When the user gives an instruction that should affect future work, update this file, the Korean companion document, and any directly relevant operational document in the same change set.

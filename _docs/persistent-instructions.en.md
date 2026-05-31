# Persistent Instructions

This document records durable user instructions in English.

## Active Instructions

- Manage this repository as a monorepo for a personal agent-building platform.
- Keep separate projects as root-level `kebab-case` folders.
- Keep project-specific files inside the owning project folder.
- When a new interest has an independent lifecycle, create a new root project and register it under `_ops/projects/`.
- Commit every completed meaningful change set.
- Push completed commits to `origin/main` immediately unless explicitly told not to push.
- Before closing meaningful work, evaluate the result against the initial user instruction and rework real gaps.
- Before evaluation, summarize completed work and check prior internal work or strong references for related tasks.
- Save the final work evaluation as a file under `_history/evaluations/YYYY/`.
- Save important planning processes as files under `_history/plans/YYYY/`.
- Track work history under `_history/YYYY/YYYY-MM-DD.md`.
- Use `_ops/` as the durable operations hub for prompts, workflows, and maps.
- Track active agents and parallel work in `_ops/coordination/`.
- Capture reusable findings from internet research and external references under `_research/`.
- Keep foundational agent and platform operating philosophy under `_philosophy/`.
- Run web search first for every new user instruction before planning, repository exploration, or file edits.
- If web search is irrelevant or unavailable, record that and continue with stronger local verification.
- For research or planning work, collect broad high-authority sources, including official docs, papers, open-source repos, international tech blogs, analysis articles, community/social signals, and contrary examples.
- Treat likes, shares, comments, GitHub stars, Hacker News points, Reddit activity, and LinkedIn reactions as adoption signals, not standalone proof.
- Treat knowledge-base content as fallible and validate it with `knowledge-skeptic-agent` before relying on it.
- For important plans, do not rely only on the model's internal guess; use web search plus another search channel to derive insights before planning.
- Work that uses `research-insight-planner-agent` should set `plan_history_targets` and record plan changes.
- Use `hallucination-guard-agent` before publishing final outputs that contain factual claims.
- Unsupported factual claims must be verified, removed, or explicitly caveated as uncertainty.
- Compress long conversation context into repository docs and history logs.
- Promote repeated workflows into templates, tools, skills, prompts, or workflows when useful.
- Keep repository and prompt maps current when navigational structure changes.
- Use `work-evaluator-agent` as the default close-out evaluator.
- Prefer Python for agent implementations, orchestration, backend automation, evaluation, and reusable local tools.
- Use mature, maintained, license-compatible open-source tools and libraries when they fit the task.
- Document useful internet research with source URLs, access dates, summaries, reliability, and applicability.
- Consider HTML artifacts when browser rendering, visual hierarchy, dashboards, or interactive review are useful.
- Use Korean for user-facing docs and history by default.
- Use English for executable prompt bodies.
- Create paired Korean and English docs for important durable policies, workflows, and project explanations.

## Maintenance Rule

When the user gives an instruction that should affect future work, update this file, the Korean companion document, and any directly relevant operational document in the same change set.

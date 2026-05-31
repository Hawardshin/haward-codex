# Repository Instructions

This repository is the workspace for building and tracking a personal agent-building platform and related projects.

## Workspace Rules

- Treat each root-level non-reserved directory as a separate project.
- Create new project directories at the repository root using `kebab-case`.
- Reserve underscore-prefixed root directories for workspace operations:
  - `_docs/` for workspace-level documentation and decision records
  - `_philosophy/` for foundational agent and platform operating philosophy
  - `_history/` for dated work history and compressed context summaries
  - `_ops/` for operations navigation, prompts, workflows, and maps
  - `_research/` for reusable internet research and external reference notes
  - `_skills/` for tracked source copies of custom Codex skills
  - `_templates/` for reusable project scaffolds
  - `_tools/` for reusable local tools and scripts
  - `_archive/` for paused or retired projects
- Keep project-specific code, docs, tests, and assets inside that project folder.
- Keep project-specific configs, artifacts, tools, and decisions inside that project folder as well.
- Do not move or delete unrelated files unless the user explicitly asks.
- Prefer creating a project folder for substantial work instead of placing loose files at the repository root.
- Register root projects and their boundaries in `_ops/projects/registry.json`.

## Git Rules

- Check `git status` before editing and before committing.
- Commit every completed meaningful change set.
- Use commit messages in the form `type(scope): summary`.
- Keep commits scoped to the work just completed.
- Push completed commits to `origin/main` immediately after committing unless the user explicitly says not to push.
- Do not rewrite history, reset, or discard user changes unless explicitly requested.
- Update the relevant history log before committing when the work changes project direction, repository rules, or meaningful artifacts.
- Before final close-out of meaningful work, evaluate the result against the user's initial instruction and rework any real gaps before committing or final response.
- Before evaluation, summarize completed work and check prior internal work or strong external references relevant to the task.
- Save the final work evaluation as a file under `_history/evaluations/YYYY/` before committing meaningful work.
- Save important planning processes as files under `_history/plans/YYYY/`.
- Track active agents and parallel work in `_ops/coordination/status.json` and generated coordination boards.
- Capture reusable internet research and strong external references under `_research/`.
- Treat knowledge-base content as fallible and validate it with `knowledge-skeptic-agent` before using it as evidence.
- For important planning, do not rely only on the model's internal guess; use `research-insight-planner-agent` to combine web search with another search channel, derive insights, and plan validation.
- When using `research-insight-planner-agent`, set `plan_history_targets` and keep the plan process file updated if the plan changes.
- Keep foundational operating philosophy under `_philosophy/`; keep executable rules and workflows under `_docs/` and `_ops/`.

## Platformization Rules

- Treat the repository as a monorepo for a personal agent-building platform.
- Use `_ops/index.md` as the navigation hub for ongoing work.
- Use `_philosophy/` for the durable worldview behind agent behavior and operating rules.
- Keep reusable platform concepts in `agent-platform/` unless they clearly belong to another project.
- Keep domain-specific interests and experiments in their own root project folders; do not add them to `agent-platform/` just because the platform exists.
- Before starting substantial work, classify ownership with `_ops/workflows/25-project-boundary-management.md`.
- When a workflow repeats or creates avoidable friction, consider promoting it into a template, tool, or skill.
- Prefer Python for agent implementations unless the project constraints clearly favor another runtime.
- Before hand-rolling agent infrastructure, evaluate mature open-source libraries, frameworks, and tools that can reduce maintenance cost.
- Prefer the smallest reusable asset that solves the problem:
  - template for repeated file or folder structure
  - tool for deterministic execution, conversion, validation, or generation
  - skill for repeated agent behavior, domain rules, or multi-step workflows

## Persistent Instruction Rules

- Treat user instructions phrased as ongoing preferences or future operating rules as durable repository rules.
- Persist durable instructions in `AGENTS.md`, `README.md`, `_docs/persistent-instructions.md`, or the relevant project docs.
- Record the instruction in `_history/YYYY/YYYY-MM-DD.md` when it changes future behavior.
- Do not rely on chat memory for instructions that should affect future work.
- If a durable instruction conflicts with an older rule, update the docs so the current rule is explicit.

## Operations Navigation Rules

- Use `_ops/prompts/00-router.md` to select reusable prompts for repeated task types.
- Use `_ops/workflows/00-start-here.md` as the default sequence for multi-step work.
- Use `_ops/projects/registry.json` to see registered root projects and ownership boundaries.
- Use `_ops/workflows/25-project-boundary-management.md` when a request may create a new project or cross project boundaries.
- Check `_ops/coordination/board.ko.md` when parallel work may exist.
- Use `_ops/workflows/40-evaluate-and-rework.md` before closing meaningful work.
- Keep `_ops/maps/repository-map.md` and `_ops/maps/prompt-map.md` current when folders, prompts, workflows, tools, skills, or project structure change.
- Run `python3 _tools/workspace-index/src/workspace_index.py` after changing navigational structure.
- Run `python3 _tools/task-board/src/task_board.py` after changing coordination status.
- If a repeated prompt or workflow is missing, add it under `_ops/prompts/` or `_ops/workflows/` instead of rediscovering the path next time.

## Evaluation Rules

- Use `work-evaluator-agent` to compare the initial instruction, actual result, changed files, and verification.
- Include a completed-work summary and references checked in the evaluation input.
- Check repository history, existing project docs, official documentation, mature open-source projects, or other strong references before judging related work.
- Use `research-insight-planner-agent` when planning depends on external facts, current information, prior repository knowledge, or multiple references.
- Link relevant `_history/plans/YYYY/` files from evaluation reports when a saved plan guided the work.
- When internet research produces reusable findings, create or update research notes and link them from related docs or evaluation reports.
- Use `knowledge-skeptic-agent` when relying on `_research`, `_docs`, `_history`, or previous project docs for important decisions.
- If the evaluator identifies missing requirements or mismatches, turn them into follow-up actions and complete them before final close-out.
- Re-run relevant tests or checks after rework.
- Non-blocking improvements can be recorded in history or project docs, but blocking gaps must be fixed.
- Save evaluation reports as `_history/evaluations/YYYY/YYYY-MM-DD-<slug>.ko.md`; add an English companion when the report is important durable context.
- The Python evaluator entry point is `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <input.json>` from `agent-platform/`.

## Capability Creation Rules

- For new skills, use the `skill-creator` guidance.
- Keep skill source under `_skills/<skill-name>/` so it is tracked by git.
- If a skill must be active in Codex, install or copy it into `$CODEX_HOME/skills` only after confirming the target path and permissions.
- For new tools, prefer `_tools/<tool-name>/` for shared tools or `project-name/tools/` for project-specific tools.
- Document each reusable tool with its purpose, inputs, outputs, and main command.
- Do not create a new skill or tool when a short documented procedure is enough.
- Prefer open-source dependencies and tools when they are mature, maintained, license-compatible, and fit the task.
- When choosing external dependencies for current work, verify their current status and docs instead of relying only on memory.
- Preserve reusable research findings with source URLs, access dates, summaries, reliability, and applicability.
- Do not treat repository knowledge-base content as authoritative without checking freshness, source quality, and contradictions.

## Context Management Rules

- When conversation context becomes long, compress stable decisions into `_history/YYYY/YYYY-MM-DD.md` and the relevant project docs.
- Keep the latest project purpose, status, commands, and constraints in that project's `README.md`.
- Preserve only durable information in docs: decisions, requirements, command results worth reusing, and links to artifacts.
- Avoid relying on chat history for project state that future work needs.

## Language Rules

- Write user-facing documentation and history in Korean by default.
- Keep executable prompt bodies in English to reduce token cost.
- For important durable docs, create paired Korean and English files using `name.ko.md` and `name.en.md`.
- When paired Korean and English docs exist, update both in the same change set.
- In prompt files, explanatory text can be Korean, but the actual `Prompt` block must be English.

## Artifact Format Rules

- Use Markdown for logs, rules, decisions, and lightweight documentation.
- Consider HTML for dashboards, visual reports, product specs, prototypes, and standalone artifacts that benefit from browser rendering.
- Put project-specific generated or designed artifacts under `project-name/artifacts/`.
- Reusable HTML patterns belong under `_templates/html-artifact/`.

## Default Project Skeleton

New projects should normally start with:

```text
project-name/
  README.md
  artifacts/
  docs/
  src/
  tests/
```

Adjust the skeleton only when the project type clearly needs a different structure.

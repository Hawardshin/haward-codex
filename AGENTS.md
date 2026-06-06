# Repository Instructions

This repository is the workspace for building and tracking a personal agent-building platform and related projects.

## Workspace Rules

- Treat each root-level non-reserved directory as a separate project.
- Create new project directories at the repository root using `kebab-case`.
- Use `_ops/naming/naming-policy.json` as the source of truth for durable naming rules.
- For new durable paths, use lower `kebab-case` for project/tool/skill/workflow/prompt/spec slugs, `snake_case` for Python packages and modules, `YYYY-MM-DD-<slug>` for dated records, and `name.ko.md`/`name.en.md` for important bilingual docs.
- Do not rename existing durable paths without a migration plan, trace update, and validation run.
- Reserve underscore-prefixed root directories for workspace operations:
  - `_docs/` for workspace-level documentation and decision records; keep it categorized through `_docs/registry.json`
  - `_docs/instructions/` for durable instructions and baseline workspace rules
  - `_docs/policies/` for execution policies
  - `_docs/operating-models/` for conceptual operating models
  - `_docs/governance/` for cross-workspace governance documents
  - `_philosophy/` for foundational agent and platform operating philosophy
  - `_requirements/` for shared requirements baselines, change records, and review records
  - `_specs/` for shared spec-driven artifacts, implementation plans, task lists, validation, and traceability
  - `_history/` for dated work history and compressed context summaries
  - `_ops/` for operations navigation, prompts, workflows, and maps
  - `_research/` for reusable internet research and external reference notes
  - `_skills/` for tracked source copies of custom Codex skills
  - `_templates/` for reusable project scaffolds
  - `_tools/` for reusable local tools and scripts
  - `_archive/` for paused or retired projects
- Treat `_private/` and `outputs/` as local-only ignored folders, not durable repository knowledge:
  - `_private/` is the protected local vault for private scratch state and sensitive local files.
  - Store real sensitive local files under `_private/sensitive/` or an external secret manager; track only policies, env var names, secret references, and redacted metadata.
  - Agents must not recursively list, search, open, read, summarize, index, snapshot, embed, or use `_private/` contents by default. If sensitive content is needed, ask for a redacted extract first; direct inspection requires explicit one-time user permission for the exact path and operation.
  - `outputs/` is for transient one-off tool output only.
  - Durable project artifacts must move into the owning project's `artifacts/` folder.
- Keep project-specific code, docs, tests, and assets inside that project folder.
- Keep project-specific configs, artifacts, tools, and decisions inside that project folder as well.
- Do not move or delete unrelated files unless the user explicitly asks.
- Prefer creating a project folder for substantial work instead of placing loose files at the repository root.
- Register root projects and their boundaries in `_ops/projects/registry.json`.
- Keep durable AI assistant operating principles tool-agnostic. Use `_docs/operating-models/tool-agnostic-agent-operating-model.ko.md` and `_ops/assistant-runtimes/adapter-registry.json` as the shared source for adapting this workspace to Codex, Claude Code, Cursor, Antigravity, or another assistant runtime.
- All agents shall strongly adhere to durable principles. Treat principles as execution contracts and close-out gates, not motivational language; speed, profit, optimism, convenience, or user pressure must not silently bypass required evidence, safety, privacy, legality, quality, provenance, validation, or evaluation.
- Treat `AGENTS.md`, `CLAUDE.md`, `.claude/rules/`, `.cursor/rules/`, and `.agents/rules/` as runtime adapters or entrypoints. Do not fork durable policy across them; update shared docs/configs first and keep adapters thin.

## Git Rules

- Check `git status` before editing and before committing.
- Commit every completed meaningful change set.
- Use commit messages in the form `type(scope): summary`.
- Keep commits scoped to the work just completed.
- Push completed commits to `origin/main` immediately after committing unless the user explicitly says not to push.
- Do not rewrite history, reset, or discard user changes unless explicitly requested.
- Update the relevant history log before committing when the work changes project direction, repository rules, or meaningful artifacts.
- Before final close-out of meaningful work, evaluate the result against the user's initial instruction and rework any real gaps before committing or final response.
- After completing meaningful implementation work, run the owning project's build or package command before final response so the user does not have to build manually. If no build command exists, or the build is unsafe, too costly, or outside the touched project boundary, record the reason and run the strongest available equivalent verification instead.
- Before evaluation, summarize completed work and check prior internal work or strong external references relevant to the task.
- Treat the user's work and instructions as requirement candidates; define, review, update, and baseline relevant requirements before implementation.
- Save shared requirements under `_requirements/`; save project-specific requirements under the owning project's `docs/requirements/`.
- For meaningful implementation work, convert active requirements into spec-driven artifacts before coding: `spec`, `plan`, `tasks`, `validation`, and `traceability`.
- Save shared specs under `_specs/`; save project-specific specs under the owning project's `specs/`.
- If an active spec is ambiguous or differs from current source, tests, or generated artifacts, run `spec-reconciliation-agent` before changing either side. Classify each issue as `update_spec`, `update_source`, `ask_user`, or `defer`; for `ask_user`, surface a `clarification_needed` alert with stable question IDs, options, answer format, and decision impact, then wait for the answer before editing the affected spec or source while continuing safe unrelated work.
- For custom skill work, keep source under `_skills/`, record trigger examples, run skill validation, forward-test realistic scenarios when useful, and capture improvement ideas before close-out.
- Save the final work evaluation as a file under `_history/evaluations/YYYY/` before committing meaningful work.
- Save important planning processes as files under `_history/plans/YYYY/`.
- Save summaries of meaningful user requests under `_history/user-requests/YYYY/`; do not preserve full original prompt text unless necessary.
- Save request-to-outcome traces under `_history/request-traces/YYYY/` so each meaningful request links to outcome, artifacts, evaluation, and commit.
- Maintain quick human-readable work summaries under `_history/work-summaries/YYYY/` before closing meaningful work.
- Track active agents and parallel work in `_ops/coordination/status.json` and generated coordination boards.
- Capture reusable internet research and strong external references under `_research/`.
- Treat knowledge-base content as fallible and validate it with `knowledge-skeptic-agent` before using it as evidence.
- For every new user instruction, run web search first before planning, repository exploration, or file edits.
- For every reusable prompt execution under `_ops/prompts/`, run web search first and follow `_ops/prompts/README.ko.md`.
- Save meaningful web search records under `_history/web-searches/YYYY/` with queries, checked sources, weak sources ignored, plan impact, uncertainty, and a public decision summary.
- Do not store raw internal chain-of-thought in repository documents; store only verifiable public search reasoning summaries.
- If the web search is irrelevant or unavailable, record that and continue with stronger local verification.
- For research or planning work, collect broad high-authority sources: official docs, papers, standards, books, official statistics, survey datasets, market/industry reports, open-source repos, international tech blogs, analysis articles, community signals, social/expert signals, and contrary examples.
- When the user asks for better web search or a task needs broad source discovery, use `agent-platform/configs/research/human-search-profile.json` to build a query ladder with seed, synonym, operator, source-lane, regional, community, contrary, and snowballing searches before synthesis.
- Good sources found through human-like search should be summarized only when they change the answer, plan, risk model, source list, or reusable knowledge base; save reusable summaries under `_research/` or the owning project docs with URL, access date, reliability, limitations, and plan impact.
- Treat likes, shares, comments, GitHub stars, Hacker News points, Reddit activity, and LinkedIn reactions as adoption or discovery signals, not standalone factual proof.
- For important planning, do not rely only on the model's internal guess; use `research-insight-planner-agent` to combine web search with another search channel, derive insights, and plan validation.
- Treat `research-insight-planner-agent` as a core Perplexity-style answer engine, not a simple search summarizer.
- General research plans must record `research_profile_paths`, use `agent-platform/configs/research/research-agent-profile.json`, include all required `answer_engine_stages`, and record `citation_requirements`.
- For marketing, consumer insight, market sizing, brand strategy, go-to-market, survey-backed claims, book/theory grounding, or quantitative evidence research, include `agent-platform/configs/research/marketing-evidence-profile.json` in `research_profile_paths`.
- Marketing and market-sizing numbers must record value, unit, denominator/base, geography, timeframe, target population, methodology, sample, sponsor/funder, access date, and comparability notes before use as evidence.
- Survey evidence must record population, sample size, sampling method, field dates, mode, weighting, sponsor/funder, and question wording or instrument when available; missing methodology downgrades the source to weak evidence.
- Research agent stages are `query_understanding`, `search_retrieval`, `source_ranking`, `evidence_extraction`, `synthesis`, `citation_grounding`, and `skeptic_review`.
- Rank sources before synthesis and treat citations as verification handles, not proof.
- When using `research-insight-planner-agent`, set `plan_history_targets` and keep the plan process file updated if the plan changes.
- For deep research, long-form reports, landscape reviews, literature-style reviews, or multi-source evidence synthesis, use `deep-research-agent` with `agent-platform/configs/research/deep-research-profile.json`; record repeated research iterations, evidence items, contradiction notes, citation audit notes, unsupported or weak claims, report outline, and report targets before treating the report as ready to write.
- For coding/API/library/architecture/performance/debugging/security/migration research, use `coding-research-agent` before implementation and answer all standard post-research questions.
- Coding research must record diverse `source_types` and use at least three distinct non-`other` source types before it can be treated as implementation-ready.
- Coding research must record `reference_config_paths` showing which source registry or research profile config was used.
- Coding research must record `technology_stack`, `technology_official_docs`, and `stack_version_constraints`; each major known technology such as Java/Spring Boot, C, React, or Next.js must be checked against its own official documentation or standard before implementation.
- Coding research must inspect high-signal issue/discussion/community sources when available, including Stack Overflow votes/accepted answers, Reddit discussions, GitHub Issues/Discussions, and project forums; record them in `issue_discussion_sources`, `issue_discussion_notes`, and `community_signal_notes`.
- Treat issue/discussion votes, likes, reactions, stars, and comments as adoption, discovery, or risk signals, not standalone factual proof.
- Before writing source code, compare at least two language or runtime options, select one explicitly, and record `language_options`, `selected_language`, and `language_decision_notes` with maintainability, ecosystem, runtime, tooling, testing, and project-boundary trade-offs.
- Before writing source code, search for best-fit architecture patterns and reference architectures, compare at least two architecture options, and record `architecture_reference_sources`, `architecture_options`, and `architecture_decision_notes`.
- Treat architecture theory/framework guidance and practitioner opinions as separate evidence roles. Record `architecture_theory_sources`, `architecture_practitioner_sources`, and `architecture_tradeoff_notes` so disagreements, convergence, and local validation needs are visible.
- Source-code-writing agents must inspect relevant open-source repositories, reference implementations, or well-structured code examples and record `code_reference_sources` plus `code_reference_notes` before implementation.
- Before creating or reshaping source folders, compare at least two folder structure options and record `folder_structure_options`, `folder_structure_decision_notes`, `folder_semantics_notes`, and `maintainability_notes` so maintainers can understand folder purpose and ownership by inspection.
- Shared settings files must be self-documenting: include `reader_guide`, `reference_links`, `structure_rules`, and `field_guide` so the user can understand references and rules by opening the file.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract <config.json>` from `agent-platform/` after creating or changing important shared settings files.
- Before publishing final outputs with factual claims, run or simulate `hallucination-guard-agent` and resolve `grounding_required` gaps.
- Do not present unsupported or unchecked claims as facts; verify them, remove them, or explicitly caveat uncertainty.
- Keep foundational operating philosophy under `_philosophy/`; keep executable rules and workflows under `_docs/` and `_ops/`.
- Philosophy principles must be traceable to executable structure. When `_philosophy/` changes or a new durable principle should affect future behavior, update `agent-platform/configs/governance/philosophy-traceability.json` and run `check-philosophy-trace`.
- Keep `_docs/` categorized by `_docs/registry.json`. Do not add loose root Markdown files under `_docs` except allowed index files; after changing `_docs`, run `python3 _tools/docs-audit/src/docs_audit.py --check`.
- When a request is too broad, file-heavy, spans many projects, says to review/improve everything, or creates context pressure, run or simulate `large-scope-decomposer-agent` with `agent-platform/configs/planning/large-scope-decomposition-profile.json` and `_ops/workflows/76-large-scope-decomposition.md` before implementation or parallel execution.
- Large-scope work must record source inventory, exclusions, representative samples, slice IDs, `touch_paths`, dependencies, output targets, merge gates, verification, context budget, source provenance, and plan evidence. Do not read every file or dump large source bundles by default; use maps, search, dependency graphs, indexes, sampling, and targeted verification.
- Do not postpone, defer, or hand back work merely because the scope is large. Large-scope decomposition is an execution tool, not a delay tactic; it must produce a first executable slice, validation gate, and continuation path unless a concrete blocker requires user input.
- When the user says to do all of it, finish every applicable part of the request: requirements, implementation, generated artifacts, validation, build/package steps, records, commit, and push. Do not close with a partial subset unless a concrete blocker is isolated, documented, and paired with a continuation path.
- When speed matters or a request can be decomposed, use `parallel-work-planner-agent` before parallel execution. Record task IDs, dependencies, touch paths, output targets, verification, shared resources, conflict controls, coordination targets, merge strategy, rollback plan, source provenance, and plan evidence.
- Do not run tasks that touch overlapping files, configs, generated maps, git state, or other shared mutable resources in parallel unless a dependency, lock, branch/worktree rule, or explicit handoff serializes them.
- When multiple research lanes run in parallel, require a merge gate such as `research-synthesis` that waits for all research lanes, resolves contradictions, records accepted evidence, and releases downstream implementation only after acceptance checks pass.

## Platformization Rules

- Treat the repository as a monorepo for a personal agent-building platform.
- The platform's top-level purpose is to reduce repetitive human work and elapsed work time by modeling real human research, comparison, judgment, execution, and verification processes, then promoting automation-worthy repetition into the smallest durable asset: prompt, workflow, template, tool, skill, agent, or project feature.
- Automation must preserve human-judgment checkpoints, validation criteria, and rollback boundaries; meaningful automation candidates should be checked against timing records, bottleneck records, and evaluator results.
- "Like a human directly doing the work" means modeling the competent human work sequence and artifacts before automation: goal, context, sources, assumptions, option comparison, decision, execution notes, verification, handoff, and review.
- Use `_ops/index.md` as the navigation hub for ongoing work.
- Use `_philosophy/` for the durable worldview behind agent behavior and operating rules.
- Keep reusable platform concepts in `agent-platform/` unless they clearly belong to another project.
- Keep domain-specific interests and experiments in their own root project folders; do not add them to `agent-platform/` just because the platform exists.
- Before starting substantial work, classify ownership with `_ops/workflows/25-project-boundary-management.md`.
- When a workflow repeats or creates avoidable friction, consider promoting it into a template, tool, or skill.
- When repeated work, bottlenecks, omissions, validation failures, manual rework, or recurring research/prompt/tool patterns appear, use `capability-promotion-agent` and `agent-platform/configs/orchestration/capability-promotion-registry.json` to create bounded black-box capability candidates.
- User-facing capability promotion may feel automatic, but internal observation, candidate, evidence, risk, rejected lighter option, validation, rollback or disablement, documentation, evaluation, commit, and push traces must remain auditable.
- Capability promotion must model the direct human work process before idea generation; generated ideas should address concrete human process steps rather than only the user's phrasing.
- Capability promotion must generate and evaluate ideas separately: for non-trivial problems, create several improvement ideas, score them against explicit criteria, then record selected, rejected, or queued reasons before promotion.
- Promote the smallest useful asset first: prompt, workflow, template, tool, skill, agent, then project feature.
- Do not auto-execute destructive, secret-bearing, install, permission, cost, public-release, security/privacy-sensitive, or irreversible changes without a human checkpoint and rollback plan.
- Use `agent-platform/configs/security/sensitive-file-boundary.json`, `_docs/policies/sensitive-file-boundary-policy.ko.md`, and `_ops/security/README.ko.md` when a task touches tokens, keys, credentials, private notes, browser cookies, user-provided private files, or any file that AI should not inspect directly.
- Prefer Python for agent implementations unless the project constraints clearly favor another runtime.
- Before hand-rolling agent infrastructure, evaluate mature open-source libraries, frameworks, and tools that can reduce maintenance cost.
- If a mature open-source tool or library is the right fit, install it in the owning project/tool environment instead of avoiding installation by default.
- Before installing open source, record the install scope, exact install command, dependency record path, security review, license review, verification step, and rollback plan.
- For actual installs, upgrades, removals, or global environment changes, create an installation audit record under `_history/installations/YYYY/` and index it in `_ops/installations/registry.json`.
- When installation occurred, include `installation_occurred=true` and `installation_record_targets` in the work evaluation input.
- Prefer project-local or tool-local dependency installation; avoid global installs unless the capability truly requires it and the reason/removal path is documented.
- When the request involves what users, developers, or superadmins should see in a UI, dashboard, monitor, admin surface, desktop surface, or generated snapshot, select `view_mode` from `agent-platform/configs/access/view-mode-registry.json`. Use `superadmin_developer` as the current default. Keep `view_mode` separate from `install_mode` and `work_mode`; client-side hiding is not a security boundary.
- When the request involves setup, running, deployment, or development environment preparation, select `install_mode` from `agent-platform/configs/installations/install-mode-registry.json`: use `user` for using/viewing/deploying the platform and `developer` for improving platform source, rules, tools, skills, validators, dashboards, or tests. Keep `install_mode` separate from `work_mode`.
- When the request involves turning the platform into installable end-user software, OS installers, desktop apps, Tauri, Electron, MSIX, DMG, app signing, notarization, updates, or uninstall behavior, use `platform-desktop-app/`, `_docs/policies/installable-software-policy.ko.md`, and `_ops/workflows/63-installable-software-productization.md`. Keep end-user installer packaging separate from repository setup `install_mode`.
- When the request involves installable desktop app user flow, first-run onboarding, workspace chooser, task timeline, decision inbox, settings, or recovery behavior, use `platform-desktop-app/configs/user-flow-registry.json` and `_ops/workflows/74-desktop-user-flow-design.md` before UI, installer, or runtime implementation.
- When making the installable platform runnable on macOS, use `platform-desktop-app/configs/macos-execution-profile.json`. Separate developer local run, internal test `.app`, and public outside-App-Store distribution. Do not claim public macOS readiness without Developer ID signing, hardened runtime, notarization, stapling when applicable, workspace-boundary smoke tests, update/rollback planning, and privacy/dependency review.
- Platform UI may use subtly cute or quietly delightful details when they remain secondary to clarity, scanability, accessibility, and operational trust. Prefer small color accents, status details, friendly empty states, and restrained micro-interactions over decorative clutter, emoji-heavy UI, or visual noise.
- When a screen has one primary feature, that feature should occupy most of the screen by default. Supporting navigation, status, and actions must stay subordinate; split layouts require a clear comparison, monitoring, or multi-primary-task reason.
- Main tab/page surfaces should not be the default scroll owner. Prefer full-surface desktop layouts that fit the viewport; use bounded scroll containers only for code editors/viewers, terminal or log panes, long function/file lists, popup/dialog/flyout menus, and intentionally framed inspector panels. If a main tab would overflow, first split the information architecture into a deeper view or bounded child pane before making the whole tab scrollable.
- The installable platform is not a hard wrapper around one CLI. The platform is the primary host runtime that launches first and owns task state, durable memory, decisions, artifacts, validation, and UI authority. When using Codex CLI, Claude Code, Gemini CLI, OpenCode, Cursor, GitHub CLI, package managers, deployment CLIs, or other command-line tools from the platform, treat them as guest adapter capabilities governed by `agent-platform/configs/integrations/cli-adapter-registry.json` and `_docs/policies/cli-adapter-policy.ko.md`.
- A missing optional CLI should degrade as `capability_missing` with setup guidance, not block the whole platform. Before making a CLI required, bundled, globally installed, or auto-installed, record installation audit, security boundary, rollback, and validation commands.
- Treat AI's ability to turn unstructured or semi-structured inputs into structured records as a core platform capability. Use `agent-platform/configs/usage/unstructured-data-structuring-profile.json`, `_docs/policies/unstructured-data-structuring-policy.ko.md`, and `_ops/workflows/67-structure-unstructured-data.md` when messy notes, chat history, documents, research sources, reviews, logs, or screenshots should become schemas, tables, JSON, requirements, tasks, evidence items, or evaluation inputs.
- Structured extraction outputs must keep schema, provenance, null/ambiguity handling, and validation notes before they are used as evidence or downstream automation input.
- Prefer the smallest reusable asset that solves the problem:
  - template for repeated file or folder structure
  - tool for deterministic execution, conversion, validation, or generation
  - skill for repeated agent behavior, domain rules, or multi-step workflows

## Persistent Instruction Rules

- Treat user instructions phrased as ongoing preferences or future operating rules as durable repository rules.
- Persist durable instructions in `AGENTS.md`, `README.md`, `_docs/instructions/persistent-instructions.md`, or the relevant project docs.
- Record the instruction in `_history/YYYY/YYYY-MM-DD.md` when it changes future behavior.
- Do not rely on chat memory for instructions that should affect future work.
- If a durable instruction conflicts with an older rule, update the docs so the current rule is explicit.

## Operations Navigation Rules

- Use `_ops/prompts/00-router.md` to select reusable prompts for repeated task types.
- Use `_ops/workflows/00-start-here.md` as the default sequence for multi-step work.
- Start every new instruction with `_ops/workflows/05-web-first-intake.md`.
- After web-first intake and before local planning, run or simulate `memory-bootstrap-agent` with `agent-platform/configs/memory/bootstrap-manifest.json` and read the returned hot anchors.
- After web-first intake and memory bootstrap, select `work_mode` with `_ops/workflows/02-select-work-mode.md` and `agent-platform/configs/workflows/work-mode-registry.json`.
- Use `_ops/workflows/73-view-mode-selection.md` when UI, dashboard, monitor, admin surface, desktop surface, or generated snapshot work should distinguish user, developer, and superadmin development views.
- Use `_ops/workflows/62-select-install-mode.md` when setup or dependency preparation should distinguish user install from developer improvement install.
- Use `_ops/workflows/63-installable-software-productization.md` when the platform should become installable desktop/end-user software or when packaging choices such as Tauri, Electron, MSIX, DMG, signing, notarization, update, or uninstall behavior matter.
- Use `_ops/workflows/74-desktop-user-flow-design.md` when the installable desktop app needs a user flow, first-run onboarding, workspace chooser, task timeline, decision inbox, settings flow, or recovery behavior.
- Use `_ops/workflows/66-cli-adapter-integration.md` when platform work adds, invokes, bundles, requires, or compares external CLIs. Keep CLI adapters replaceable and avoid turning the platform into a single CLI wrapper.
- Use `_ops/workflows/71-cli-pipeline-orchestration.md` when one action launches multiple CLI processes, connects stdout/stderr/stdin pipes, exchanges files/temp artifacts/caches/logs/reports, fans out/fans in CLI work, or embeds multi-CLI orchestration in a desktop shell, monitor, local daemon, or agent workflow.
- Use `_ops/workflows/67-structure-unstructured-data.md` when messy or mixed-format input should become durable structured records with schema, provenance, null handling, and validation.
- Use `_ops/workflows/68-omission-prevention.md` before closing non-`quick` work, or whenever required user instructions, requirements, artifacts, or acceptance checks could be missed.
- Use `_ops/workflows/69-resource-leak-prevention.md` whenever work touches long-running agents, servers, browser automation, subprocesses, workers, queues, caches, streams, large data, file handles, network connections, timers, or subscriptions.
- Use `_ops/workflows/78-philosophy-alignment.md` when a request changes durable worldview, operating philosophy, principle definitions, or claims that a principle should be reflected in future platform behavior.
- Use the lightest sufficient mode: `quick`, `standard`, `ship_first`, `research`, or `governance`; do not force the full requirements/spec/history loop when the selected mode makes those artifacts non-blocking.
- Treat work modes as enforced gates, not prompt-only preferences: non-`quick` work must leave `mode_selection_record_targets`, and close-out must run `check-work-modes` when mode policy or evaluator behavior changes.
- Non-`quick` work must leave `omission_check_targets`, backed by `omission-guard-agent` or an equivalent task coverage checklist, so required items are not silently skipped.
- Runtime-risk work must leave `resource_check_targets`, backed by `resource-guard-agent` or an equivalent lifecycle and memory/resource measurement record, and set `resource_risk_occurred=true` in evaluator input.
- Multi-process CLI orchestration work must leave `cli_pipeline_targets`, backed by `cli-pipeline-agent` or an equivalent process graph plus pipe/artifact validation record, and set `cli_pipeline_occurred=true` in evaluator input.
- For meaningful work, record phase-level timing under `_history/work-timings/YYYY/` using `_tools/work-timer/` so slow phases and bottleneck candidates are visible.
- Use `_ops/projects/registry.json` to see registered root projects and ownership boundaries.
- Use `_ops/projects/root-structure-policy.json` to classify root folders as registered projects, reserved operational folders, local-only folders, or generated output.
- Keep durable project top-level folders listed in each registry entry's `project_specific_home`; generated folders should be covered by `generated_output_dirs` and `.gitignore`.
- Use `_docs/governance/naming-governance.ko.md` and `_ops/naming/naming-policy.json` when creating, moving, or renaming durable files, folders, projects, tools, skills, configs, prompts, workflows, specs, or history artifacts.
- Use `_ops/assistant-runtimes/adapter-registry.json` when adding or changing AI assistant runtime adapters such as Claude Code, Cursor, or Antigravity.
- Use `_ops/workflows/25-project-boundary-management.md` when a request may create a new project or cross project boundaries.
- Use `_ops/workflows/35-requirements-lifecycle.md` when a request changes durable behavior, rules, project structure, platform capability, or implementation criteria.
- Use `_ops/workflows/36-spec-driven-development.md` when meaningful work needs implementation from requirements.
- Use `_ops/workflows/38-spec-source-reconciliation.md` when a project spec is ambiguous, missing, or inconsistent with current source, tests, generated artifacts, or validation output.
- Use `_ops/workflows/37-skill-lifecycle.md` when creating, updating, validating, installing, or improving a custom Codex skill.
- Use `_ops/workflows/59-bridge-ai-usage-gap.md` when the user asks how to use AI better or when a repeated AI-use gap should be turned into better task framing, verification, iteration, or durable assets.
- If a user instruction is vague, biased, leading, conclusion-seeking, missing an output contract, or assumes the LLM simply knows truth, rewrite it into a neutral, source-checkable task brief before execution using `agent-platform/configs/usage/ai-usage-gap-profile.json`.
- When missing information in a vague instruction would materially change the result, ask clarifying counter-questions with a bounded `clarification_budget`: usually one round, at most two rounds, and no more than three prioritized questions per round. If the answer is missing or remains vague, converge through reasonable assumptions, recommended defaults, reversible ship-first work, or explicit deferral.
- A pending clarification answer or `clarification_needed` item must not stop the whole task. Isolate only the dependent decision, artifact, or action as `blocked_decision`, continue safe unaffected work as `unblocked_work`, and record assumptions/defaults plus the `resume_action` for merging or correcting work after the answer arrives.
- Collect multiple pending answers, approvals, and preference decisions in `_ops/coordination/human-decision-inbox.json`. When the human returns with an answer, checkpoint current work, then interrupt/resume immediately or schedule resume at the next safe point based on priority and risk; update inbox status and decision history afterward.
- When two or more defensible options, agent outputs, principles, or source interpretations are all valid and the remaining choice depends on values, preference, risk appetite, strategy, authority, accountability, or an irreversible trade-off, do not invent certainty. Use `human-arbitration-agent` to create a structured arbitration packet, route it to `_ops/coordination/human-decision-inbox.json`, pause only affected work, and continue safe unblocked work.
- Vary prompting strategy by model capability. For weak, non-reasoning, or uncertain models, use two independent attempts or a draft-critique-revise loop when cost and latency allow and task variance is high, then compare and merge results. For strong reasoning models, prioritize clear task framing and verification over unnecessary duplicate calls.
- Matching answers from repeated calls are not proof. Treat them as agreement signals and verify important claims through sources, tests, tools, evaluators, or human judgment.
- Use `_ops/workflows/76-large-scope-decomposition.md` before `_ops/workflows/52-parallel-work-planning.md` when the work is too broad, file-heavy, spans many projects, or would exceed useful context.
- Use `_ops/workflows/52-parallel-work-planning.md` when the user asks for speed, multiple agents, or parallel work, or when a meaningful task naturally splits into independent lanes.
- Use `_ops/workflows/72-agent-creation-orchestration.md` when creating reusable agents, changing agent specs, or coordinating multiple agents through supervisor/router, sequential pipeline, parallel fan-out/merge, or handoff patterns.
- Check `_ops/coordination/board.ko.md` when parallel work may exist.
- Use `_ops/workflows/40-evaluate-and-rework.md` before closing meaningful work.
- Keep `_ops/maps/repository-map.md` and `_ops/maps/prompt-map.md` current when folders, prompts, workflows, tools, skills, or project structure change.
- Run `python3 _tools/workspace-index/src/workspace_index.py` after changing navigational structure.
- Run `python3 _tools/docs-audit/src/docs_audit.py --check` after changing `_docs`, `_docs/registry.json`, docs category rules, or required durable document paths.
- Run `python3 _tools/naming-audit/src/naming_audit.py --check` after changing durable names or naming rules.
- Run `python3 _tools/structure-audit/src/structure_audit.py --check` after changing root folders, project registry, durable project top-level folders, reserved operational folders, runtime adapter folders, local-only folder rules, or generated-output rules.
- Run `python3 _tools/privacy-audit/src/privacy_audit.py --check` after changing `.gitignore`, `_private/` policy, generated maps/snapshots, monitor collection, source collection, public release settings, installer payload rules, or sensitive-file handling rules.
- Run `python3 _tools/task-board/src/task_board.py` after changing coordination status.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json` from `agent-platform/` after changing durable rules, source configs, prompts, workflows, maps, project registry, assistant runtime adapters, or platform memory anchors.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-trace configs/governance/philosophy-traceability.json` from `agent-platform/` after changing `_philosophy/`, philosophy governance docs, principle mappings, or workflows/prompts/configs that claim to execute a philosophy principle.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json configs/governance/philosophy-traceability.json configs/security/sensitive-file-boundary.json configs/research/source-registry.json configs/research/research-agent-profile.json configs/research/deep-research-profile.json configs/research/coding-research-profile.json configs/research/marketing-evidence-profile.json configs/usage/ai-usage-gap-profile.json configs/usage/unstructured-data-structuring-profile.json configs/workflows/work-mode-registry.json configs/access/view-mode-registry.json configs/access/language-mode-registry.json configs/installations/install-mode-registry.json configs/planning/spec-reconciliation-template.json configs/planning/deep-research-template.json configs/planning/large-scope-decomposition-profile.json configs/integrations/notification-channels.json configs/integrations/cli-adapter-registry.json configs/integrations/cli-pipeline-template.json configs/orchestration/agent-orchestration-registry.json configs/orchestration/capability-promotion-registry.json ../platform-desktop-app/configs/desktop-distribution-registry.json ../platform-desktop-app/configs/user-flow-registry.json ../platform-desktop-app/configs/macos-execution-profile.json ../platform-desktop-app/configs/windows-execution-profile.json ../_docs/registry.json ../_ops/coordination/human-decision-inbox.json ../_ops/installations/registry.json ../_ops/assistant-runtimes/adapter-registry.json ../_ops/naming/naming-policy.json ../_tools/work-timer/configs/work-timing-policy.json` from `agent-platform/` after changing core shared settings.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-work-modes configs/workflows/work-mode-registry.json` from `agent-platform/` after changing work modes, evaluator target fields, or close-out strictness.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json` from `agent-platform/` after changing view modes, monitor view selection, dashboard audience rules, or superadmin development view defaults.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/language-mode-registry.json` from `agent-platform/` after changing document language modes, monitor language selectors, or dashboard language filtering rules.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-omissions <input.json>` from `agent-platform/` before closing non-`quick` work when omission coverage is required.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-resources <input.json>` from `agent-platform/` before closing work with memory or runtime resource leak risk.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline <input.json>` from `agent-platform/` before closing work that designs or changes multi-process CLI orchestration, including file or artifact handoffs.
- Run `PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json` from `agent-platform/` before closing work that creates reusable agents, changes agent specs, or changes multi-agent orchestration contracts.
- If a repeated prompt or workflow is missing, add it under `_ops/prompts/` or `_ops/workflows/` instead of rediscovering the path next time.

## Evaluation Rules

- Use `work-evaluator-agent` to compare the initial instruction, actual result, changed files, and verification.
- Include a completed-work summary and references checked in the evaluation input.
- Include `work_mode` in evaluation input. Missing target fields are blocking according to the selected mode's policy in `agent-platform/configs/workflows/work-mode-registry.json`.
- Include `mode_selection_record_targets` for `standard`, `ship_first`, `research`, and `governance` work so the selected mode, reason, overrides, and enforcement checks are auditable.
- Include `omission_check_targets` for `standard`, `ship_first`, `research`, and `governance` work so required instructions, requirements, artifacts, and acceptance checks are auditable.
- Include `resource_risk_occurred=true` and `resource_check_targets` when work has memory or runtime resource leak risk. Missing resource checks are blocking gaps when resource risk occurred.
- Include `cli_pipeline_occurred=true` and `cli_pipeline_targets` when work has multi-process CLI orchestration, including file or artifact handoffs. Missing CLI pipeline checks are blocking gaps when CLI pipeline work occurred.
- In `quick` mode, missing governance/history/spec targets are non-blocking improvements unless another rule or the user makes them mandatory.
- In `ship_first` mode, require `references_checked`, `mode_selection_record_targets`, `omission_check_targets`, and `web_search_record_targets`; if improvements are intentionally postponed, include `deferred_improvement_targets` pointing to `_ops/backlog/deferred-improvements.ko.md` or a project equivalent.
- In `research` mode, require `references_checked`, `source_provenance_targets`, `plan_evidence_targets`, `mode_selection_record_targets`, `omission_check_targets`, `web_search_record_targets`, and `timing_summary_targets`.
- In `standard` and `governance` modes, missing web search records, user request summaries, requirements targets, spec targets, source provenance, plan evidence, mode selection records, omission checks, request traces, work summaries, and timing summaries are blocking gaps.
- Include `timing_summary_targets` in work-evaluator input when the selected mode requires it.
- If skill work occurred, include `skill_work_occurred=true`, `skill_targets`, and `skill_validation_targets`; missing skill source or validation targets are blocking gaps.
- If installation occurred, include `installation_occurred=true` and `installation_record_targets`; missing installation records are blocking gaps.
- Check repository history, existing project docs, official documentation, mature open-source projects, or other strong references before judging related work.
- Use `research-insight-planner-agent` when planning depends on external facts, current information, prior repository knowledge, or multiple references.
- Use `agent-platform/configs/research/enterprise-source-registry.json` as the separate seed list for large-company engineering, research-lab, architecture-center, and high-signal independent sources.
- Use `deep-research-agent` when the task asks for deep research, a detailed report, a landscape or literature-style review, or multi-source evidence synthesis; validate with `complete-deep-research` before writing or publishing the report.
- Use `coding-research-agent` when coding work needs investigation before implementation, especially for APIs, dependencies, architecture, bug root cause, performance, security, migrations, tests, or implementation patterns.
- Link relevant `_history/plans/YYYY/` files from evaluation reports when a saved plan guided the work.
- When internet research produces reusable findings, create or update research notes and link them from related docs or evaluation reports.
- Use `knowledge-skeptic-agent` when relying on `_research`, `_docs`, `_history`, or previous project docs for important decisions.
- Use `hallucination-guard-agent` to ground final factual claims, especially dates, numbers, file state, code behavior, external facts, and recommendations.
- Include grounding check results in the evaluation input when factual claims are present.
- If the evaluator identifies missing requirements or mismatches, turn them into follow-up actions and complete them before final close-out.
- Re-run relevant tests or checks after rework.
- Non-blocking improvements can be recorded in history or project docs, but blocking gaps must be fixed.
- Save evaluation reports as `_history/evaluations/YYYY/YYYY-MM-DD-<slug>.ko.md`; add an English companion when the report is important durable context.
- Save quick work summaries as `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md`; add an English companion for important durable context.
- The Python evaluator entry point is `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <input.json>` from `agent-platform/`.

## Capability Creation Rules

- For new skills, use the `skill-creator` guidance.
- Keep skill source under `_skills/<skill-name>/` so it is tracked by git.
- Run `quick_validate.py` and `agent-platform validate-skill` after creating or updating a skill.
- Record trigger examples, forward-test scenarios, and improvement ideas for created or updated skills.
- If a skill must be active in Codex, install or copy it into `$CODEX_HOME/skills` only after confirming the target path and permissions.
- For new tools, prefer `_tools/<tool-name>/` for shared tools or `project-name/tools/` for project-specific tools.
- Document each reusable tool with its purpose, inputs, outputs, and main command.
- Use `_tools/source-collector/` when many web/search sources need repeated normalization, query ladder generation, bundle coverage checks, or source scoring.
- Use `_ops/workflows/54-human-like-source-discovery.md` and `_ops/prompts/84-human-like-source-discovery.md` when search should behave like careful human research with query expansion, operators, source lanes, snowballing, and selective summary capture.
- Use `agent-platform/configs/usage/ai-usage-gap-profile.json`, `_ops/workflows/59-bridge-ai-usage-gap.md`, and `_ops/prompts/89-bridge-ai-usage-gap.md` when diagnosing weak AI usage, improving task framing, calibrating reliance, adding verification, or promoting repeated AI-use patterns into durable assets.
- Treat LLMs as probabilistic prompt-conditioned systems. Clear questions, neutral framing, explicit context, output contracts, and verification paths are part of the work, not optional wording polish.
- Do not rely on prohibition-only instructions as stable behavior control. When a user instruction or platform rule mainly says what not to do, convert it into positive target behavior, allowed actions, replacement action, examples when useful, and a verification or enforcement gate.
- Use structural guardrails for material risk. For security, privacy, cost, publication, deployment, destructive changes, external tool calls, or file/permission boundaries, select an appropriate input, output, tool, permission, evaluator, test, audit, human checkpoint, or rollback guardrail instead of relying on prompt wording alone.
- Use model-adaptive prompting from `agent-platform/configs/usage/ai-usage-gap-profile.json`: weak/non-reasoning/uncertain models may need two-pass compare/merge loops, while strong reasoning models usually need better task framing and verification before duplicate calls.
- Use `agent-platform/configs/research/source-discovery-registry.json` when broad search origins are needed across global tech blogs, Korean big-tech blogs, India technology sources, paper discovery, and Korean local review channels.
- Use `agent-platform/configs/research/marketing-evidence-profile.json` when marketer-style desk research, theory/book grounding, market sizing, consumer surveys, public statistics, commercial research reports, or quantitative evidence matter.
- Use `_tools/korean-local-review/` when Korean user review, Naver/Kakao Map, Naver Blog/Search, or local-market source quality scoring matters.
- Record `source_value_provenance` and `plan_evidence` for meaningful plans; include `source_provenance_targets` and `plan_evidence_targets` in close-out evaluation.
- Do not create a new skill or tool when a short documented procedure is enough.
- Prefer open-source dependencies and tools when they are mature, maintained, license-compatible, and fit the task.
- When choosing external dependencies for current work, verify their current status and docs instead of relying only on memory.
- When installation is needed, follow `_docs/policies/open-source-installation-policy.ko.md` and verify the installed package or tool with tests, import checks, CLI checks, or smoke tests.
- Preserve reusable research findings with source URLs, access dates, summaries, reliability, and applicability.
- Do not treat repository knowledge-base content as authoritative without checking freshness, source quality, and contradictions.

## Context Management Rules

- When conversation context becomes long, compress stable decisions into `_history/YYYY/YYYY-MM-DD.md` and the relevant project docs.
- Preserve the user's request intent as summaries under `_history/user-requests/YYYY/` so future work can inspect what was asked without relying on chat memory.
- Preserve how requests were resolved under `_history/request-traces/YYYY/` so future work can inspect what was requested, what happened, and where the result lives.
- When context saturation risk appears, proactively create a resume packet under `_history/context-archives/YYYY/` and continue from repository documents rather than chat memory.
- Context archive packets should link must-read files, remaining work, verification state, related web search records, plans, evaluations, and commits.
- If context archiving occurred, include `context_archiving_occurred=true` and `context_archive_targets` in evaluation input.
- When closing meaningful work, update `_history/work-summaries/` with a scan-friendly summary that links to detailed history, plans, evaluations, and key files.
- When closing meaningful work, update or create `_history/work-timings/YYYY/YYYY-MM-DD-<slug>.json` with measured phase durations or explicit partial/unmeasured notes.
- When closing installation work, update `_history/installations/` and `_ops/installations/registry.json` before evaluation, commit, and push.
- Keep the latest project purpose, status, commands, and constraints in that project's `README.md`.
- Preserve only durable information in docs: decisions, requirements, command results worth reusing, and links to artifacts.
- Avoid relying on chat history for project state that future work needs.

## Language Rules

- Write user-facing documentation and history in Korean by default.
- Keep executable prompt bodies in English to reduce token cost.
- For important durable docs, create paired Korean and English files using `name.ko.md` and `name.en.md`.
- When paired Korean and English docs exist, update both in the same change set.
- For document browsers, dashboards, and generated snapshots, use `agent-platform/configs/access/language-mode-registry.json` to keep all-language, Korean-only, and English-only viewing separate from `view_mode`, `work_mode`, `install_mode`, and source-code language filters.
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

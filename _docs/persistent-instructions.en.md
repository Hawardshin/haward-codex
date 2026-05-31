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
- Save summaries of meaningful user requests under `_history/user-requests/YYYY/`, without preserving full original prompt text by default.
- Track work history under `_history/YYYY/YYYY-MM-DD.md`.
- Maintain quick human-readable work summaries under `_history/work-summaries/YYYY/` so completed work is easy to understand later.
- Use `_ops/` as the durable operations hub for prompts, workflows, and maps.
- Track active agents and parallel work in `_ops/coordination/`.
- Capture reusable findings from internet research and external references under `_research/`.
- Keep foundational agent and platform operating philosophy under `_philosophy/`.
- Run web search first for every new user instruction before planning, repository exploration, or file edits.
- Run web search first for every reusable prompt execution under `_ops/prompts/`.
- Save meaningful web search records under `_history/web-searches/YYYY/` and include `web_search_record_targets` in work evaluation input.
- Record public search reasoning summaries in text: queries, sources checked, weak sources ignored, insights applied, and uncertainty. Do not store raw internal chain-of-thought.
- If web search is irrelevant or unavailable, record that and continue with stronger local verification.
- After web search and before local planning, run `memory-bootstrap-agent` to check required memory anchors and read hot context.
- When durable rules, source configs, prompts, workflows, project boundaries, or evaluation loops change, update `agent-platform/configs/memory/bootstrap-manifest.json`.
- For research or planning work, collect broad high-authority sources, including official docs, papers, open-source repos, international tech blogs, analysis articles, community/social signals, and contrary examples.
- Treat likes, shares, comments, GitHub stars, Hacker News points, Reddit activity, and LinkedIn reactions as adoption signals, not standalone proof.
- Use `_tools/source-collector/` when broad source collection becomes repetitive or source bundles need scoring/reporting.
- Treat knowledge-base content as fallible and validate it with `knowledge-skeptic-agent` before relying on it.
- For important plans, do not rely only on the model's internal guess; use web search plus another search channel to derive insights before planning.
- Treat `research-insight-planner-agent` as a core research agent and Perplexity-style answer engine.
- General research plans must record `agent-platform/configs/research/research-agent-profile.json` in `research_profile_paths` and include `answer_engine_stages` plus `citation_requirements`.
- The research agent moves through `query_understanding`, `search_retrieval`, `source_ranking`, `evidence_extraction`, `synthesis`, `citation_grounding`, and `skeptic_review`.
- Rank sources before synthesis and treat citations as verification handles, not proof.
- Work that uses `research-insight-planner-agent` should set `plan_history_targets` and record plan changes.
- Before implementing after coding/API/library/architecture/performance/debugging/security/migration research, use `coding-research-agent` to check sources, options, recommendation, risks, validation plan, and standard post-research questions.
- Coding research must record `source_types` and use at least three distinct non-`other` source types.
- Coding research must record `reference_config_paths` showing which source registry or research profile config was used.
- Source-code-writing agents must inspect relevant open-source repositories, reference implementations, or well-structured code and tests before implementation, then record `code_reference_sources` and `code_reference_notes`.
- Shared settings files must include `reader_guide`, `reference_links`, `structure_rules`, and `field_guide` so the user can understand references and structural rules by opening one file.
- When creating or changing important shared settings files, run `config-contract-agent` to check the self-documenting contract.
- Use `hallucination-guard-agent` before publishing final outputs that contain factual claims.
- Unsupported factual claims must be verified, removed, or explicitly caveated as uncertainty.
- Compress long conversation context into repository docs and history logs.
- When context saturation risk appears, proactively create a context archive packet under `_history/context-archives/YYYY/` and resume future work from repository documents.
- Context archive packets must link must-read files, remaining tasks, verification state, related web search records, plan records, evaluation reports, and commits.
- If context archiving occurred, include `context_archiving_occurred=true` and `context_archive_targets` in work evaluation input.
- Promote repeated workflows into templates, tools, skills, prompts, or workflows when useful.
- Keep repository and prompt maps current when navigational structure changes.
- Use `work-evaluator-agent` as the default close-out evaluator.
- Include `user_request_summary_targets` in work evaluation input for meaningful work.
- Include `work_summary_targets` in work evaluation input for meaningful work.
- Prefer Python for agent implementations, orchestration, backend automation, evaluation, and reusable local tools.
- Use mature, maintained, license-compatible open-source tools and libraries when they fit the task.
- When a mature open-source tool or library fits the task, do not avoid installation by default; install it in the owning project or tool scope when needed.
- Before installing open source, record installation scope, exact install command, dependency record path, security review, license review, verification method, and rollback plan.
- For actual installs, upgrades, removals, or global environment changes, create an installation audit record under `_history/installations/YYYY/` and index it in `_ops/installations/registry.json`.
- When installation occurred, include `installation_occurred=true` and `installation_record_targets` in the work evaluation input.
- Avoid global installs; if one is necessary, document the reason and removal path, then request any required permission.
- Document useful internet research with source URLs, access dates, summaries, reliability, and applicability.
- Consider HTML artifacts when browser rendering, visual hierarchy, dashboards, or interactive review are useful.
- Use Korean for user-facing docs and history by default.
- Use English for executable prompt bodies.
- Create paired Korean and English docs for important durable policies, workflows, and project explanations.

## Maintenance Rule

When the user gives an instruction that should affect future work, update this file, the Korean companion document, and any directly relevant operational document in the same change set.

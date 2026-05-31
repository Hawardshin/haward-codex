# Coding Research Agent

`coding-research-agent` checks whether coding-focused research is complete before it becomes implementation work. It supports API documentation, library selection, bug root cause, architecture, performance, security, migration, testing strategy, open-source evaluation, and implementation-pattern research.

## Purpose

- Start every coding research task with web search.
- Pair web search with at least one other channel: repository search, official docs, code search, package registry, papers, or open-source repositories.
- Answer standard close-out questions before implementation starts.
- Record diverse source types. At least three non-`other` source types are required, including authoritative evidence and practical or adoption signals.
- Record which source configuration files were used through `reference_config_paths`.
- Record material source values, config values, versions, benchmarks, risks, claims, and assumptions in `source_value_provenance`.
- Connect recommendations, architecture choices, file scope, and validation steps to checked sources or explicit assumptions through `plan_evidence`.
- When technologies have different official docs or standards, such as Java/Spring Boot, C, React, or Next.js, record `technology_stack`, `technology_official_docs`, and `stack_version_constraints` separately.
- Check high-signal issue/discussion sources such as Stack Overflow, Reddit, GitHub Issues/Discussions, and project forums, then record `issue_discussion_sources`, `issue_discussion_notes`, and `community_signal_notes`.
- Before implementation, check best-fit architecture patterns, reference architectures, C4/arc42/SEI/ADR-style architecture documentation, and strong project architecture examples.
- Compare at least two architecture options and record `architecture_reference_sources`, `architecture_options`, and `architecture_decision_notes`.
- Before implementation, inspect relevant open-source repositories, reference implementations, or well-structured code and tests, then record `code_reference_sources` and `code_reference_notes`.
- If open-source installation is needed, record installation scope, install command, dependency record file, installation audit record, security/license review, verification method, and rollback plan.
- Validate internal knowledge-base references with `knowledge-skeptic-agent`.
- Save planning history under `_history/plans/YYYY/` and capture reusable knowledge under `_research/`, `_templates/`, or `_tools/` when appropriate.

## Research Types

- `api_docs`: API, SDK, or framework documentation
- `library_selection`: library or framework choice
- `bug_root_cause`: bug investigation
- `architecture`: structure and boundary decisions
- `performance`: performance bottlenecks and improvements
- `security`: security risks and mitigations
- `migration`: version upgrades or technology moves
- `testing`: testing strategy and validation paths
- `open_source`: open-source candidate evaluation
- `implementation_pattern`: implementation patterns and examples

## Source Type Rules

`complete-coding-research` checks `source_types`. Coding research can return `ready_to_implement` only when these conditions are met.

- Do not leave `source_types` empty.
- Record diverse types such as `official`, `paper`, `standard`, `open_source`, `reference_implementation`, `tech_blog`, `analysis`, `community`, `social`, `contrary`, and `internal`.
- Use at least three distinct non-`other` source types.
- Include at least one authoritative type: `official`, `paper`, `standard`, or `open_source`.
- Include at least one practical, adoption, or contrary signal type: `open_source`, `reference_implementation`, `tech_blog`, `analysis`, `community`, `social`, `news`, or `contrary`.

## Technology Stack And Discussion Signal Rules

Implementation readiness requires:

- `technology_stack`: languages, runtimes, frameworks, major libraries, and relevant standards
- `technology_official_docs`: official docs or standards for each major technology. Examples: Spring Boot uses `docs.spring.io`, React uses `react.dev`, Next.js uses `nextjs.org/docs`, and C uses ISO C or WG14 material
- `stack_version_constraints`: current or target versions, standards, compatibility ranges, or explicit unknowns
- `issue_discussion_sources`: Stack Overflow, Reddit, GitHub Issues/Discussions, project forums, or a none-found search record
- `issue_discussion_notes`: repeated problems, accepted or high-vote answers, stale answers, unresolved debates, and contrary views found in those discussions
- `community_signal_notes`: how votes, likes, reactions, stars, or comments were interpreted and why they are not factual proof

Community signals are useful for discovering problems, adoption, and practical edge cases, but factual decisions must be cross-checked against official docs, standards, papers, or maintained repositories.

## Code Reference Rules

Before implementation, record:

- `architecture_reference_sources`: well-architected frameworks, reference architectures, C4/arc42/SEI material, ADRs, or project `docs/architecture` examples
- `architecture_options`: at least two architecture or pattern candidates compared
- `architecture_decision_notes`: selected structure, rejected alternatives, module/service boundaries, quality attributes, trade-offs, and validation impact
- `code_reference_sources`: GitHub/GitLab repositories, source trees, source files, test files, example apps, or code search results inspected
- `code_reference_notes`: what the referenced code taught about structure, module boundaries, API usage, error handling, tests, and what should not be reused

Architecture references are not blueprints to copy directly. Compare them against the current project scope, data flow, change profile, security needs, operational complexity, and testability before selecting a structure.

Do not copy open-source code blindly. Check license, maintenance state, fit, security risk, and test quality before adapting ideas locally.

When open-source installation is needed, follow [_docs/open-source-installation-policy.en.md](../../_docs/open-source-installation-policy.en.md) and [_ops/workflows/58-installation-record.md](../../_ops/workflows/58-installation-record.md). If installation actually occurs, update `_history/installations/YYYY/` and `_ops/installations/registry.json`.

## Reference Config Files

Research input must include `reference_config_paths`. At least one path must point to a JSON file under `agent-platform/configs/research/`.

The default configs are:

- `agent-platform/configs/research/source-registry.json`: source types and reusable reference catalog
- `agent-platform/configs/research/source-discovery-registry.json`: global, Korean, India, paper, and Korean local review search origins
- `agent-platform/configs/research/coding-research-profile.json`: default coding research coverage profile

## Post-Research Questions

Research is not complete until every question is answered.

| ID | Question |
| --- | --- |
| `what_was_verified` | What exactly was verified? |
| `best_option` | What is the best option now? |
| `why_this_option` | Why is this option better than the alternatives? |
| `alternatives_rejected` | Which alternatives were rejected, and why? |
| `implementation_impact` | What files, modules, APIs, or workflows will change? |
| `risks_and_unknowns` | What remains risky, unknown, stale, or assumption-dependent? |
| `validation_plan` | How will the implementation be validated? |
| `reusable_knowledge` | What should be captured for future work? |
| `next_action` | What is the next concrete action? |

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json
```

Proceed to implementation only when the status is `ready_to_implement`. If the status is `more_research_required`, resolve the listed `gaps` and run the command again.

## Related Files

- Agent config: `agent-platform/configs/agents/coding-research-agent.json`
- Input template: `agent-platform/configs/planning/coding-research-template.json`
- Research configs: `agent-platform/configs/research/`
- Python implementation: `agent-platform/src/agent_platform/planning/coding_research.py`
- Operations prompt: `_ops/prompts/86-coding-research.md`
- Operations workflow: `_ops/workflows/56-coding-research.md`

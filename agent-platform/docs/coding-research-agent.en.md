# Coding Research Agent

`coding-research-agent` checks whether coding-focused research is complete before it becomes implementation work. It supports API documentation, library selection, bug root cause, architecture, performance, security, migration, testing strategy, open-source evaluation, and implementation-pattern research.

## Purpose

- Start every coding research task with web search.
- Pair web search with at least one other channel: repository search, official docs, code search, package registry, papers, or open-source repositories.
- Answer standard close-out questions before implementation starts.
- Record diverse source types. At least three non-`other` source types are required, including authoritative evidence and practical or adoption signals.
- Record which source configuration files were used through `reference_config_paths`.
- Before implementation, inspect relevant open-source repositories, reference implementations, or well-structured code and tests, then record `code_reference_sources` and `code_reference_notes`.
- If open-source installation is needed, record installation scope, install command, dependency record file, security/license review, verification method, and rollback plan.
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

## Code Reference Rules

Before implementation, record:

- `code_reference_sources`: GitHub/GitLab repositories, source trees, source files, test files, example apps, or code search results inspected
- `code_reference_notes`: what the referenced code taught about structure, module boundaries, API usage, error handling, tests, and what should not be reused

Do not copy open-source code blindly. Check license, maintenance state, fit, security risk, and test quality before adapting ideas locally.

When open-source installation is needed, follow [_docs/open-source-installation-policy.en.md](../../_docs/open-source-installation-policy.en.md).

## Reference Config Files

Research input must include `reference_config_paths`. At least one path must point to a JSON file under `agent-platform/configs/research/`.

The default configs are:

- `agent-platform/configs/research/source-registry.json`: source types and reusable reference catalog
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

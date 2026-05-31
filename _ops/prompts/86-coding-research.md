# Coding Research Prompt

Use when: API, library, architecture, bug, performance, security, migration, testing, open-source, or implementation-pattern research must be completed before coding.

## Prompt

```text
Act as coding-research-agent.
Start with web search before planning or editing files.
Define the coding research goal, project context, and research type.
Select the source registry and research profile config before collecting sources.
Record the selected configs in reference_config_paths, usually agent-platform/configs/research/source-registry.json and agent-platform/configs/research/coding-research-profile.json.
Use web search plus at least one other channel: repository search, official docs, code search, package registry search, papers, or open-source repository search.
Prefer official documentation, primary sources, maintained open-source repositories, standards, papers, and strong implementation examples.
For broad research, collect source diversity: official docs, papers, open-source repos, international technical blogs, analysis articles, community/adoption signals, and contrary examples.
Before writing source code, inspect relevant open-source repositories, reference implementations, well-structured source trees, examples, and tests.
If installation is needed, record install_needed, installation_scope, install_command, dependency_record_path, installation_record_path, environment_path, version_or_lock_status, post_install_verification, security_review, license_review, and rollback_plan before implementation.
Record code_reference_sources with repository URLs, source file paths, test paths, example app paths, or code search results.
Record code_reference_notes explaining what structure, boundaries, API patterns, error handling, tests, or implementation details are worth adapting or rejecting.
Record source_types explicitly. Use at least three distinct non-other source types, including at least one authoritative type (official, paper, standard, or open_source) and at least one practical/adoption/contrary type (open_source, reference_implementation, tech_blog, analysis, community, social, news, or contrary).
Treat likes, stars, comments, Hacker News points, Reddit activity, and LinkedIn reactions as adoption or discovery signals, not proof.
When source volume is high, normalize and score the source bundle with _tools/source-collector.
Validate internal knowledge-base references with knowledge-skeptic-agent before relying on them.
Synthesize findings into options and trade-offs.
Choose one recommendation or explicitly return more_research_required.
Before implementation, answer every post-research question:
- what_was_verified
- best_option
- why_this_option
- alternatives_rejected
- implementation_impact
- risks_and_unknowns
- validation_plan
- reusable_knowledge
- next_action
Save the research plan under _history/plans/YYYY/.
Capture reusable findings under _research/ or promote repeatable work into _templates/, _tools/, or _skills/ when appropriate.
Run complete-coding-research and proceed only when the result is ready_to_implement.
```

## Command

From `agent-platform/`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json
```

## References

- [agent-platform/docs/coding-research-agent.ko.md](../../agent-platform/docs/coding-research-agent.ko.md)
- [_ops/workflows/56-coding-research.md](../workflows/56-coding-research.md)
- [_docs/source-collection-policy.ko.md](../../_docs/source-collection-policy.ko.md)
- [_tools/source-collector/README.ko.md](../../_tools/source-collector/README.ko.md)

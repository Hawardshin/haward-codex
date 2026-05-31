# Spec: Enterprise Source Registry

## Purpose

Manage large-company engineering blogs, official research labs, architecture centers, and high-signal independent sites separately from the general source taxonomy.

## Requirement Links

- `UR-2026-05-31-040`
- `REQ-WS-016`

## Scope

- Create `agent-platform/configs/research/enterprise-source-registry.json`
- Create `_research/source-lists/enterprise-high-quality-sites.*.md`
- Link the registry from source collection policy, research config README, research/coding workflows, prompts, and memory bootstrap
- Update history, request summary, request trace, and evaluation files

## Out Of Scope

- Complete crawling of all high-quality sites
- RSS automation for each site
- Treating the list itself as factual verification for specific claims

## Success Criteria

- The separate registry passes the self-documenting config contract.
- The human-readable source list exists.
- Future research/coding work can record the registry in `research_profile_paths` or `reference_config_paths`.
- Memory bootstrap can discover the registry.

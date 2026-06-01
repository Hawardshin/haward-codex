# Spec: Source Discovery Expansion

## Background

The user asked to collect more source origins across global technology blogs, Korean big-tech engineering blogs, Indian technology sources and famous people/blogs, and paper-discovery sources for finding well-known papers. Existing `REQ-WS-018` already requires broad source discovery, so this work expands concrete seed coverage instead of creating a new requirement.

## Related Requirements

- `REQ-WS-003`: every new instruction starts with web search.
- `REQ-WS-016`: enterprise/high-quality sources are managed in a separate registry.
- `REQ-WS-017`: source values and plan evidence are linked to provenance.
- `REQ-WS-018`: web research uses broad global tech blogs, Korean big-tech blogs, India technology sources, and paper-discovery origins.

## Scope

- Expand global, Korean, India, India people/expert, and paper-discovery source groups in `source-discovery-registry.json`.
- Add more global high-signal engineering seeds to `enterprise-source-registry.json`.
- Update the human-readable `_research/source-lists/enterprise-high-quality-sites.*.md` summaries.
- Add regional/person/paper usage rules to the research config README.
- Save the evidence, uncertainty, and evaluation records for this research expansion.

## Acceptance Criteria

- Expanded JSON configs pass JSON syntax validation and `check-config-contract`.
- New sources have exact URL, intended use, and evidence role.
- Individual, YouTube, and community signals are separated from primary proof as expert/context or adoption signals.
- Paper origins support graph indexes, publisher/venue indexes, preprints, and code/adoption signals.
- Korean/English summaries and a work evaluation are preserved.

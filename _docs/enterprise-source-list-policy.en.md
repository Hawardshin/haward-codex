# Enterprise And High-Quality Source List Policy

## Purpose

Large-company engineering blogs, official research labs, architecture centers, and high-signal independent sources are managed separately from the general source taxonomy. This reduces repeated discovery work while preventing the curated list itself from being treated as proof.

## Managed Locations

- Machine-readable list: `agent-platform/configs/research/enterprise-source-registry.json`
- Human-readable summary: `_research/source-lists/enterprise-high-quality-sites.en.md`
- Related source policy: `_docs/source-collection-policy.en.md`

## Operating Rules

- For research or coding work that needs enterprise/high-quality sources, check `enterprise-source-registry.json` first.
- The list is a starting point, not proof. Re-open and verify the exact page before using it in an answer, plan, or implementation decision.
- Prefer official docs, official research labs, official engineering blogs, and architecture centers.
- Treat SEO lists, aggregators, and community recommendations as discovery signals only; do not promote them directly.
- When adding a site, record `use_for`, `caveats`, `last_checked`, and `quality_tier`.
- Demote or remove sources that become stale, inaccessible, mostly marketing, or low signal.

## Categories

- `architecture_center`: reference architecture and architecture frameworks from AWS, Azure, Google Cloud, and similar sources
- `enterprise_engineering`: field-tested engineering blogs from Meta, Netflix, Uber, Stripe, GitHub, Cloudflare, and similar companies
- `research_lab`: official research labs such as Google Research, DeepMind, Microsoft Research, OpenAI, and Anthropic
- `high_signal_independent`: high-quality context sources such as Martin Fowler, ACM Queue, Thoughtworks, and InfoQ

## Verification Criteria

- Does the source have an official or clearly identifiable publisher?
- Does it contain technical depth, architecture, operations, or validation detail?
- Is it relevant to the current task?
- Is the date current enough for the decision?
- Are vendor, domain, and scale biases understood?

## Caveat

Large-company sources are high signal, but their scale and organization assumptions may not fit smaller projects. Adapt the principle, not the complexity.

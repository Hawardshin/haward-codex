# Human-Like Search Query Plan: human-like web search source discovery

- Depth: `deep`

## Query Ladder

### `seed_understanding`

- Goal: Find the official vocabulary, product names, aliases, and first-party statements.

| Query |
| --- |
| human-like web search source discovery official documentation |
| human-like web search source discovery official blog release notes |
| human-like web search source discovery overview terminology glossary |

### `synonym_and_intent_expansion`

- Goal: Search adjacent wording so the result set is not trapped by one phrase.

| Query |
| --- |
| human-like web search source discovery alternatives OR comparison OR landscape |
| human-like web search source discovery best practices OR guide OR checklist |
| human-like web search source discovery case study OR architecture OR implementation |

### `operator_precision`

- Goal: Use exact-match, site, filetype, title, and exclusion operators to force narrower result sets.

| Query |
| --- |
| "human-like web search source discovery" filetype:pdf |
| "human-like web search source discovery" site:github.com |
| "human-like web search source discovery" site:stackoverflow.com OR site:reddit.com |
| intitle:"human-like web search source discovery" guide OR playbook |
| "human-like web search source discovery" -sponsored -advertisement |

### `authority_lanes`

- Goal: Search source families that can support claims rather than only discover ideas.

| Query |
| --- |
| human-like web search source discovery standard RFC specification |
| human-like web search source discovery arxiv OR ACM OR IEEE OR paper |
| human-like web search source discovery dataset benchmark survey |
| human-like web search source discovery government official statistics methodology |

### `field_practice_lanes`

- Goal: Find high-quality implementation, operations, and practitioner evidence.

| Query |
| --- |
| human-like web search source discovery engineering blog case study |
| human-like web search source discovery incident postmortem reliability lessons |
| human-like web search source discovery GitHub implementation tests examples |
| human-like web search source discovery migration lessons learned |

### `community_and_adoption_signals`

- Goal: Find repeated pain points, votes, discussion intensity, and adoption signals without treating them as proof.

| Query |
| --- |
| human-like web search source discovery Stack Overflow accepted answer votes |
| human-like web search source discovery Reddit discussion limitations |
| human-like web search source discovery Hacker News discussion |
| human-like web search source discovery GitHub issues discussions |

### `contrary_and_failure_search`

- Goal: Actively search for disagreement, failed attempts, stale guidance, and hidden costs.

| Query |
| --- |
| human-like web search source discovery limitations failure case |
| human-like web search source discovery criticism drawbacks risks |
| human-like web search source discovery not recommended anti pattern |
| human-like web search source discovery deprecated security issue |

## Snowballing

- Pick the best 3 to 5 seed sources after initial triage.
- Open their references, cited-by links, related papers, GitHub repositories, author pages, and linked talks.
- Run one backward pass from references and one forward pass from citations, issues, or later articles.
- Record which snowball links were followed and which were ignored as stale, weak, promotional, or off-topic.

## Summary Capture

- Summarize only sources that change the answer, plan, risk model, or reusable knowledge base.
- For each summarized source, record URL, access date, source type, key claim, reliability, signal strength, limitation, and plan impact.
- Keep community and social metrics as adoption or discovery signals, never as standalone proof.
- Record unsupported or contradictory claims before synthesis.

## Stop Rules

- Stop early for quick tasks when official/current facts and local verification are sufficient.
- Continue for research/governance tasks until authority, field practice, community signal, and contrary lanes are represented or explicitly unavailable.
- For exhaustive research, add another iteration when new high-quality sources keep changing the conclusion.

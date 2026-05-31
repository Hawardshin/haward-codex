# Web-First Work Policy

## Purpose

Every new user instruction in this repository starts with web search before planning, repository exploration, implementation, or evaluation.

This policy is stronger than the earlier rule that required search only for important plans or external facts. Even for simple local tasks, begin with a lightweight web search to check current context, official references, strong examples, or contrary signals.

## Core Rules

- Run web search first for every new user instruction.
- After web search, continue with repository search, official docs, project READMEs, history, and code inspection.
- If search results are irrelevant, record that no relevant web evidence was found and proceed with local evidence.
- Save only reusable search findings under `_research/`.
- For research or planning work, follow [_docs/source-collection-policy.en.md](source-collection-policy.en.md) to collect official sources, papers, international tech blogs, open-source references, analysis articles, and community or social signals.
- Current information, external facts, products, libraries, laws, prices, schedules, and policies require source-backed verification.
- Do not use search result titles as evidence. Open the source when the content matters.
- If web search fails, record the failure and strengthen local verification when the task can still proceed safely.

## Start Sequence

1. Summarize the user instruction in one sentence.
2. Run web search with relevant keywords.
3. Check official docs, strong references, freshness signals, and contrary signals.
4. Decide whether the search result changes the plan.
5. Check repository state and project ownership.
6. Use `research-insight-planner-agent` and `agent-platform/configs/research/research-agent-profile.json` when search results should be structured into answer-engine stages, insights, and a plan.
7. Implement or document the work.
8. Ground factual final claims with `hallucination-guard-agent`.
9. Record search, reference, and grounding results in the evaluation report.

## Search Depth

| Task Type | Minimum Search |
| --- | --- |
| Simple local task | One lightweight web search; use local verification if results are irrelevant |
| Docs, policy, or operating rules | Web search plus repository search and strong references |
| Code, library, or open-source work | Web search plus official docs, package, or repository checks |
| Current information or external facts | Web search plus source review and access date |
| High-risk judgment | Web search plus at least two independent sources and grounding/evaluation |

## Exception Handling

- If the user explicitly forbids web search, follow that newer instruction and record that search was skipped.
- If network or tooling fails, record the failure and perform available local verification.
- Do not put sensitive information directly into web search queries. Generalize the query.

## Related Files

- [_ops/workflows/05-web-first-intake.md](../_ops/workflows/05-web-first-intake.md)
- [_ops/prompts/05-web-first-intake.md](../_ops/prompts/05-web-first-intake.md)
- [_docs/source-collection-policy.en.md](source-collection-policy.en.md)
- [_docs/search-insight-planning-policy.en.md](search-insight-planning-policy.en.md)
- [_docs/hallucination-prevention-policy.en.md](hallucination-prevention-policy.en.md)
- [_research/topics/agent-planning/2026-05-31-web-first-work-policy.en.md](../_research/topics/agent-planning/2026-05-31-web-first-work-policy.en.md)

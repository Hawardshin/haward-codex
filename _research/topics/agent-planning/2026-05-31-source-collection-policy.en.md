# Source Collection Policy Research

## Research Purpose

Record evidence for collecting many high-authority sources, international tech blogs, analysis articles, papers, LinkedIn/community signals, and popularity signals during web search.

## Access Date

- 2026-05-31

## Sources

| Source | URL | Notes |
| --- | --- | --- |
| Harvard Guide to Using Sources: Evaluating Web Sources | https://usingsources.fas.harvard.edu/evaluating-web-sources-0 | Criteria for credibility, authority, accuracy, corroboration, currency |
| Google Search Central: E-E-A-T update | https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t | Experience, expertise, authoritativeness, and trustworthiness |
| Google Search Central: Creating helpful, reliable, people-first content | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | Questions about sourcing, expertise, author/site background, and trust |
| Guidelines for including grey literature and conducting multivocal literature reviews in software engineering | https://arxiv.org/abs/1707.02553 | Evidence for including blogs, white papers, and webpages alongside formal literature in software engineering |
| OpenAI Academy: Web search | https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/ | Need to review linked sources for current information |

## Summary

- Web sources need credibility checks because anyone can publish them.
- Google's E-E-A-T framing points to experience, expertise, authority, and trust.
- In software engineering, formal literature alone can miss current practitioner knowledge; grey literature and multivocal reviews help fill that gap.
- Tech blogs, white papers, and webpages add practical context but require quality assessment.
- Likes, shares, comments, stars, and LinkedIn reactions are adoption or attention signals, not direct proof of factual truth.

## Insights

- Search should collect both formal literature and grey literature, not only official docs.
- Record source types by role: factual grounding, methodology, implementation state, field adoption, popularity signal, and contrary signal.
- International tech blogs and field examples are important for current practice.
- Social reactions and likes are best used as discovery signals for what deserves more investigation.

## Plan Impact

- Add `_docs/source-collection-policy.*.md`.
- Update web-first intake and research-insight planning workflows with broad source bundle guidance.
- Add source collection rules to persistent instructions and workspace rules.

## Reliability Judgment

- The policy is well supported by Harvard/Google source-evaluation guidance and software engineering MLR research.
- Social signals are platform-biased and should remain weak evidence.

## Uncertainty And Contrary Signals

- More sources do not guarantee a better conclusion; source quality and independence matter more.
- Social popularity can reflect marketing, network effects, or community bias.
- Some good sources may be behind paywalls or closed communities.

## Applicability

- Applies to research, technical choices, architecture planning, open-source evaluation, and market/case research.
- Simple local file edits need only lightweight web-first intake, not a full source bundle.

## Related Work

- `_docs/policies/source-collection-policy.en.md`
- `_ops/workflows/05-web-first-intake.md`
- `_ops/workflows/55-research-insight-planning.md`

## Next Checks

- Add a source-quality evaluator to `agent-platform` if source scoring becomes repetitive.

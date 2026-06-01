# Coding Research Agent References

## Purpose

This note records references for closing coding research with implementation-ready options, risks, validation steps, and next actions instead of leaving research as raw search results.

## Access Date

- 2026-05-31

## Sources Checked

| Source | Type | Key Point | Application |
| --- | --- | --- | --- |
| Thoughtworks Technology Radar FAQ: https://www.thoughtworks.com/en-us/radar/faq | technology evaluation framework | The Radar groups technologies into quadrants and rings such as Adopt, Trial, Assess, and Caution. | Coding research should separate recommendation confidence from raw discovery. |
| ADR GitHub Organization: https://adr.github.io/ | architecture decision records | ADRs preserve a decision, rationale, trade-offs, and consequences in a decision log. | Post-research questions include `why_this_option`, `alternatives_rejected`, and `implementation_impact`. |
| GitHub Docs, Configuring issue templates: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository | structured input templates | Issue forms help request specific structured information. | Coding research input is schema-driven through fields such as `post_research_answers`. |
| GitHub Docs, Syntax for issue forms: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms | structured form schema | Form syntax supports fields and validations. | `complete-coding-research` treats missing required questions as gaps. |
| Guidelines for including grey literature and conducting multivocal literature reviews in software engineering: https://doi.org/10.1016/j.infsof.2018.09.006 | software engineering multivocal review | Software engineering MLRs combine formal literature with grey literature such as blogs and white papers. | Coding research should require explicit `source_types` and diverse source coverage. |
| CMU SEI Digital Library: https://www.sei.cmu.edu/library/ | software engineering research and practice library | The library includes technical reports, white papers, presentations, and other publication types. | Coding research should use varied source types instead of a single channel. |
| Internal policy: `_docs/policies/source-collection-policy.en.md` | repository policy | Source collection should include official, paper, open-source, technical blog, community/social, and contrary examples when useful. | Coding research separates evidence from adoption signals. |
| Internal policy: `_docs/policies/search-insight-planning-policy.en.md` | repository policy | Search results should become decision-relevant insights and saved plan history. | Coding research stores planning process under `_history/plans/YYYY/`. |

## Insights

- Technical research should not stop at discovery. It should separate maturity, evidence, contrary signals, and project fit.
- ADR decision records map well to coding research close-out because they preserve decision rationale and rejected alternatives.
- Structured fields and validation reduce repeated manual checklist work.
- Software engineering MLR practice supports combining formal and grey literature, so coding research should record `source_types` and enforce source diversity as a readiness condition.
- Internal knowledge-base content remains fallible, so `knowledge-skeptic-agent` validation should be recorded before reliance.

## Resulting Application

- `coding-research-agent` is implemented through the `complete-coding-research` CLI.
- Nine standard post-research questions are required.
- `source_types` are now required, with at least three distinct non-`other` source types.
- Korean and English coding research report templates were added.
- Operations prompt and workflow entries were linked under `_ops/`.

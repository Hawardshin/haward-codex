# Web Search Record: Deep Research Agent

## Overview

- Date: 2026-06-01
- User request summary: create a deep research agent that searches in specific situations, gathers material through multiple deep steps, and writes highly detailed reports.
- Work mode: `standard`

## Queries

- `deep research agent methodology multi-step web research citations report writing official documentation`
- `Perplexity style answer engine research agent source ranking evidence synthesis citations`
- `OpenAI deep research agent report citations methodology official`
- `research agent evaluation source quality citation grounding report generation`
- `LangChain deep agents deep research GitHub open source`
- `OpenAI Agents SDK deep research example GitHub open source`
- `deep research agent open source report citations GitHub`
- `exa research API documentation multi-step grounded reports citations`

## Sources Checked

| Source | URL | Type | What Was Checked |
| --- | --- | --- | --- |
| OpenAI API Deep Research | https://developers.openai.com/api/docs/guides/deep-research | official | Confirmed the design direction of using tools such as web search, MCP, and file search to find, analyze, and synthesize many sources into comprehensive analyst-style reports. |
| OpenAI Help Center Deep Research | https://help.openai.com/articles/10500283 | official | Confirmed the flow where a user defines the outcome and allowed sources, reviews a proposed plan, can intervene during progress, and receives a structured report with citations/source links. |
| Exa Research API docs | https://exa.ai/docs/reference/exa-research | official | Confirmed a multi-step async pipeline of planning, searching, and reasoning/synthesis; instructions should specify what to find, how to find it, and how to compose the report. |
| LangChain Deep Agents deep research docs | https://docs.langchain.com/oss/python/deepagents/deep-research | official/open-source docs | Confirmed todo-based planning, isolated sub-agent research, assessment of search results, next-step planning, and final report synthesis with citations. |
| langchain-ai/open_deep_research | https://github.com/langchain-ai/open_deep_research | open_source | Checked supervisor-researcher, parallel processing, and MCP support patterns for multi-agent research. |
| Cited but Not Verified paper | https://arxiv.org/abs/2605.06635 | paper | Confirmed the risk that cited reports may still have unverifiable or unsupported citations unless accessibility, relevance, and factual consistency are audited. |
| ReportBench paper | https://arxiv.org/abs/2508.15804 | paper | Confirmed report evaluation patterns that extract citations and statements, check faithfulness against original sources, and validate non-cited claims. |

## Insights Used In The Plan

- `deep-research-agent` should not replace `research-insight-planner-agent`. The existing agent validates planning readiness; the new agent validates deep research packages and report-writing readiness.
- Report quality should be judged by query decomposition, iterative retrieval, source quality review, contradiction mapping, citation audit, and skeptic review, not by search count alone.
- Citations are verification handles, not proof. The agent needs `citation_audit_notes` and `unsupported_or_weak_claims`.
- Long-form reports need durable intermediate artifacts and source bundles, so `report_targets`, `evidence_items`, `source_value_provenance`, and `report_outline` should be required.

## Weak Or Ignored Sources

- Wikipedia and generic SEO/marketing articles were treated only as discovery or terminology sources.
- Reddit examples were useful for user pain and implementation discovery, not as standalone factual evidence.
- Vendor-specific model details, prices, and performance numbers were not made durable requirements because they change quickly.

## Public Decision Summary

Add `deep-research-agent` as a separate agent. The first implementation should not be a full crawler; it should be a Python readiness agent that validates whether a human or agent-produced deep research package is ready for report writing or publication. This fits the current platform's document-driven operation, source provenance, hallucination guard, and work evaluator.

## Related Artifacts

- Requirement: `REQ-WS-040`
- Spec: `_specs/workspace-platform/2026-06-01-deep-research-agent/`
- Config: `agent-platform/configs/research/deep-research-profile.json`
- Agent: `agent-platform/configs/agents/deep-research-agent.json`

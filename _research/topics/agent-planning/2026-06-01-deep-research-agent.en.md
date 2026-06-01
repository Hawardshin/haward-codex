# Deep Research Agent Research Note

## Summary

A deep research agent is not a simple search summarizer. It creates a report-ready research package through planning, question decomposition, iterative retrieval, source ranking, evidence extraction, contradiction mapping, synthesis, citation audit, skeptic review, and report writing.

## Core Evidence

- OpenAI API Deep Research presents a model for finding, analyzing, and synthesizing many sources into comprehensive reports for complex research tasks.
- Exa Research API presents an async multi-step pipeline of planning, searching, and reasoning/synthesis.
- LangChain Deep Agents deep research examples emphasize todo planning, sub-agent research, search result assessment, and final synthesis with citations.
- `langchain-ai/open_deep_research` shows supervisor-researcher, parallel processing, and MCP support patterns.
- Cited but Not Verified and ReportBench-style research show that citations can exist while source support remains weak, so citation audit and unsupported-claim checks are required.

## Design Implications

- Keep it separate from `research-insight-planner-agent`.
- `deep-research-agent` validates report-writing readiness.
- Mandatory stages should include query decomposition, source strategy, iterative retrieval, source quality review, evidence extraction, contradiction mapping, synthesis, report-writing plan, citation audit, and skeptic review.
- Long-form report artifacts should include `report_outline`, `report_targets`, `evidence_items`, and `source_value_provenance`.

## Remaining Improvements

- Add real search API/browser/MCP integration in a later change.
- Tune source-count and evidence-item thresholds after several real reports accumulate.


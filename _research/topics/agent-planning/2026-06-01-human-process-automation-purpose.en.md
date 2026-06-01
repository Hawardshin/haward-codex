# Research Note: Human-Process Automation Purpose

## Summary

The platform's purpose is not to maximize the amount of automation. Its purpose is to reduce repetitive human work and elapsed time. A good automation candidate is repeated, observable, expressible as a reproducible procedure, verifiable, and rollbackable.

## Key Insights

- Google SRE's toil concept shows that repeated, automatable manual work can consume team capacity over time.
- The SRE workbook provides a practical approach: quantify repeated work and improve it through small proofs of concept when needed.
- IBM LiveAction suggests users may not recognize their own repetitive behavior, so automation candidates should be found by observing real task traces and procedures.
- RPA and process/task mining materials provide a model for turning real human workflow into bottleneck discovery and automation opportunities.

## Platform Application Principles

- When repetition appears, first write down the human sequence.
- Judge automation candidates by frequency, elapsed time, error risk, reproducibility, verifiability, and rollbackability.
- Start with the smallest useful asset: prompt, workflow, template, tool, skill, agent, or project feature.
- Automation must not hide human judgment. Judgment points should be explicit, with validation results and user checkpoints when appropriate.
- Confirm actual effect over time using `_history/work-timings/` and evaluator results.

## Reuse Value

Use this note whenever deciding whether a new tool, skill, or agent is worth creating. The key question is not whether the feature is impressive, but whether it reduces repetition and time.

## Sources

- https://sre.google/sre-book/eliminating-toil/
- https://sre.google/workbook/eliminating-toil/
- https://research.ibm.com/publications/liveaction-automating-web-task-model-generation
- https://www.ibm.com/think/topics/rpa
- https://learn.microsoft.com/en-us/power-automate/process-advisor-overview

# Readable Work Summary Structure

## Purpose

This research note captures references used to design a summary layer that lets the user understand completed work later without rereading the full conversation.

## Sources Checked

| Source | Type | Checked | Used For |
| --- | --- | --- | --- |
| [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | documentation practice | 2026-05-31 | Reinforced that human-readable notable changes should not be dumped raw from git logs. |
| [Architectural Decision Records](https://adr.github.io/) | decision records | 2026-05-31 | Reinforced that recording a decision, rationale, trade-offs, and consequences preserves intent over time. |
| [Microsoft Learn: Maintain an architecture decision record](https://learn.microsoft.com/da-dk/azure/well-architected/architect-role/architecture-decision-record) | official documentation | 2026-05-31 | Reinforced keeping decision records in an open single source of truth and treating them as append-only records. |
| [Diataxis](https://diataxis.fr/) | documentation information architecture | 2026-05-31 | Reinforced organizing documentation around user needs instead of a single undifferentiated document pile. |

## Applied Insights

- `git log` is a factual history; a user-readable work summary should be a separate layer.
- A daily summary should route to detailed history, plans, evaluations, and commits.
- Work summaries should stay compact: user intent, result, key locations, and verification/evaluation links.
- Deeper reasoning belongs in plan history and evaluation reports.
- A browser-readable HTML index is useful for quick review.

## Repository Rule Added

- `_history/work-summaries/` is the quick work-summary layer.
- `_history/YYYY/YYYY-MM-DD.md` remains the detailed daily work log.
- `_history/plans/YYYY/` and `_history/evaluations/YYYY/` are linked from summaries.
- `work-evaluator-agent` now accepts `work_summary_targets` so close-out can catch missing summaries.

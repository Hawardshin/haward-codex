# Plan History

This folder stores how agents created plans. Results alone are not enough to explain why a sequence or decision was chosen, so important plans should be recorded before execution.

## File Location

```text
_history/plans/YYYY/YYYY-MM-DD-<slug>.ko.md
_history/plans/YYYY/YYYY-MM-DD-<slug>.en.md
```

Korean is the default. Add an English companion when the plan is important durable context.

## What To Record

- initial request and planning objective
- search questions
- search channels used
- internal and external sources checked
- knowledge-base validation result
- derived insights
- selected plan steps
- rejected or deferred options
- risks and uncertainty
- validation method
- plan change history

## Rules

- Work that uses `research-insight-planner-agent` should set `plan_history_targets`.
- If the plan changes during execution, record the reason in the same file.
- Final evaluation reports should link the related plan history file.

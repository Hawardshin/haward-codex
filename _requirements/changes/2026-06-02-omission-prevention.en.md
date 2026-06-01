# 2026-06-02 Omission Prevention Requirement Change

## Change ID

- Added requirement: `REQ-WS-056`

## Source Request

- `UR-2026-06-02-011`: "Something can be missed."

## Change

The risk that an agent can miss required items is promoted into a shared workspace requirement.

- Non-`quick` work leaves `omission_check_targets`.
- User instructions, requirements, plan items, required artifacts, and acceptance checks are recorded in a coverage record.
- Required `missing` items, unsupported `covered` items, and rationale-free `deferred`/`not_applicable` items require rework before close-out.
- `work-evaluator-agent` treats missing omission-prevention targets as blocking gaps according to the selected mode.

## Impact

- `agent-platform` gains `omission-guard-agent` and a `check-omissions` CLI command.
- Work mode registry and evaluator target policy gain `omission_check_targets`.
- Policies, workflows, prompts, persistent instructions, and memory bootstrap are updated.

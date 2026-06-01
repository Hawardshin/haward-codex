# Requirement Change: Timekeeper Agent

- Date: 2026-06-02
- Change ID: `REQ-WS-064`
- Request ID: `UR-2026-06-02-022`
- Work mode: `governance`

## Change

Added the corporate timekeeper role as `timekeeper-agent`, responsible for repeatedly making time, deadlines, duration, and "we need to hurry" visible.

## Rationale

The platform exists to reduce repetitive work and save time. Phase timing and bottleneck records already exist, but the platform also needs an agent that calls out deadline risk, critical path, timeboxes, and hurry-up trade-offs during work.

## Impact

- Adds `agent-platform/configs/agents/timekeeper-agent.json`.
- Reuses the existing `_tools/work-timer`.
- Documents safety policy so urgency does not become verification skipping.

# Human Decision Inbox Requirement Change

## Change Overview

- Date: 2026-06-02
- Source request: `UR-2026-06-02-002`
- Added requirement: `REQ-WS-048`
- Work mode: `governance`

## User Request Summary

The user asked for a structure that collects all human-needed decisions at once, keeps other work moving while waiting, and safely interrupts/resumes the affected task when the human returns with an answer.

## Change

`REQ-WS-048` baselines a central human decision inbox for human answers, approvals, preference decisions, `blocked_decision`, and `clarification_needed` items.

- Register each waiting human decision as one record in `_ops/coordination/human-decision-inbox.json`.
- Each item includes the question, answer format, impact, blocked work, still-unblocked work, notification event, checkpoint requirements, and resume action.
- Batch related questions so the human can answer them together.
- Continue safe independent work while waiting.
- When the answer arrives, checkpoint touched paths, verification state, and the next safe return point for current work.
- Interrupt and resume immediately or schedule resume at the next safe point based on priority and risk.
- Record state transitions in `decision_history`.

## Evidence

- LangChain Human-in-the-Loop documents interrupt, checkpoint, and resume patterns around human decisions.
- Microsoft Agent Framework AG-UI workflows document pending requests and resume payloads keyed by interrupt ID.
- Conductor Human Task documents workflow states that wait for an external human signal.
- GitHub issue dependencies document explicit blocked-by/blocking relationships for bottleneck tracking.
- Existing `REQ-WS-047` prevents global pauses, but it does not by itself define a central answer/resume state contract.

## Impact

- Add `_ops/coordination/human-decision-inbox.json` as the central inbox.
- Add `_ops/workflows/61-human-decision-inbox.md` and `_ops/prompts/91-human-decision-inbox.md`.
- Connect the inbox to the AI usage gap profile, persistent instructions, `AGENTS.md`, notification channel config, memory bootstrap, router, and ops index.

# User Request Summaries

This folder stores summaries of user requests. It is not a verbatim prompt archive; it is a request index for quickly finding what the user asked for and where it was implemented.

## Purpose

- Do not leave user requests only in chat memory.
- Store meaning, intent, durability, and result locations instead of full prompt text.
- Avoid making the user restate the same requirements later.
- Let future agents inspect accumulated user intent and operating preferences from repository documents.

## Path Convention

```text
_history/user-requests/YYYY/YYYY-MM-DD.ko.md
_history/user-requests/YYYY/YYYY-MM-DD.en.md
```

## Recording Rules

- Record explicit requests, durable rules, preferences, constraints, and operating changes.
- Short status checks or casual conversation can be omitted when they add no durable operating context.
- Store summaries unless exact text is necessary.
- Do not store sensitive information, raw internal reasoning, or unnecessary intermediate logs.

## Required Fields

- Request order
- Request summary
- Intent type
- Whether it is durable
- Implementation location
- Related plan, evaluation, work summary, and commit

## Close-Out Rule

Meaningful work must include `user_request_summary_targets` in `work-evaluator-agent` input. Missing targets are a blocking gap.

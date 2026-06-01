# Spec: Human-Process Automation Purpose

## Requirement

- `REQ-WS-045`

## Problem

The platform already had rules for promoting repeated work into skills, tools, and workflows, but the reason for doing so was spread across multiple documents. The user clarified that the platform ultimately exists to reduce repetitive human work and elapsed time by finding and automating human-like processes.

## Goals

- Baseline the platform purpose as reducing repetition, creating more efficient methods, and saving time.
- Treat human research, comparison, judgment, execution, and verification as the starting point for automation design.
- Promote valuable repetition into the smallest durable asset.
- Ensure automation does not hide human judgment, validation criteria, or rollback boundaries.
- Preserve the purpose in persistent instructions and memory bootstrap anchors so future sessions do not lose it.

## Non-Goals

- Do not implement a new automation engine.
- Do not automate every repeated task immediately.
- Do not replace work that intrinsically requires human judgment without explicit boundaries.

## Design

- Add `REQ-WS-045` to the workspace platform baseline.
- Make repetition reduction and time savings explicit in the philosophy and platform identity documents.
- Add automation-candidate criteria to capability governance.
- Keep the purpose in persistent instructions, AGENTS, and memory bootstrap warm context.
- Save web search, research, planning, trace, evaluation, and timing records to preserve evidence and outcome.

## Acceptance Criteria

- `REQ-WS-045` exists in the Korean and English requirements baselines.
- Philosophy, platform identity, README, capability governance, persistent instructions, and AGENTS express the same purpose.
- Memory bootstrap config includes repetitive-work reduction and human-process automation in anchor purposes.
- Web search and research notes preserve external evidence.
- Work evaluator and grounding check pass.

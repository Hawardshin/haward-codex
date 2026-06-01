# Plan Record: Infrastructure Expert Agent

- Date: 2026-06-02
- Work mode: `governance`
- Request: `Infrastructure expert`
- Interpretation: Add an infrastructure expert role as a reusable platform agent spec.

## Work Mode Selection

- Selected: `governance`
- Reason: A new reusable agent and operations safety contract affect platform behavior and future work.
- Applied gates: web-first, requirements, spec, source provenance, plan evidence, omission, grounding, evaluation, commit/push.

## Plan

1. Check official infrastructure/SRE sources.
2. Check the existing agent orchestration registry and agent spec shape.
3. Add requirement `REQ-WS-063`.
4. Add the `infrastructure-expert-agent` spec plus Korean/English docs.
5. Record spec, source provenance, plan evidence, request trace, work summary, timing, and evaluation.
6. Run agent inspection/list/orchestration, docs/workspace/monitor verification.
7. Evaluate, commit, and push.

## Selected Boundary

- Owner: `agent-platform/`, because this is a reusable platform agent.
- No new root project is created. Provider-specific infrastructure work should live in its own project folder when it appears.
- No actual infrastructure execution, installation, or provisioning is performed.

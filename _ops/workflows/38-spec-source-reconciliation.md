# Spec Source Reconciliation Workflow

## Purpose

프로젝트 스펙이 애매하거나 현재 소스와 다를 때, 스펙을 수정할지 소스를 수정할지 또는 사용자에게 질문할지 결정한다.

## Sequence

1. Run web-first intake and save the web search record when the selected mode requires it.
2. Read the active requirement baseline and the active spec under `_specs/` or the owning project's `specs/`.
3. Inspect current source, tests, generated artifacts, and validation output that implement or contradict the spec.
4. Record comparison evidence: exact spec path/section, source path, test output, command output, and trace links.
5. Create a reconciliation input from `agent-platform/configs/planning/spec-reconciliation-template.json`.
6. For each issue, classify one `default_resolution`:
   - `update_spec`: source behavior is confirmed intentional and the spec is stale.
   - `update_source`: the active approved spec is clear and source behavior is wrong or incomplete.
   - `ask_user`: product intent, acceptance criteria, priority, compatibility, or trade-off is unclear.
   - `defer`: outside the current scope but must remain tracked.
7. For every `ask_user` issue, write short user-answerable questions with stable IDs such as `Q1`, options when possible, answer format, and decision impact.
8. Run `PYTHONPATH=src python3 -m agent_platform.cli reconcile-spec <input.json>` from `agent-platform/`.
9. If the result is `clarification_required`, surface `notification_event` in chat and, when configured, send or dry-run the `clarification_needed` notification.
10. Do not change spec or source for `ask_user` issues until the answer is recorded in the plan/history.
11. After the answer is available, update requirements/spec/plan/tasks/validation/traceability first, then update source if needed.
12. Include reconciliation input/output, clarification alert, user answer, and resulting spec/source changes in close-out evaluation.

## Clarification Alert Format

```text
[WARNING] Spec clarification needed: <project>
Project: <project>
Request: <summary>
Spec/source reconciliation needs your decision before continuing.
Questions:
- SSR-001: <issue summary>
  - Q1: <question>? Options: <A>, <B>, <defer>. Recommended: <A>.
Reply format:
Q1=<answer>
```

## Rule

When the agent cannot prove whether the spec or the source is wrong, ask the user before changing either. The question must be specific enough that the user's answer can be copied into a requirement, spec, or task decision.

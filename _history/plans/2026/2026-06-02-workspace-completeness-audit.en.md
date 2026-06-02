# Plan Record: Whole-Workspace Completeness Audit

## Mode

- Selected mode: `governance`
- Reason: the work changes repository-wide quality gates, requirements, specs, history, and evaluation policy.

## Plan

1. Check web references and memory bootstrap.
2. Run existing audits/tests/builds to find real failures.
3. Fix the structure-audit false positive.
4. Expand `workspace-health` to current core settings and project checks.
5. Clean spec signals that look unfinished.
6. Save health report and evaluation records.
7. Run final verification, then commit/push.

## Findings

- Root `.pytest_cache/` was a policy-declared generated output but structure-audit classified it as unknown root.
- `workspace-health` did not yet include privacy, presentation browser, desktop readiness, or the current config contract list.
- Some spec validation headings and commit/push checkboxes looked unfinished.

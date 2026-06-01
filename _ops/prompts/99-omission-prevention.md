# Omission Prevention Prompt

## Purpose

누락 위험이 있는 작업을 종료하기 전에 필수 항목 coverage를 만들 때 사용한다.

## Prompt

```text
Create an omission-prevention coverage record for the completed task.

Inputs:
- Initial user instruction summary
- Selected work_mode
- Requirement IDs and spec/task references
- Planned outputs
- Actual changed files and artifacts
- Verification commands and results
- Known deferrals or not-applicable items

Return a JSON-compatible coverage plan with:
- task
- work_mode
- expected_items: item_id, description, source, required, status, evidence, rationale
- artifact_checks: path, purpose, required
- acceptance_checks: check_id, description, required, status, evidence, rationale
- known_omission_risks
- notes

Rules:
- Mark an item covered only when evidence exists.
- Mark a required missing item as a blocking gap.
- Mark deferred and not_applicable items with rationale.
- Do not hide weak or unverified coverage.
- The result must be usable with agent-platform check-omissions.
```

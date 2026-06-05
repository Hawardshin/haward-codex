# Omission Prevention Workflow

## Purpose

작업이 끝났다고 말하기 전에 빠뜨린 요구사항, 지시, 산출물, 검증이 없는지 확인한다.

## Sequence

1. Confirm the selected `work_mode`.
2. If the mode is `quick`, decide whether omission risk is low enough to treat this as advisory.
3. For non-`quick` work, create an omission check JSON under `_history/evaluations/YYYY/` or the owning project history folder.
4. Fill `expected_items` from the user request summary, requirements, spec tasks, plan, and acceptance criteria. If the user says “다하기”, “전부”, “모두”, “do all”, or equivalent, expand this into every applicable requested outcome, artifact, validation, build/package step, record, commit, and push.
5. Fill `artifact_checks` for files, folders, generated artifacts, dashboards, or reports that must exist.
6. Fill `acceptance_checks` for tests, audits, config checks, manual reviews, browser checks, or grounding checks that define completion.
7. Run `PYTHONPATH=src python3 -m agent_platform.cli check-omissions <input.json>` from `agent-platform/`.
8. If the result is `rework_required`, fix the gaps and run the check again.
9. Add the check input or result path to `omission_check_targets` in the final `evaluate-work` input.

## Output

- Task-specific omission check JSON
- `check-omissions` command result
- `omission_check_targets` in the final evaluation input

## Rule

Do not use this workflow as a long narrative checklist. Keep each item short, evidence-linked, and auditable.
Do not close a “do all” request as complete with only a partial subset covered. If a concrete blocker prevents one part, isolate that part, record the blocker, and include the continuation path.

# Installation Record Workflow

## Purpose

설치 작업은 환경과 dependency 상태를 바꾸므로 일반 작업보다 더 자세한 감사 기록을 남긴다.

## Sequence

1. Run web-first intake and collect official install docs, repository/activity, license, security, and rollback references.
2. Decide owning project/tool scope before installation.
3. Prefer project-local or tool-local install scope. Treat global installs as exceptions requiring explicit justification and approval.
4. Create a draft record under `_history/installations/YYYY/` using `_templates/installation-record/`.
5. Record exact install command, dependency record files, expected lock/SBOM state, environment path, security review, license review, and rollback plan.
6. Run the install only after the draft record is created.
7. Update the record with actual command, installed version, changed dependency files, lock/SBOM status, and command output summary.
8. Run import, CLI, unit, smoke, or artifact verification.
9. Update `_ops/installations/registry.json`.
10. Update `_history/work-summaries/` and daily history.
11. Run `work-evaluator-agent` with `installation_occurred=true` and `installation_record_targets`.
12. Commit and push the coherent change set.

## Rule

Do not close an installation task with only chat memory, shell output, or dependency files. The detailed installation record and registry entry are required.

Removals and upgrades follow the same workflow because they also change the dependency state.

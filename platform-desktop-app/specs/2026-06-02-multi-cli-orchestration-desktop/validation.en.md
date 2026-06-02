# Multi-CLI Orchestration Desktop Validation

## Commands

```bash
python3 -m json.tool agent-platform/configs/integrations/cli-adapter-registry.json
python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json
python3 -m json.tool platform-desktop-app/configs/user-flow-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/integrations/cli-adapter-registry.json ../platform-desktop-app/configs/desktop-distribution-registry.json ../platform-desktop-app/configs/user-flow-registry.json
npm --prefix platform-desktop-app run check
npm --prefix platform-desktop-app test
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-omission-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-resource-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-grounding.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-evaluation-input.json
git diff --check
```

## Manual Checks

- Confirm no dependency installation occurred.
- Confirm no real CLI execution implementation was added.
- Do not claim public installer readiness.

## Results

- `check-config-contract`: `self_documenting`
- `npm --prefix platform-desktop-app run check`: `ready_for_dependency_install_audit`, with Rust toolchain warning
- `npm --prefix platform-desktop-app test`: 6 tests passed
- `check-resources`: `resource_ready`
- `check-grounding`: `ready_to_publish`
- `check-cli-pipeline`: `pipeline_ready`

## Supervisor MVP 1 Additional Validation

```bash
npm --prefix workspace-monitor run check
npm --prefix workspace-monitor test
npm --prefix workspace-monitor run build
npm --prefix platform-desktop-app test
npm --prefix platform-desktop-app run check
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/view-mode-registry.json ../platform-desktop-app/configs/desktop-distribution-registry.json ../platform-desktop-app/configs/user-flow-registry.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-desktop-cli-supervisor-mvp-omission-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-02-desktop-cli-supervisor-mvp-resource-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-desktop-cli-supervisor-mvp-grounding.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ../_history/evaluations/2026/2026-06-02-desktop-cli-supervisor-mvp-cli-pipeline.json
python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-desktop-cli-supervisor-mvp.json
git diff --check
```

Expected results:

- Workspace Monitor TypeScript check, unit tests, and static build should pass.
- `platform-desktop-app` Node tests should report 7 tests passed.
- `platform-desktop-app run check` should remain `ready_for_dependency_install_audit` and may warn that Rust is missing.
- The view mode registry must include the `desktop` section for every mode.
- Omission, resource, grounding, and CLI pipeline checks should each be ready.
- Rust compile, `tauri:dev`, and `tauri:build` are not verified while the Rust toolchain is missing.

## Pipe Session / Source Editor MVP 2 Additional Validation

```bash
npm --prefix workspace-monitor run check
npm --prefix workspace-monitor test
npm --prefix workspace-monitor run build
npm --prefix platform-desktop-app test
npm --prefix platform-desktop-app run check
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-desktop-cli-session-editor-mvp-omission-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-02-desktop-cli-session-editor-mvp-resource-input.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-desktop-cli-session-editor-mvp-grounding.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ../_history/evaluations/2026/2026-06-02-desktop-cli-session-editor-mvp-cli-pipeline.json
```

Expected results:

- Workspace Monitor check/test/build should pass.
- `platform-desktop-app` Node tests should verify the new command names.
- The readiness check should verify session/editor command names, human decision inbox persistence, and Desktop tab inbox item count display.
- The readiness check should verify setup guides, work-mode presets, decision inbox list/answer commands, and UI strings.
- The readiness check should verify the `answer_and_resume_human_decision` command and `Answer & Resume` UI string.
- The readiness check should verify applied reference-app UI strings: `Command Palette`, `Capability Center`, `Run Board`, process graph, terminal event, decision replay, `Source Review`, and `Evidence / Promotion`.
- The readiness check should verify multi-file source editing strings: `Multi-file scoped editor`, `File Edit Queue`, `Open Path`, `Save Current`, `Save All`, `Revert Draft`, plus implementation tokens `sourceDrafts`, `saveAllSourceDrafts`, `revertCurrentDraft`, and `openDraftOrLoad`.
- Visual QA should verify that the Desktop tab source file browser, draft queue, editor, and diff preview do not overlap on desktop or mobile widths.
- Rust compile and Tauri dev/build are not verified until the Rust toolchain is installed.
- The source editor contract must block `_private/`, `outputs/`, paths outside the workspace, and symlink escapes, and create a backup before saving.
- The defer command contract must append detected questions to `_ops/coordination/human-decision-inbox.json` without duplicating the same session prompt.
- The decision answer command contract must set the selected decision status to `answered` and persist answer plus decision_history records.
- The answer-and-resume command contract must save the answer, send the same answer to the linked active CLI session stdin, and refresh the session report when the decision carries session metadata.

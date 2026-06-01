# 2026-06-01 Coding Project Bootstrap Evaluation

## Evaluation Input

- Work mode: `standard`
- Initial instruction: Create a structure for adding new coding projects across multiple technologies, usable at the current location or a chosen target location, while keeping projects separated, avoiding waste, documenting usage, and reflecting the flow in the management platform.
- Result summary: Added a dry-run-first `coding-project-bootstrap` tool, technology-aware blueprint config, optional root project registration, nested target support, workflow/prompt/router/memory integration, and requirements/spec/history/monitoring updates.

## References Checked

- Backstage Software Templates: https://backstage.io/docs/features/software-templates
- Backstage Writing Templates: https://backstage.io/docs/features/software-templates/writing-templates/
- Copier generating projects: https://copier.readthedocs.io/en/stable/generating/
- Nx Workspace Generators: https://nx.dev/docs/reference/workspace/generators
- Backstage software-templates GitHub: https://github.com/backstage/software-templates
- `_ops/workflows/25-project-boundary-management.md`
- `_ops/projects/registry.json`
- `agent-platform/configs/research/coding-research-profile.json`
- `_docs/policies/open-source-installation-policy.ko.md`

## Verification

- `python3 -m unittest discover -s _tools/coding-project-bootstrap/tests`: pass, 5 tests
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py list`: pass, 7 blueprints
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan sample-agent --blueprint python-agent --register`: pass, dry-run plan included a registry entry
- `python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan my-helper --blueprint python-cli --target-dir existing-project/tools/my-helper`: pass, nested target plan had no registry entry
- `check-config-contract`: pass, `self_documenting`
- `check-memory-bootstrap`: pass, `ready_to_bootstrap`
- `python3 _tools/workspace-index/src/workspace_index.py`: pass
- `python3 _tools/task-board/src/task_board.py`: pass
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`: pass, 20 checks
- `check-grounding`: pass, `ready_to_publish`
- `evaluate-work`: pass, `ready_to_close`

## Evaluation Result

- Status: `ready_to_close`
- Blocking gaps: none
- Commit/push: pending
- Improvement ideas:
  - Add guided interactive mode if the user wants prompts instead of CLI flags.
  - Strengthen stack-specific post-bootstrap checklists after more real projects are created.
  - Add a Workspace Monitor panel that can show bootstrap commands directly.

## Main Artifacts

- `_tools/coding-project-bootstrap/`
- `_tools/coding-project-bootstrap/configs/blueprints.json`
- `_ops/workflows/27-bootstrap-coding-project.md`
- `_ops/prompts/27-bootstrap-coding-project.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_specs/workspace-platform/2026-06-01-coding-project-bootstrap/`
- `_history/web-searches/2026/2026-06-01-coding-project-bootstrap.en.md`

## Evaluator Output Summary

```json
{
  "status": "ready_to_close",
  "requires_rework": false,
  "work_mode": "standard",
  "gaps": [],
  "improvements": [
    "Add a guided interactive mode later if the user wants prompts instead of CLI flags.",
    "Add stack-specific post-bootstrap checklist generation after more real projects are created.",
    "Add a Workspace Monitor UI panel that can show bootstrap commands directly."
  ]
}
```

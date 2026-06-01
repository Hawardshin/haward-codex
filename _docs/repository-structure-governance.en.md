# Repository Structure Governance

## Purpose

This document defines how root folders should stay separated as projects, shared operational assets, local-only scratch, or generated output.

## Current Classification

- `agent-platform/`, `presentation-agent/`, and `workspace-monitor/` are registered root projects.
- `_docs/`, `_ops/`, `_history/`, `_requirements/`, `_specs/`, `_research/`, `_skills/`, `_templates/`, `_tools/`, `_philosophy/`, and `_archive/` are shared operational folders.
- `_private/` and `outputs/` are local-only ignored folders. They are not durable sources of truth.
- Durable project artifacts belong under the owning project's `artifacts/`, not root `outputs/`.

## Improvements Found

1. Existing rules generally treated underscore folders as reserved folders but did not explain local-only exceptions such as `_private/`.
2. A root `outputs/` folder was ambiguous by name, even when empty, because it could be mistaken for a durable artifact location.
3. Project boundary review was document-based and did not include a deterministic root-folder check.
4. `workspace-monitor` showed history and project docs but did not include `_docs` and `_philosophy`, making structural rules less directly visible.

## Applied Structure

- Root folder classes are managed in `_ops/projects/root-structure-policy.json`.
- Root folder audit is handled by `_tools/structure-audit/`.
- `.gitignore` explicitly excludes `_private/`, `outputs/`, build outputs, and TypeScript build metadata.
- The project boundary workflow treats local-only scratch and generated output as separate classifications.
- `workspace-monitor` collects `_docs` and `_philosophy` as document categories.

## Do Not Do

- Do not move or rename registered projects without a separate migration plan.
- Do not mass-move existing history, requirements, or evaluation files only to satisfy a new structure preference.
- Do not link `_private/` content as requirements, evaluation evidence, or knowledge-base material.
- Do not report root `outputs/` content as a final artifact.

## Verification Commands

```bash
python3 _tools/structure-audit/src/structure_audit.py --check
python3 _tools/workspace-index/src/workspace_index.py
python3 _tools/task-board/src/task_board.py
```

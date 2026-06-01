# Web Search Record: Workspace Health Source Structure Refactor

## Search Purpose

Before implementing the user's request for "refactoring folder structure source structure", I checked external references for maintainable source and folder organization.

## Search Date

- Date: 2026-06-01
- Work mode: `standard`

## Queries

- `Python src layout best practices package structure official PyPA`
- `software project structure refactoring maintainability best practices`
- `monorepo folder structure maintainability best practices`

## Key Sources Checked

| Source | Type | Finding | Applied To |
| --- | --- | --- | --- |
| Python Packaging User Guide, `src` layout vs flat layout, https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/ | official docs | Importable code can live under `src/`; CLI execution may need a `sys.path` adjustment | Keep the `workspace_health` package under `src/` and preserve a legacy script wrapper |
| pyOpenSci Python Package Guide, https://www.pyopensci.org/python-package-guide/package-structure-code/python-package-structure.html | guide | Shows `src/package` structure and package boundary benefits for tests | Prefer package-module imports over a single script module |
| Refactoring Guru, Refactoring, https://refactoring.guru/refactoring | educational reference | Refactoring should improve internal structure while preserving external behavior | Keep the existing `workspace_health.py` command compatible |
| Martin Fowler, Monorepo, https://martinfowler.com/bliki/Monorepo.html | expert article | Monorepos need clear shared-code and operating boundaries | Split responsibilities within `_tools/workspace-health`, avoid root-level reshuffle |

## Weak Sources Ignored

- Recent SEO-style "2026 best structure" articles were not used as primary evidence because authority and reproducibility were weaker.
- Reddit/community opinions were treated only as auxiliary signals.

## Plan Impact

- Do not broadly move root folders in this pass.
- Refactor the concrete maintainability issue in `workspace-health`: one file currently owns CLI, checks, execution, and serialization.
- Preserve `_tools/workspace-health/src/workspace_health.py` as a wrapper so existing operations commands keep working.

## Uncertainty

- Local smoke testing confirmed that when `workspace_health.py` and a `workspace_health/` package coexist under the same `src`, importing `workspace_health.cli` resolves to the package, so the wrapper can import the package safely.

# Web Search Record: Naming Rules And Audit

## Search Purpose

Before implementing the user's request for "name structure naming rules", I checked external references for repository, source, documentation, and commit naming conventions.

## Search Date

- Date: 2026-06-01
- Work mode: `governance`

## Queries

- `repository naming conventions folder file names kebab case docs monorepo best practices`
- `Google naming conventions file names project structure style guide`
- `monorepo naming conventions package folder names best practices`
- `Conventional Commits specification commit message naming`

## Key Sources Checked

| Source | Type | Finding | Applied To |
| --- | --- | --- | --- |
| Python Packaging User Guide, `src` layout vs flat layout, https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/ | official docs | Python importable packages and source layout should have clear boundaries | Use `snake_case` for Python packages/modules while keeping tool folders in `kebab-case` |
| Google Style Guides, https://google.github.io/styleguide/ | official style guide collection | Projects commonly keep language/project-specific style guides | Split naming rules by namespace and allow stronger ecosystem conventions |
| Conventional Commits 1.0.0, https://www.conventionalcommits.org/en/v1.0.0/ | specification | Defines structured `type(scope): summary` commit messages | Record commit naming under the policy's commit namespace |
| Refactoring Guru, Refactoring, https://refactoring.guru/refactoring | educational reference | Structural improvement should preserve external behavior | Avoid mass-renaming durable paths; introduce rules and audit first |

## Weak Sources Ignored

- Generic "best naming" blog posts were treated as low-authority because naming is highly project-context dependent.
- Community opinions were treated only as adoption signals, not factual proof.

## Plan Impact

- Do not force one case style globally; define namespace-specific conventions.
- Store the machine-readable naming source of truth in `_ops/naming/naming-policy.json`.
- Store human-readable guidance in `_docs/governance/naming-governance.ko.md` and `.en.md`.
- Put mechanically enforceable checks in `_tools/naming-audit/` and connect them to `workspace-health`.

## Uncertainty

- Existing file renames could break links and snapshots, so this pass introduces rules and audit first. Actual renames need a separate migration plan.

# Web Search Record: Install Mode Split

## Request

- Date: 2026-06-02
- User request: The platform has a use mode and an improvement mode, so implement separate user and developer installation paths.
- Work mode: `governance`

## Queries

- `Python packaging editable install development dependencies official docs pip pyproject optional dependencies`
- `pip install editable local project development official docs`
- `npm ci omit dev dependencies production install official docs`
- `Vercel Next.js deploy dependencies devDependencies production install official docs`

## Checked Sources

| Source | Type | Checked For | Impact |
| --- | --- | --- | --- |
| pip Local project installs | Official docs | Regular local install versus editable/development install | Designed `user` around regular install and `developer` around editable install |
| Python Packaging User Guide: pyproject.toml | Official docs | Project dependencies and optional dependencies structure | Documented Python dependency policy in install mode registry |
| npm Docs: npm ci/npm install | Official docs | Clean lockfile install, `--omit=dev`, dev dependency omit behavior | Split user/developer Node setup policy |
| Vercel Docs: Next.js on Vercel | Official docs | Vercel deployment path for Next.js projects | Reflected in workspace-monitor user install/deployment notes |

## Weak Sources Ignored

- Reddit and general Q&A search results were not used as evidence for this change.
- The adopted basis is official documentation plus existing installation audit rules.

## Plan Impact

- Created a separate `install_mode` registry instead of extending `work_mode`.
- Separated documented setup commands from actually executed installs.
- Kept actual installation changes under `_ops/workflows/58-installation-record.md`.

## Uncertainty

- Next.js source builds may need dev tooling, so user install keeps `npm ci && npm run build` for source builds and leaves runtime-only pruning as a separate confirmed step.
- This change creates install profiles and validation CLI; it does not run dependency installation.

## Public Decision Summary

User/developer setup is an environment-preparation mode, not a task close-out mode. Keep `install_mode` as its own source of truth: users get minimal regular/runtime paths, while developers get editable/dev/test/governance paths.

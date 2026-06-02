# Requirements Change: pnpm Workspace Migration

## Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-WS-088 | JavaScript/TypeScript projects in the repository shall install and verify dependencies through a pnpm workspace and the root `pnpm-lock.yaml`. | must | `corepack pnpm install --frozen-lockfile`, project pnpm test/check/build commands |
| REQ-WS-089 | The package manager version shall be pinned through `packageManager` so Corepack can select it reproducibly. | must | `corepack pnpm --version` prints the pinned version |
| REQ-WS-090 | Current execution docs and durable configs shall guide npm-free pnpm install and verification commands. | must | npm command reference audit |

## Rationale

- A root workspace lockfile is more maintainable and reproducible for the repository's multiple Node projects.
- The user explicitly requested the pnpm migration.


# Plan: pnpm Workspace Migration

1. Create the installation audit draft.
2. Pin `pnpm@10.34.1` through Corepack.
3. Update workspace config and package manifests.
4. Remove npm lockfiles and generate the root pnpm lockfile.
5. Update durable current command docs/configs to pnpm.
6. Run pnpm-based verification.
7. Update installation audit, omission/evaluation, history summary, then commit and push.


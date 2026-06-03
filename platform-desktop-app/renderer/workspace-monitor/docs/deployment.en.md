# Vercel Deployment Guide

## Assumptions

- This renderer is primarily bundled into the installable desktop product.
- Only set up separate web deployment when a deployment review says it is needed.
- While the repository is private, local usage is the default.
- Before public deployment, review the generated snapshot.

## Vercel Settings

| Setting | Value |
| --- | --- |
| Root Directory | `platform-desktop-app/renderer/workspace-monitor` |
| Framework Preset | Next.js |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm run build` |
| Output Directory | Next.js default |

## Pre-Deploy Checklist

1. Run `pnpm run collect` to refresh the snapshot.
2. Review `src/generated/workspace-snapshot.json` for information that should not be public.
3. Run `pnpm test`, `pnpm run check`, and `pnpm run build`.
4. Make the repository public or grant Vercel access to the private repository.
5. Set the Vercel root directory to `platform-desktop-app/renderer/workspace-monitor` and deploy.

## Operating Model

- After meaningful work, run `pnpm run collect` and commit the updated snapshot.
- Vercel build also runs best-effort collection through `prebuild`.
- If Vercel cannot access the parent repository, the committed snapshot is still used for build.

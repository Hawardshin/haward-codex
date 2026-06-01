# Vercel Deployment Guide

## Assumptions

- Vercel root directory should be `workspace-monitor/`.
- While the repository is private, local usage is the default.
- Before public deployment, review the generated snapshot.

## Vercel Settings

| Setting | Value |
| --- | --- |
| Root Directory | `workspace-monitor` |
| Framework Preset | Next.js |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | Next.js default |

## Pre-Deploy Checklist

1. Run `npm run collect` to refresh the snapshot.
2. Review `src/generated/workspace-snapshot.json` for information that should not be public.
3. Run `npm test`, `npm run check`, and `npm run build`.
4. Make the repository public or grant Vercel access to the private repository.
5. Set the Vercel root directory to `workspace-monitor` and deploy.

## Operating Model

- After meaningful work, run `npm run collect` and commit the updated snapshot.
- Vercel build also runs best-effort collection through `prebuild`.
- If Vercel cannot access the parent repository, the committed snapshot is still used for build.


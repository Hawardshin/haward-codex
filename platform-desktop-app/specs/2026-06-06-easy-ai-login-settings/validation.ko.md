# 검증: 쉬운 AI 로그인 설정

## 예정 명령

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app check`
- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm run desktop:package:internal`

## 현재 상태

- `corepack pnpm --filter workspace-monitor test` - passed
- `corepack pnpm --filter workspace-monitor check` - first run failed only because admin history lazy index had not been regenerated yet; TypeScript and renderer contract checks passed before that failure.
- `corepack pnpm --filter workspace-monitor run collect` - passed
- `corepack pnpm --filter workspace-monitor check` - passed after collect
- `corepack pnpm --filter platform-desktop-app test` - first rerun failed because a model chip button rule used `overflow-wrap:anywhere`; fixed by moving long-token wrapping to an inner span.
- `corepack pnpm --filter platform-desktop-app test` - passed after fix
- `corepack pnpm --filter platform-desktop-app check` - passed after fix
- in-app Browser static build smoke at `http://127.0.0.1:4173/` - passed; Settings > Core settings > Account connection rendered `AI 로그인 설정`, provider filters, provider rows, and model strip.
- `corepack pnpm run desktop:package:internal` - passed; generated `.app` and `.dmg`, verified app signature and DMG checksum.

## 수동 확인 항목

- Provider setup copy must not imply in-app OAuth where the provider only supports console/API key setup.
- API key inputs remain password fields and saved secrets are not echoed back into the UI.
- Ollama remains labeled as local runtime, not cloud account login.

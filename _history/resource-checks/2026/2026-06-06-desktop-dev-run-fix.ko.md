# Resource check: desktop dev/run fix

## runtime_context

- Tauri dev process
- Next.js dev server on port 3000
- macOS `.app` open helper
- Rust/Tauri build process

## resource_risks

- Dev server left running: mitigated.
- Tauri debug process left running: mitigated.
- post-package static/open smoke process left running: mitigated.

## lifecycle_checks

- `corepack pnpm run desktop:dev` started Next dev server and Tauri debug process.
- PIDs `72623` and `72691` were terminated after validation.
- `lsof -nP -iTCP:3000 -sTCP:LISTEN` returned no listener after cleanup.
- `corepack pnpm run desktop:package:internal` completed and did not leave a dev server.
- `corepack pnpm run desktop:run:internal` opened packaged app PIDs `85397`, `87155`.
- PIDs `85397`, `87155` were terminated after post-package smoke.
- Final `pgrep` returned no packaged app process, and final port 3000 listener check returned empty.

## measurement_checks

- Dev smoke reached `GET / 200`.
- Cleanup proof used `lsof` and `pgrep` after kill.
- Package smoke proved `.app` startup via process table before cleanup.

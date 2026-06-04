# 2026-06-05 Desktop Doctor Trace

## Request

사용자가 기능 개선을 요청했다.

## Outcome

- `corepack pnpm run desktop:doctor` 명령을 추가했다.
- `platform-desktop-app/scripts/desktop-doctor.mjs`를 추가해 desktop setup/build에 필요한 파일, package scripts, Node/pnpm/Rust/Tauri/Playwright CLI, Playwright Chromium headless shell cache, customer renderer bundle boundary, internal release preflight, public release gates를 한 번에 검사한다.
- doctor는 실패가 있을 때만 exit code 1을 반환하고, public release signing/notarization/updater/clean-machine smoke처럼 internal packaging을 막지 않는 항목은 warning으로 표시한다.
- `--json` 출력 모드를 추가해 UI나 자동화가 같은 report를 재사용할 수 있게 했다.
- README, bilingual README, release runbook, readiness check, readiness test에 새 명령을 반영했다.

## Validation

- `corepack pnpm run desktop:doctor`: passed, status `desktop_doctor_ready_with_warnings`, passed 18, warnings 1, failures 0
- `corepack pnpm --filter platform-desktop-app run doctor -- --json`: passed
- `corepack pnpm --filter platform-desktop-app test`: passed, 21 tests
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `corepack pnpm --filter platform-desktop-app run pipeline:dry-run`: passed

## Notes

- 남은 warning은 public release 전용 gate다: Developer ID signing/notarization, signed updater endpoint/key, clean-machine smoke.
- Generated snapshot JSON files remain unstaged build outputs.

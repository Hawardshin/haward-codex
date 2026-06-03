# 검증: 데스크톱 코드 워크벤치 완성

## 실행 검증

- `cargo fmt`: 통과.
- `cargo check` from `platform-desktop-app/src-tauri/`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 16개 통과.
- `corepack pnpm --filter workspace-monitor run build`: 통과.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: `within_budget`, largest initial chunk 227542 bytes.
- `corepack pnpm --filter workspace-monitor run check:intent-map`: 통과.
- `corepack pnpm --filter workspace-monitor run check:intent-map:customer`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 13개 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과, customer bundle audit ready.
- Browser smoke: developer snapshot에서 Source Review, command toolbar 8개, Refresh Files, Diff, Settings, template 6개, snapshot file browser fallback, settings dialog, body/viewport overflow 0 확인.
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-code-workbench-completion-omission-input.json`: `coverage_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-code-workbench-completion-resource-input.json`: `resource_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-03-code-workbench-completion-evaluation-input.json`: `ready_to_close`.
- `git diff --check`: 통과.

## 참고

- 최종 산출물은 customer build로 되돌렸고 customer snapshot redaction 검사를 통과했다.

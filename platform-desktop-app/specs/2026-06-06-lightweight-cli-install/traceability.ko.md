# Traceability: Lightweight CLI Install

## 요구 연결

- lightweight CLI: `platform-desktop-app/tools/awp/awp.py`
- install helper: `platform-desktop-app/scripts/install-awp-cli.mjs`
- package entry: `platform-desktop-app/package.json`
- test: `platform-desktop-app/tests/awp-cli.test.mjs`
- readiness gate: `platform-desktop-app/scripts/check-readiness.mjs`
- installation audit: `_history/installations/2026/2026-06-06-awp-lightweight-cli.ko.md`

## 안전 연결

- workspace path guard: `workspace_path`
- protected dirs: `PROTECTED_PARTS`
- no shell string: `subprocess.run(..., shell=False)`
- rollback: `rm /Users/shinjoungeun/.local/bin/awp`

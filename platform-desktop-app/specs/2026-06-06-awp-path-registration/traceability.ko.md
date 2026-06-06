# Traceability: awp PATH Registration

## 요구 연결

- PATH 등록 script: `platform-desktop-app/scripts/configure-awp-path.mjs`
- package scripts: `platform-desktop-app/package.json`
- readiness gate: `platform-desktop-app/scripts/check-readiness.mjs`
- tests: `platform-desktop-app/tests/awp-cli.test.mjs`
- persistent instruction: `_docs/instructions/persistent-instructions.md`, `.ko.md`, `.en.md`
- memory bootstrap: `agent-platform/configs/memory/bootstrap-manifest.json`
- install audit: `_history/installations/2026/2026-06-06-awp-zsh-path-registration.ko.md`

## Runtime 연결

- zsh 파일: `/Users/shinjoungeun/.zprofile`, `/Users/shinjoungeun/.zshrc`
- 백업: `/Users/shinjoungeun/.zprofile.awp-backup-20260606T124607Z`, `/Users/shinjoungeun/.zshrc.awp-backup-20260606T124607Z`
- rollback: `node platform-desktop-app/scripts/configure-awp-path.mjs --remove`

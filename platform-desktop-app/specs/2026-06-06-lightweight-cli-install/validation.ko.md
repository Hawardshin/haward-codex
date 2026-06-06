# Validation: Lightweight CLI Install

## 실행한 검증

- `python3 platform-desktop-app/tools/awp/awp.py --version`: 통과
- `python3 platform-desktop-app/tools/awp/awp.py doctor --json`: 통과
- `python3 platform-desktop-app/tools/awp/awp.py cli-check --json`: 통과
- `node platform-desktop-app/scripts/install-awp-cli.mjs --dry-run`: 통과
- `pnpm --dir platform-desktop-app cli:install`: 통과
- `/Users/shinjoungeun/.local/bin/awp --version`: 통과
- `/Users/shinjoungeun/.local/bin/awp doctor --json`: 통과
- `pnpm --dir platform-desktop-app test`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과
- `pnpm --dir platform-desktop-app check`: 통과. 기존 public release blocker/signing/notarization/update 관련 경고는 유지된다.
- `pnpm --dir platform-desktop-app package:internal`: 통과. 내부 `.app`과 DMG 생성, codesign verify, `hdiutil verify` 통과.

## 주의

`~/.local/bin`은 현재 PATH에 없다. shell 설정 파일은 자동 수정하지 않았다.

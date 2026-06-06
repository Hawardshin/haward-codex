# Request Trace: Lightweight CLI Install

날짜: 2026-06-06

## 요청

CLI도 가벼운 CLI 설치를 도와준다.

## 산출물

- CLI: `platform-desktop-app/tools/awp/awp.py`
- 설치 스크립트: `platform-desktop-app/scripts/install-awp-cli.mjs`
- 테스트: `platform-desktop-app/tests/awp-cli.test.mjs`
- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-lightweight-cli-install.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-lightweight-cli-install/`
- 설치 기록: `_history/installations/2026/2026-06-06-awp-lightweight-cli.ko.md`

## 설치 결과

- 설치 위치: `/Users/shinjoungeun/.local/bin/awp`
- rollback: `rm /Users/shinjoungeun/.local/bin/awp`

## 검증 결과

- `pnpm --dir platform-desktop-app test`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과
- `pnpm --dir platform-desktop-app check`: 통과
- `pnpm --dir platform-desktop-app package:internal`: 통과

# 검증 계획: 두 데스크톱 앱 제품 경계

## 명령 검증

- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../agent-tool-desktop-app/configs/product-boundary-registry.json ../platform-desktop-app/configs/workspace-tracker-product-split-registry.json ../platform-desktop-app/configs/product-feature-registry.json`
- `python3 -m json.tool _ops/projects/registry.json`
- `python3 -m json.tool agent-tool-desktop-app/configs/product-boundary-registry.json`
- `python3 -m json.tool platform-desktop-app/configs/workspace-tracker-product-split-registry.json`
- `python3 -m json.tool platform-desktop-app/configs/product-feature-registry.json`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `corepack pnpm --dir platform-desktop-app run test`
- `corepack pnpm --dir platform-desktop-app run check`
- `corepack pnpm --dir platform-desktop-app run renderer:build`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-08-two-desktop-app-product-boundary.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-08-two-desktop-app-product-boundary.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-08-two-desktop-app-product-boundary-evaluation-input.json`
- `git diff --check`

## 수용 기준 매핑

- `REQ-ATD-001`: `_ops/projects/registry.json`
- `REQ-ATD-002`: `agent-tool-desktop-app/configs/product-boundary-registry.json`
- `REQ-ATD-003`: `agent-platform/README.md`
- `REQ-ATD-004`: `platform-desktop-app/configs/workspace-tracker-product-split-registry.json`

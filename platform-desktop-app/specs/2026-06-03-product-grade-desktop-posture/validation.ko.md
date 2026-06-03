# 검증 계획

## 명령

- `python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json`
- `python3 -m json.tool platform-desktop-app/configs/macos-execution-profile.json`
- `python3 -m json.tool platform-desktop-app/configs/service-readiness-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/macos-execution-profile.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/service-readiness-registry.json`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run check:intent-map:customer`
- `git diff --check`

## 기대

- JSON/config/doc checks가 실패하지 않는다.
- platform readiness status는 `desktop_product_structure_ready_public_release_gated`를 반환한다.
- service readiness는 internal ready/public blocked를 유지하거나 public signoff pending status를 사용하며, `service_public_ready_candidate`를 반환하지 않는다.

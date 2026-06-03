# 검증: Installer Shell Runtime Contract

## 예정/실행 검증

- `cargo fmt`: 통과.
- `node scripts/check-runtime-contract.mjs`: `installer_shell_runtime_contract_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: `self_documenting`.
- `corepack pnpm --filter platform-desktop-app test`: 14개 통과.
- `python3 -m json.tool` for runtime contract, runtime data boundary registry, project registry: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/runtime-data-boundary-registry.json`: `self_documenting`.
- `cargo check`: 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. `check-runtime-contract.mjs`가 check chain의 첫 단계로 실행됨.
- `python3 _tools/structure-audit/src/structure_audit.py --check`: `clean`, warnings 없음.
- `git diff --check`: 통과.
- `check-omissions`: `coverage_ready`.
- `check-resources`: `resource_ready`.
- `evaluate-work`: `ready_to_close`.

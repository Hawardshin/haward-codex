# Runtime Data Boundary 검증

## 예정 검증

- `python3 -m json.tool platform-desktop-app/configs/runtime-data-boundary-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/runtime-data-boundary-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `cargo test`
- `cargo build`
- `npm --prefix platform-desktop-app run tauri:build`
- `git diff --check`

## 결과

- `python3 -m json.tool platform-desktop-app/configs/runtime-data-boundary-registry.json`: 통과.
- `check-config-contract ../platform-desktop-app/configs/runtime-data-boundary-registry.json`: `self_documenting`, gap 없음.
- `check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`, gap 없음.
- `npm --prefix platform-desktop-app test`: 9개 test 통과.
- `npm --prefix platform-desktop-app run check`: `ready_for_dependency_install_audit`, failure 없음.
- `cargo test`: 통과.
- `cargo build`: 통과.
- `npm --prefix platform-desktop-app run tauri:build`: 통과. `.app`과 DMG bundle 생성.
- `codesign --verify --deep --strict --verbose=2 platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`: 통과.
- `hdiutil verify platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`: 통과.
- `npm --prefix workspace-monitor run check`: 통과.
- `npm --prefix workspace-monitor test`: 13개 test 통과.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: `docs_ready`, gap 없음.
- `check-grounding`: `ready_to_publish`, gap 없음.
- `check-omissions`: `coverage_ready`, gap 없음.
- `check-resources`: `resource_ready`, gap 없음.
- `evaluate-work`: `ready_to_close`, gap 없음.
- `git diff --check`: 통과.

## 제한

- 이번 slice는 runtime storage adapter 구현이 아니라, 제품 경계와 향후 구현 gate를 고정한다.
- public macOS distribution readiness는 아직 Developer ID signing, notarization, stapling 검증이 필요하다. 이번 빌드는 local/internal ad-hoc signing 검증이다.

# 2026-06-07 작업 요약: 앱 셸 Rust 모듈 분리

## 변경 요약

- `HealthStatus`, `InstallerShellRuntimeContractReport`, `app_health`, `get_installer_shell_runtime_contract`, `get_rust_runtime_feature_map`을 `features/app_shell.rs`로 이동했다.
- `features::app_shell`을 `pub(crate)`로 공개하고 `lib.rs`의 `generate_handler!` 등록 경로를 새 모듈로 바꿨다.
- `source-structure.mjs`에 `tauriAppShell`을 runtime source aggregate로 추가했다.
- `check-readiness.mjs`, `check-runtime-contract.mjs`, `readiness.test.mjs`, `tool-studio.test.mjs`가 `lib.rs`만이 아니라 runtime source aggregate를 검사하도록 조정했다.
- 반복 패키징에서 stale final/intermediate DMG를 정리하고, Tauri bundling 실패 시 `bundle_dmg.sh --skip-jenkins`로 DMG를 재생성하는 `tauri-build-with-dmg-recovery.mjs`를 추가했다.
- `tauriPreparedBuildStep`이 직접 Tauri CLI를 호출하지 않고 prepared build wrapper를 호출하도록 바꿨다.

## 기능 유지 포인트

- Tauri invoke command 이름은 그대로 유지했다.
- runtime contract command surface 값은 바꾸지 않았다.
- installer shell contract 읽기 경로와 response schema는 유지했다.

## 패키징 이슈 처리

첫 내부 패키징 시도는 DMG bundling 단계에서 실패했다. generated DMG 중간 상태를 cleanup하고 동일 DMG script를 수동 재현해 원인을 좁힌 뒤, 파이프라인에 자동 cleanup/recovery wrapper를 추가했다. 공식 `desktop:package:run:internal` 성공, `tauri:build:prepared` 반복 실행 성공, `.app` codesign verify, `.dmg` hdiutil verify까지 확인했다.

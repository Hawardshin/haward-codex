# 검증 기록

## 현재 통과

- `corepack pnpm --filter platform-desktop-app test`: 통과, 24 tests.
- `cd platform-desktop-app/src-tauri && cargo check`: 통과.
- `cd platform-desktop-app/src-tauri && cargo test`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과, `self_documenting`.
- `corepack pnpm --filter workspace-monitor run collect`: 통과, developer public snapshot 생성.
- `corepack pnpm run desktop:package:internal`: 통과.

## 내부 패키징 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
- `codesign --verify --deep --strict`: 통과.
- `hdiutil verify`: 통과.

## 패키징 파이프라인 세부 통과

- Workspace Monitor type/check/lazy/scroll/source-control/history payload checks: 통과.
- Workspace Monitor tests: 통과, 63 tests.
- Customer renderer build and customer bundle audit: 통과.
- Developer/customer intent-map checks: 통과.
- Desktop app tests: 통과.
- Service readiness internal gate: public release warning만 남고 internal blockers 없음.
- Rust tests/build/release build: 통과.

## 확인한 코드 계약

- `CliSession`과 `NativePtySession`에 Drop guard가 있다.
- CLI session cleanup은 `dispose_cli_session_runtime`과 `finalize_finished_cli_session_runtime`을 통과한다.
- Native PTY cleanup은 `dispose_native_pty_session_runtime`과 `finalize_finished_native_pty_runtime`을 통과한다.
- Unix/macOS CLI spawn은 `process_group(0)`을 사용한다.
- timeout/error cleanup은 `kill_child_process_tree`와 `kill_and_wait_child`를 사용한다.
- PTY `master`는 `Option`으로 전환되어 finished/cancel/drop 시 명시 drop된다.

## 남은 리스크

- Windows process tree kill은 이번 macOS 중심 변경 범위 밖이다.
- 실제 장기 반복 실행에서 FD/RSS 카운터를 자동 측정하는 stress test는 후속 resource diagnostic로 남긴다.
- 공개 배포 signing/notarization/updater/clean-machine smoke warning은 기존 public release gate로 남는다.

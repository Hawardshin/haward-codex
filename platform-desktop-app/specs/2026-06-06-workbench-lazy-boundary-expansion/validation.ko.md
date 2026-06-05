# 검증: Workbench lazy boundary 확장

## 통과한 명령

- `corepack pnpm --filter platform-desktop-app check`
  - 결과: 통과
  - 내부 서비스 readiness: `service_internal_ready_public_blocked`
  - 남은 public blockers: signing/notarization, signed updater, clean-machine smoke
- `corepack pnpm --filter platform-desktop-app test`
  - 결과: 통과, 22개 테스트 pass
- `corepack pnpm --filter platform-desktop-app run package:internal`
  - 결과: 통과
  - 포함 검증: workspace-monitor check, workspace-monitor 59 tests, customer renderer build, customer bundle audit, desktop 22 tests, desktop check, Rust test, Rust build, Tauri build
  - 산출물:
    - `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
    - `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
  - `codesign --verify --deep --strict`: 통과
  - `hdiutil verify`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:budget`
  - 결과: 통과
  - largest chunk: 734,386 bytes
  - chunk count: 38
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:sections`
  - 결과: 통과
  - CPU throttle: 6
  - average: 487.8ms
  - p95: 713.2ms
  - max resident panels: 5
  - max mounted panels: 5
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:buttons`
  - 결과: 통과
  - synthetic sample count: 64
  - synthetic feedback p95: 1.5ms
  - synthetic painted p95: 49.6ms
  - real click feedback p95: 54.8ms
  - failed feedback count: 0

## 패키징 메모

내부 `.app`와 `.dmg`는 생성 및 검증됐다. 공개 배포 readiness는 기존 정책대로 Developer ID signing, notarization, updater, clean-machine smoke가 필요하다.

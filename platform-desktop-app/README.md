# 플랫폼 데스크톱 앱

한국어 기본 README입니다. 영어 문서는 [README.en.md](./README.en.md)에 따로 있습니다.

## 이 프로젝트의 목적

`platform-desktop-app/`는 개인 에이전트 빌딩 플랫폼을 사용자가 설치해서 실행하는 데스크톱 앱으로 제품화하는 프로젝트입니다.

이 앱은 단순히 한 CLI를 감싸는 wrapper가 아닙니다. 앱이 먼저 실행되고 workspace state, task state, decision inbox, artifact, validation, accumulated data, UI authority를 소유합니다. Codex CLI, Claude Code CLI, Gemini CLI, OpenCode 같은 외부 도구는 앱 위에 붙는 선택형 guest adapter입니다.

## 바로 쓰는 명령

처음 받았거나 의존성/browser runtime만 맞추려면 repository root에서 실행합니다.

```bash
corepack pnpm run desktop:setup
```

처음 설정 후 전체 검증까지 한 번에 실행하려면:

```bash
corepack pnpm run desktop:setup:verify
```

반복 개발 중 빠른 검증만 하려면:

```bash
corepack pnpm run desktop:verify:quick
```

이미 의존성이 설치되어 있고 개발 검증만 다시 하려면:

```bash
corepack pnpm run desktop:verify
```

Tauri packaging 없이 customer renderer만 다시 만들고 audit하려면:

```bash
corepack pnpm run desktop:renderer:build
```

설치/빌드가 막힌 지점을 빠르게 진단하려면:

```bash
corepack pnpm run desktop:doctor
```

내부 테스트용 `.app`/DMG까지 한 번에 만들려면:

```bash
corepack pnpm run desktop:package:internal
```

공개 배포 가능 여부를 report-only로 확인하려면:

```bash
corepack pnpm run desktop:release:report
```

명령 실행 순서를 보기만 하려면:

```bash
corepack pnpm --filter platform-desktop-app run pipeline:dry-run
```

## 명령이 하는 일

`desktop:setup`은 desktop app 경로에 필요한 workspace dependency를 lockfile 기준으로 설치하고, Workspace Monitor Playwright Chromium headless shell을 설치합니다.

`desktop:verify:quick`은 renderer/Rust rebuild 없이 Workspace Monitor check/test와 desktop app test/check만 실행합니다.

`desktop:doctor`는 Node, pnpm, Rust/Cargo, Tauri CLI, Playwright browser cache, customer bundle boundary, internal/public release gate 상태를 빠르게 점검합니다. public release signing/notarization/updater/clean-machine smoke는 warning으로 보고하고 local/internal 개발 검증 실패로 취급하지 않습니다.

`desktop:verify`는 다음을 순서대로 실행합니다.

- Workspace Monitor typecheck/test
- customer renderer build와 customer bundle audit
- developer/customer snapshot 검사
- desktop app Node tests
- runtime contract/readiness/customer bundle/internal release/service readiness check
- Rust `cargo test`

`desktop:package:internal`은 `desktop:verify`를 통과한 뒤 Rust build, prepared-renderer Tauri build, macOS `codesign` verification, DMG `hdiutil verify`를 실행합니다. Tauri 직접 빌드(`corepack pnpm --filter platform-desktop-app run tauri:build`)는 여전히 renderer build를 먼저 실행하지만, pipeline 패키징은 이미 audit된 renderer output을 재사용해서 중복 Next.js build를 피합니다.

## 빌드 Pipeline 구조

- `scripts/desktop-pipeline.mjs`: CLI entrypoint
- `scripts/desktop-pipeline/paths.mjs`: repository, Tauri, artifact, prepared build config 경로
- `scripts/desktop-pipeline/definitions.mjs`: setup, quick verify, full verify, package, public report 단계 정의
- `scripts/desktop-pipeline/runner.mjs`: dry-run, platform skip, subprocess 실행과 실패 처리

생성되는 내부 테스트 artifact는 다음 위치입니다.

```text
platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app
platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg
```

현재 macOS build는 local/internal test용 ad-hoc signing입니다. 공개 배포 준비 완료라고 부르면 안 됩니다.

## 실제 배포 문서

실제 배포 절차는 아래 runbook을 기준으로 봅니다.

- 한국어: [docs/release-runbook.ko.md](./docs/release-runbook.ko.md)
- English: [docs/release-runbook.en.md](./docs/release-runbook.en.md)

공개 배포는 다음 gate가 끝나기 전까지 blocked입니다.

- Developer ID 또는 동등한 OS signing
- macOS notarization과 필요한 경우 stapling
- Windows code signing / SmartScreen 대응
- signed updater channel
- clean-machine install/open/update/uninstall smoke test
- privacy/dependency/license review

## 제품 방향

- 제품의 중심은 monitoring dashboard가 아니라 `agent_capability_platform`입니다.
- primary feature는 agent orchestration, agent work environment, agent development environment, agent factory, learning/evaluation loop입니다.
- monitoring/history/requirements/structure는 Operator Center 또는 supporting observability로 분리합니다.
- 남은 P0 제품 gap은 [configs/product-gap-registry.json](./configs/product-gap-registry.json)에 고정되어 있습니다.

## 주요 파일

- 제품 기능 구조: [configs/product-feature-registry.json](./configs/product-feature-registry.json)
- 남은 제품 gap: [configs/product-gap-registry.json](./configs/product-gap-registry.json)
- 설치 shell runtime contract: [runtime-contracts/installer-shell-runtime-contract.json](./runtime-contracts/installer-shell-runtime-contract.json)
- macOS 실행 profile: [configs/macos-execution-profile.json](./configs/macos-execution-profile.json)
- Windows 실행 profile: [configs/windows-execution-profile.json](./configs/windows-execution-profile.json)
- renderer UI source: [renderer/workspace-monitor/](./renderer/workspace-monitor/)
- Tauri shell: [src-tauri/](./src-tauri/)

## 구조

```text
platform-desktop-app/
  README.md
  README.ko.md
  README.en.md
  artifacts/
  configs/
  docs/
  renderer/workspace-monitor/
  runtime-contracts/
  scripts/
  specs/
  src-tauri/
  tests/
```

## 현재 상태

- Tauri v2/Rust desktop shell이 선택된 제품 runtime입니다.
- `platform-desktop-app/renderer/workspace-monitor/`가 제품 renderer source입니다.
- 내부 검증과 내부 테스트용 빌드 경로는 준비되어 있습니다.
- 공개 배포는 signing, notarization, updater, clean-machine smoke gate가 남아 있습니다.

# 플랫폼 데스크톱 앱

한국어 기본 README입니다. 영어 문서는 [README.en.md](./README.en.md)에 따로 있습니다.

## 이 프로젝트의 목적

`platform-desktop-app/`는 여러 Git 작업공간과 AI 코딩 도구를 한곳에서 가져와 보고, 실행하고, 현재 작업 흐름을 추적하는 데스크톱 앱입니다.

이 앱은 단순히 한 CLI를 감싸는 wrapper가 아닙니다. 앱이 먼저 실행되고 Git workspace state, task timeline, terminal run state, decision inbox, evidence, report, validation, UI authority를 소유합니다. Codex CLI, Claude Code CLI, Cursor, Antigravity, Gemini CLI, OpenCode 같은 외부 도구는 선택형 guest adapter로 붙습니다.

에이전트 생성, 툴 플랫폼, Ollama 모델 관리, AWS AgentCore식 런타임/게이트웨이/아이덴티티 구현은 이 앱의 기본 사용자 화면이 아닙니다. 그런 기능은 `agent-platform/`이 소유하는 분리 플랫폼으로 다루고, 데스크톱 앱은 사용자가 현재 작업 중인 Git 레포지토리, 터미널 실행, 계획, 보고서, 근거 문서를 작업 순서대로 확인하는 흐름에 집중합니다.

## 바로 쓰는 명령

처음 받았거나 의존성/browser runtime만 맞추려면 repository root에서 실행합니다.

```bash
corepack pnpm run desktop:setup
```

처음 설정 후 전체 검증까지 한 번에 실행하려면:

```bash
corepack pnpm run desktop:setup:verify
```

개발 모드로 데스크톱 앱을 바로 실행하려면:

```bash
corepack pnpm run desktop:dev
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

이미 만든 내부 테스트용 `.app`을 실행하려면:

```bash
corepack pnpm run desktop:run:internal
```

내부 테스트용 `.app`/DMG를 만들고 바로 실행하려면:

```bash
corepack pnpm run desktop:package:run:internal
```

공개 배포 가능 여부를 report-only로 확인하려면:

```bash
corepack pnpm run desktop:release:report
```

로컬 개발자용 updater signing env scaffold를 만들려면:

```bash
corepack pnpm run desktop:release:dev-env
```

공개 배포용 signing/updater/notarization 환경변수가 준비된 상태에서 실제 public artifact를 만들려면:

```bash
corepack pnpm run desktop:package:public
```

명령 실행 순서를 보기만 하려면:

```bash
corepack pnpm --filter platform-desktop-app run pipeline:dry-run
```

## 명령이 하는 일

`desktop:setup`은 desktop app 경로에 필요한 workspace dependency를 lockfile 기준으로 설치하고, Workspace Monitor Playwright Chromium headless shell을 설치합니다.

`desktop:dev`는 Tauri 개발 모드로 앱을 실행하고 Workspace Monitor 개발 서버를 자동으로 띄웁니다.

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

`desktop:run:internal`은 `desktop:package:internal`로 만든 macOS `.app`을 엽니다. artifact가 없으면 먼저 `desktop:package:internal`을 실행하라고 실패 메시지를 냅니다.

`desktop:package:run:internal`은 내부 `.app`/DMG를 만든 뒤 바로 `desktop:run:internal`을 실행합니다.

`desktop:release:dev-env`는 Tauri updater dev key를 ignored `src-tauri/target/public-release/dev/` 아래에 만들고 `TAURI_SIGNING_PRIVATE_KEY_PATH`, `TAURI_UPDATER_PUBLIC_KEY`, `TAURI_UPDATER_ENDPOINTS`, `TAURI_RELEASE_ASSET_BASE_URL` export 파일을 생성합니다. 이 명령은 Apple Developer ID signing/notarization credential을 만들지 않으며 public-ready 상태를 의미하지 않습니다.

`desktop:package:public`은 `desktop:verify`와 public preflight를 통과한 뒤 `TAURI_UPDATER_PUBLIC_KEY`, `TAURI_SIGNING_PRIVATE_KEY` 또는 `TAURI_SIGNING_PRIVATE_KEY_PATH`, `TAURI_UPDATER_ENDPOINTS`, `TAURI_RELEASE_ASSET_BASE_URL`, Apple signing/notarization 환경변수로 public Tauri config를 임시 생성하고 signed updater artifact와 `latest.json` manifest를 생성합니다. private updater key와 Apple credential은 repository에 쓰지 않습니다.

## 빌드 Pipeline 구조

- `scripts/desktop-pipeline.mjs`: CLI entrypoint
- `scripts/desktop-pipeline/paths.mjs`: repository, Tauri, artifact, prepared build config 경로
- `scripts/desktop-pipeline/definitions.mjs`: setup, quick verify, full verify, package, public report 단계 정의
- `scripts/desktop-pipeline/runner.mjs`: dry-run, platform skip, subprocess 실행과 실패 처리
- `scripts/public-release-config.mjs`: public signing/updater env 검증과 Tauri config 생성
- `scripts/public-release-dev-env.mjs`: local developer updater signing env scaffold 생성
- `scripts/public-release-build.mjs`: public Tauri build 실행
- `scripts/create-updater-manifest.mjs`: static updater `latest.json` 생성

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

터미널 기능 사용법과 GPT/Gemini 계정 연결 절차는 [docs/usage/terminal-and-ai-provider-setup.ko.md](./docs/usage/terminal-and-ai-provider-setup.ko.md)를 봅니다.

공개 배포는 다음 gate가 끝나기 전까지 blocked입니다.

- Developer ID 또는 동등한 OS signing
- macOS notarization과 필요한 경우 stapling
- macOS entitlements file 연결
- Windows code signing / SmartScreen 대응
- signed updater channel: `TAURI_UPDATER_PUBLIC_KEY`, `TAURI_SIGNING_PRIVATE_KEY` 또는 `TAURI_SIGNING_PRIVATE_KEY_PATH`, `TAURI_UPDATER_ENDPOINTS`
- clean-machine install/open/update/uninstall smoke test
- privacy/dependency/license review

## 제품 방향

- 제품의 중심은 `workspace_tracker`입니다.
- 기본 사용자는 Git 작업공간 가져오기, 터미널/AI 도구 실행, 작업 타임라인, 보고서/근거, 요구사항/문서를 먼저 봅니다.
- Codex, Claude Code, Cursor, Antigravity 등은 선택형 guest AI 도구이며 앱 자체의 단일 종속성이 아닙니다.
- agent factory, root tool management, Ollama model management, provider direct agent run, AWS AgentCore식 runtime lifecycle은 `agent-platform/`으로 분리합니다.
- 남은 P0 제품 gap은 [configs/product-gap-registry.json](./configs/product-gap-registry.json)에 고정되어 있습니다.

## 주요 파일

- 제품 기능 구조: [configs/product-feature-registry.json](./configs/product-feature-registry.json)
- 작업공간 제품 분리 구조: [configs/workspace-tracker-product-split-registry.json](./configs/workspace-tracker-product-split-registry.json)
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

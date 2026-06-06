# 데스크톱 앱 빌드/테스트/배포 Runbook

## 목적

이 문서는 `platform-desktop-app`를 직접 빌드하고 테스트하거나 내부 테스트용 `.app`/DMG를 만드는 절차를 한 번에 실행할 수 있게 정리한다.

## 빠른 명령

repository root에서 실행한다.

| 목적 | 명령 |
| --- | --- |
| 처음 설정만 실행 | `corepack pnpm run desktop:setup` |
| 처음 설정 + 전체 개발 검증 | `corepack pnpm run desktop:setup:verify` |
| 개발 모드 실행 | `corepack pnpm run desktop:dev` |
| 빠른 반복 검증 | `corepack pnpm run desktop:verify:quick` |
| 전체 개발 검증 | `corepack pnpm run desktop:verify` |
| customer renderer build/audit만 실행 | `corepack pnpm run desktop:renderer:build` |
| 설치/빌드 상태 빠른 진단 | `corepack pnpm run desktop:doctor` |
| 내부 테스트용 `.app`/DMG 빌드 | `corepack pnpm run desktop:package:internal` |
| 빌드된 내부 `.app` 실행 | `corepack pnpm run desktop:run:internal` |
| 내부 `.app`/DMG 빌드 후 실행 | `corepack pnpm run desktop:package:run:internal` |
| 공개 배포 gate report-only 확인 | `corepack pnpm run desktop:release:report` |
| 로컬 개발자용 updater env scaffold 생성 | `corepack pnpm run desktop:release:dev-env` |
| 공개 배포용 signed updater artifact 빌드 | `corepack pnpm run desktop:package:public` |
| 실행될 명령 순서만 확인 | `corepack pnpm --filter platform-desktop-app run pipeline:dry-run` |

## 내부 테스트 빌드 절차

`desktop:package:internal`은 다음 순서로 실행된다.

1. Workspace Monitor typecheck, test, customer build를 실행한다.
2. customer bundle audit와 developer/customer snapshot boundary를 검사한다.
3. Desktop app Node test와 readiness check를 실행한다.
4. Rust `cargo test`와 `cargo build`를 실행한다.
5. 이미 audit된 renderer output을 재사용하는 prepared-renderer Tauri build로 내부 테스트용 `.app`/DMG를 만든다.
6. macOS에서는 `.app` signature를 `codesign`으로 검증하고 DMG를 `hdiutil verify`로 확인한다.

직접 `corepack pnpm --filter platform-desktop-app run tauri:build`를 실행하면 Tauri `beforeBuildCommand`가 customer renderer build/audit를 먼저 실행한다. `desktop:package:internal`은 `desktop:verify`에서 만든 renderer output을 다시 감사한 뒤 재사용하므로 같은 Next.js build를 두 번 돌리지 않는다.

생성 artifact:

```text
platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app
platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg
```

이 artifact는 내부 테스트용이다. 현재 설정은 macOS ad-hoc signing을 사용하므로 일반 사용자 공개 배포 준비 완료로 표현하지 않는다.

## 공개 배포 절차

공개 배포 전에 다음 command로 현재 gate를 확인한다.

```bash
corepack pnpm run desktop:release:report
```

updater signing/env 쪽을 로컬에서 먼저 준비하려면 다음 command를 실행한다.

```bash
corepack pnpm run desktop:release:dev-env
source platform-desktop-app/src-tauri/target/public-release/dev/public-release-dev.env.sh
```

이 developer env scaffold는 ignored `src-tauri/target/public-release/dev/` 아래에 dev updater key를 만들고 private key content 대신 `TAURI_SIGNING_PRIVATE_KEY_PATH`만 export한다. Apple Developer ID signing/notarization credential은 생성하지 않으므로 공개 배포 준비 완료로 간주하면 안 된다.

공개 배포가 가능하려면 다음 gate가 실제로 통과해야 한다.

- Developer ID 또는 동등한 OS signing identity 준비
- macOS hardened runtime, notarization, 필요한 경우 stapling
- `src-tauri/Entitlements.plist`에 공개 배포 entitlements가 명시되어 있고 Tauri config가 이를 참조
- Windows code signing과 SmartScreen 대응
- signed updater channel과 update rollback 계획
- clean-machine install/open/update/uninstall smoke test
- privacy, dependency, license review
- installer에 token, webhook URL, browser cookie, `_private/` 내용, platform source payload가 들어가지 않는지 확인

`desktop:package:public`은 다음 환경변수를 요구한다.

| 범위 | 환경변수 |
| --- | --- |
| macOS signing | `APPLE_SIGNING_IDENTITY` 또는 `APPLE_CERTIFICATE` + `APPLE_CERTIFICATE_PASSWORD` |
| notarization | `APPLE_ID` + `APPLE_PASSWORD` + `APPLE_TEAM_ID` 또는 `APPLE_API_KEY` + `APPLE_API_ISSUER` + `APPLE_API_KEY_PATH` |
| updater verification | `TAURI_UPDATER_PUBLIC_KEY` |
| updater signing | `TAURI_SIGNING_PRIVATE_KEY` 또는 `TAURI_SIGNING_PRIVATE_KEY_PATH`, 선택 `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` |
| updater endpoint | `TAURI_UPDATER_ENDPOINTS` |
| static manifest asset URL | `TAURI_RELEASE_ASSET_BASE_URL` |
| release notes | 선택 `TAURI_RELEASE_NOTES` |

public build는 `src-tauri/target/public-release/tauri.public.generated.json`와 `service-update-channel.json`를 임시 생성한다. 이 파일에는 public key hash, endpoint, signing identity 존재 여부만 들어가며 private updater key와 Apple credential은 쓰지 않는다. build가 끝나면 Tauri updater artifact `.app.tar.gz`, `.sig`, static `latest.json`가 `src-tauri/target/release/bundle/` 아래에 생긴다.

## 외부 기준

- Tauri v2 배포 문서: https://v2.tauri.app/distribute/
- Tauri v2 macOS signing/notarization 문서: https://v2.tauri.app/distribute/sign/macos/
- Tauri updater 문서: https://v2.tauri.app/plugin/updater/
- Apple macOS code signing/notarization 설명: https://support.apple.com/guide/security/app-code-signing-process-sec3ad8e6e53/web

## 실패했을 때

- `workspace-monitor` build 실패: `platform-desktop-app/renderer/workspace-monitor/`의 TypeScript, snapshot, customer boundary를 먼저 본다.
- `check-customer-bundle` 실패: customer snapshot이나 `out/`에 내부 source/path/private content가 들어간 것이다.
- `release:public:report`가 blocked: public signing/notarization/updater/clean-machine gate가 아직 남은 것이다. 이 상태는 정상이며 public-ready라고 말하면 안 된다.
- `package:public`이 env blocker로 실패: 위 환경변수를 먼저 설정한다. 개발자는 `desktop:release:dev-env`로 updater key path env를 만들 수 있지만, Apple signing/notarization credential은 직접 준비해야 한다.
- `cargo` 실패: `platform-desktop-app/src-tauri/`에서 Rust toolchain과 Tauri command compile error를 확인한다.

## 금지

- signing/notarization 없이 public-ready라고 표현하지 않는다.
- Apple signing key, updater private key, webhook token, browser cookie를 repository나 installer payload에 넣지 않는다.
- 사용자가 선택하지 않은 workspace path를 runtime data나 support bundle에 raw로 노출하지 않는다.

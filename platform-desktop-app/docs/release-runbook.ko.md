# 데스크톱 앱 빌드/테스트/배포 Runbook

## 목적

이 문서는 `platform-desktop-app`를 직접 빌드하고 테스트하거나 내부 테스트용 `.app`/DMG를 만드는 절차를 한 번에 실행할 수 있게 정리한다.

## 빠른 명령

repository root에서 실행한다.

| 목적 | 명령 |
| --- | --- |
| 처음 설정 + 전체 개발 검증 | `corepack pnpm run desktop:setup:verify` |
| 의존성 설치 후 개발 검증 | `corepack pnpm run desktop:verify` |
| 내부 테스트용 `.app`/DMG 빌드 | `corepack pnpm run desktop:package:internal` |
| 공개 배포 gate report-only 확인 | `corepack pnpm run desktop:release:report` |
| 실행될 명령 순서만 확인 | `corepack pnpm --filter platform-desktop-app run pipeline:dry-run` |

## 내부 테스트 빌드 절차

`desktop:package:internal`은 다음 순서로 실행된다.

1. Workspace Monitor typecheck, test, customer build를 실행한다.
2. developer/customer snapshot boundary를 검사한다.
3. Desktop app Node test와 readiness check를 실행한다.
4. Rust `cargo test`와 `cargo build`를 실행한다.
5. Tauri `tauri build`로 내부 테스트용 `.app`/DMG를 만든다.
6. macOS에서는 `.app` signature를 `codesign`으로 검증하고 DMG를 `hdiutil verify`로 확인한다.

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

공개 배포가 가능하려면 다음 gate가 실제로 통과해야 한다.

- Developer ID 또는 동등한 OS signing identity 준비
- macOS hardened runtime, notarization, 필요한 경우 stapling
- Windows code signing과 SmartScreen 대응
- signed updater channel과 update rollback 계획
- clean-machine install/open/update/uninstall smoke test
- privacy, dependency, license review
- installer에 token, webhook URL, browser cookie, `_private/` 내용, platform source payload가 들어가지 않는지 확인

## 외부 기준

- Tauri v2 배포 문서: https://v2.tauri.app/distribute/
- Tauri v2 macOS signing/notarization 문서: https://v2.tauri.app/distribute/sign/macos/
- Tauri updater 문서: https://v2.tauri.app/plugin/updater/
- Apple macOS code signing/notarization 설명: https://support.apple.com/guide/security/app-code-signing-process-sec3ad8e6e53/web

## 실패했을 때

- `workspace-monitor` build 실패: `platform-desktop-app/renderer/workspace-monitor/`의 TypeScript, snapshot, customer boundary를 먼저 본다.
- `check-customer-bundle` 실패: customer snapshot이나 `out/`에 내부 source/path/private content가 들어간 것이다.
- `release:public:report`가 blocked: public signing/notarization/updater/clean-machine gate가 아직 남은 것이다. 이 상태는 정상이며 public-ready라고 말하면 안 된다.
- `cargo` 실패: `platform-desktop-app/src-tauri/`에서 Rust toolchain과 Tauri command compile error를 확인한다.

## 금지

- signing/notarization 없이 public-ready라고 표현하지 않는다.
- Apple signing key, updater private key, webhook token, browser cookie를 repository나 installer payload에 넣지 않는다.
- 사용자가 선택하지 않은 workspace path를 runtime data나 support bundle에 raw로 노출하지 않는다.

# 2026-06-06 평가: Public Release Updater Automation

## 결과

- public release updater automation lane을 구현했다.
- internal build path는 유지했고, public build path는 외부 signing/updater/notarization env가 없으면 실패하도록 만들었다.
- updater private key와 Apple credential은 repository에 쓰지 않는 구조로 구현했다.

## 검증

- `node scripts/public-release-config.mjs --report-only`: 통과.
- `corepack pnpm --filter platform-desktop-app run release:preflight:public:report`: 통과.
- `cargo check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- config contract checks: 통과.
- `corepack pnpm --filter platform-desktop-app run package:internal`: 통과. `.app`/DMG 생성, codesign verify, hdiutil verify 포함.

## 남은 위험

- 실제 public release 성공은 Apple Developer credential, updater signing key, release asset hosting, clean-machine smoke가 필요하다.
- public artifact 실제 notarization은 외부 credential이 제공된 뒤 `desktop:package:public`로 별도 검증해야 한다.

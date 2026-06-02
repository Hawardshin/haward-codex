# Runtime Data Feature 검증 계획

## 명령

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build:customer`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `cd platform-desktop-app/src-tauri && cargo test`
- `cd platform-desktop-app/src-tauri && cargo build`
- `npm --prefix platform-desktop-app run tauri:build`
- `codesign --verify --deep --strict platform-desktop-app/src-tauri/target/release/bundle/macos/Agent\ Workspace\ Platform.app`
- `hdiutil verify platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent\ Workspace\ Platform_0.1.0_aarch64.dmg`

## 수용 기준

- public `workspace-snapshot.json`의 `sourceFiles`와 `documents`가 customer build에서 0개다.
- Rust build가 app data runtime roots, payload audit, support bundle commands와 함께 통과한다.
- readiness가 새 명령, UI token, customer snapshot token을 확인한다.

## 결과

- `npm --prefix workspace-monitor test`: passed, 14 tests.
- `npm --prefix workspace-monitor run check`: passed.
- `npm --prefix workspace-monitor run build:customer`: passed.
- customer public snapshot inspection: `sourceFiles=0`, `documents=0`, `historyDays=0`, `projects=0`, `defaultView=user`.
- `npm --prefix platform-desktop-app test`: passed, 9 tests.
- `npm --prefix platform-desktop-app run check`: passed.
- `npm --prefix platform-desktop-app run customer-bundle:audit`: pending in follow-up improvement slice.
- `npm --prefix platform-desktop-app run release:preflight`: pending in follow-up improvement slice.
- `npm --prefix platform-desktop-app run release:preflight:public:report`: pending in follow-up improvement slice.
- `cd platform-desktop-app/src-tauri && cargo test`: passed.
- `cd platform-desktop-app/src-tauri && cargo build`: passed.
- `npm --prefix platform-desktop-app run tauri:build`: passed.
- `codesign --verify --deep --strict`: passed.
- `hdiutil verify`: VALID.
- `git diff --check`: passed.

## 추가 보강 결과

- `npm --prefix platform-desktop-app test`: passed, 12 tests.
- `npm --prefix platform-desktop-app run check`: passed; readiness, customer bundle audit, internal release preflight 모두 통과.
- `npm --prefix platform-desktop-app run release:preflight:public:report`: `public_release_blocked`; Developer ID signing identity/APPLE_CERTIFICATE와 Apple notarization credentials만 blocker로 남음.

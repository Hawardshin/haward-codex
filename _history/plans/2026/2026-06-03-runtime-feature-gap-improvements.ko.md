# 계획: Runtime Feature Gap Improvements

## 보강 대상

- Tauri `frontendDist` customer static output audit.
- Internal/public release readiness preflight.
- Hardened runtime parity for local/internal macOS build.

## 제외

- Developer ID certificate 발급.
- Apple notarization credential 저장 또는 notarization submission.
- Windows installer smoke.

## 검증

- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app run customer-bundle:audit`
- `npm --prefix platform-desktop-app run release:preflight`
- `npm --prefix platform-desktop-app run release:preflight:public:report`
- `npm --prefix platform-desktop-app run tauri:build`
- `codesign --verify --deep --strict`
- `codesign -dv --verbose=4`
- `hdiutil verify`

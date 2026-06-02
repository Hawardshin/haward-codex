# Request Trace: Runtime Feature Gap Improvements

## 요청

- 사용자 요청 요약 ID: `UR-2026-06-03-010`
- 요지: 앞서 구현한 기능 중 부족한 부분을 개선하라는 요청.

## 결과

- Tauri `frontendDist`로 임베드될 customer static output을 별도 audit gate로 확인하도록 `check-customer-bundle.mjs`를 추가했다.
- `monitor:build`가 customer build 후 audit을 필수로 실행하도록 연결했다.
- `check-release-readiness.mjs`를 추가해 internal/local build와 public distribution blocker를 분리해 보고한다.
- macOS local/internal build에도 `hardenedRuntime: true`를 켜 public release path와 더 가깝게 맞췄다.

## 검증

- `npm --prefix platform-desktop-app test`: 통과, 12 tests.
- `npm --prefix platform-desktop-app run check`: 통과.
- `npm --prefix platform-desktop-app run customer-bundle:audit`: `customer_bundle_ready`.
- `npm --prefix platform-desktop-app run release:preflight`: `internal_release_preflight_ready`.
- `npm --prefix platform-desktop-app run release:preflight:public:report`: `public_release_blocked`; 남은 blocker는 Developer ID/APPLE_CERTIFICATE와 notarization credentials.
- `npm --prefix workspace-monitor run check`: 통과.
- `npm --prefix platform-desktop-app run tauri:build`: 통과.
- `codesign --verify --deep --strict`: 통과.
- `codesign -dv --verbose=4`: `Runtime Version=14.4.0`, `Signature=adhoc`.
- `hdiutil verify`: VALID.
- customer snapshots: `sourceFiles=0`, `documents=0`, `projects=0`.

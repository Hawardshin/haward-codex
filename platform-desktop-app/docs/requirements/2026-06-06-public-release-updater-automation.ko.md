# 2026-06-06 Public Release Updater Automation 요구사항

## 요구사항

- `PRU-REQ-001`: public release path는 Tauri updater plugin을 사용해 signed updater artifact 생성이 가능해야 한다.
- `PRU-REQ-002`: updater private key와 Apple signing/notarization credential은 repository나 installer marker에 쓰면 안 된다.
- `PRU-REQ-003`: public build는 `TAURI_UPDATER_PUBLIC_KEY`, `TAURI_SIGNING_PRIVATE_KEY`, `TAURI_UPDATER_ENDPOINTS`, `TAURI_RELEASE_ASSET_BASE_URL`, Apple signing/notarization env가 없으면 명확히 실패해야 한다.
- `PRU-REQ-004`: internal build는 기존 ad-hoc signing/test path를 유지해야 한다.
- `PRU-REQ-005`: public build는 static `latest.json` manifest 생성과 macOS codesign/DMG/stapler/Gatekeeper 검증 단계를 pipeline에 포함해야 한다.
- `PRU-REQ-006`: macOS hardened runtime과 entitlements file 연결이 Tauri config와 readiness check에 고정되어야 한다.
- `PRU-REQ-007`: public build는 signing/updater/notarization env가 없을 때 expensive renderer/Rust verification 전에 fail fast 해야 한다.

## 제외

- Apple Developer 계정 생성, 인증서 발급, notarization credential 생성은 외부 계정 권한이 필요하므로 자동 완료 대상이 아니다.
- clean-machine smoke는 별도 물리/가상 머신과 release asset upload가 필요하므로 이번 구현에서는 gate로 유지한다.

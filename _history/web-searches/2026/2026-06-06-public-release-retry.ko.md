# 2026-06-06 Web Search: Public Release Retry

## Query

- `Tauri v2 updater signing private key environment variable createUpdaterArtifacts latest.json official docs`
- `Tauri v2 macOS signing notarization APPLE_ID APPLE_API_KEY stapler official docs`
- `Tauri v2 signer generate updater private key official docs`

## 확인한 출처

- Tauri updater plugin: https://v2.tauri.app/plugin/updater/
- Tauri macOS signing/notarization: https://v2.tauri.app/distribute/sign/macos/
- Tauri CLI signer reference: https://v2.tauri.app/reference/cli/
- Apple Developer ID: https://developer.apple.com/developer-id/

## Plan Impact

- Tauri updater private key와 Apple notarization credential은 외부 secret/account state이므로 현재 로컬 환경에 없으면 public build가 실패해야 한다.
- 재시도 결과 public package가 preflight 전에 expensive verification을 수행하는 문제가 확인되어 fail-fast 순서 변경으로 대응한다.

## Public Decision Summary

실제 public package를 다시 실행하되, 이후부터는 credential/env가 없으면 renderer/Rust 검증 전에 즉시 실패하도록 pipeline 순서를 바꾼다.

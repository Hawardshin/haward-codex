# 2026-06-06 Request Trace: Public Release Retry

## 요청

- “다시 해봐”

## 실행

- 최신 Tauri updater/signing 문서를 다시 확인했다.
- local env와 Keychain Developer ID identity 존재 여부를 값 노출 없이 확인했다.
- `corepack pnpm run desktop:package:public`을 실제 실행했다.

## 결과

- Workspace Monitor check/test/build, desktop tests/check, Rust tests는 통과했다.
- public preflight에서 Apple signing/notarization env, Tauri updater key/endpoint/release asset URL 부재로 실패했다.
- `package-public` pipeline을 fail-fast로 바꿔 public preflight가 expensive verification보다 먼저 실행되도록 수정했다.

## 남은 조건

- Apple Developer ID identity 또는 certificate.
- Apple notarization credential.
- Tauri updater signing private key/public key.
- HTTPS updater endpoint와 release asset base URL.

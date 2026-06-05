# 2026-06-06 Request Trace: Public Release Developer Repatch

## 실행

- 최신 Tauri updater/signing/CLI 및 Apple signing 기준을 다시 확인했다.
- Tauri CLI `signer generate --help`와 temporary key generation output을 확인했다.
- `TAURI_SIGNING_PRIVATE_KEY_PATH`를 `public-release-config.mjs`와 release preflight에서 지원하도록 수정했다.
- `scripts/public-release-dev-env.mjs`와 `desktop:release:dev-env` 명령을 추가했다.
- README/runbook/readiness/doctor/tests/spec/history를 갱신했다.

## 결과

- 개발자는 `corepack pnpm run desktop:release:dev-env`로 ignored `src-tauri/target/public-release/dev/` 아래 dev updater key와 `public-release-dev.env.sh`를 만들 수 있다.
- generated env file은 private key content를 쓰지 않고 `TAURI_SIGNING_PRIVATE_KEY_PATH`만 export한다.
- generated env를 source하면 updater private key/public key/endpoint/base URL checks는 통과하고 Apple Developer ID signing/notarization blocker만 남는다.

## 남은 조건

- 실제 공개 배포는 Apple Developer ID signing identity/certificate와 Apple notarization credential이 필요하다.

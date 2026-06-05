# Public Release Updater Automation Plan

1. web-first intake로 Tauri updater/signing/notarization/entitlements 공식 문서를 확인한다.
2. 기존 release readiness, service readiness, desktop pipeline 구조를 점검한다.
3. updater plugin dependency를 설치 감사와 함께 추가한다.
4. public env validation, generated config, public build, static manifest scripts를 구현한다.
5. Rust plugin init과 macOS entitlements를 연결한다.
6. readiness scripts/tests/docs/history를 갱신한다.
7. `cargo check`, desktop tests/check, public report, internal package build를 실행한다.
8. commit/push로 마무리한다.

# macOS 실행 구조 조사 노트

## 요약

macOS에서 일반 사용자가 다운로드 후 실행할 수 있는 앱을 만들려면 local run, internal test, public distribution을 명확히 나눠야 한다. 개발 중에는 unsigned/ad-hoc signed 앱으로도 확인할 수 있지만, public outside-App-Store 배포는 Developer ID signing, hardened runtime, notarization, Gatekeeper-enabled launch test를 release gate로 둬야 한다.

## 핵심 판단

- Tauri는 현재 플랫폼에 적합한 1순위 shell 후보다. 이미 `workspace-monitor`가 Next.js UI를 갖고 있고, Tauri는 App Bundle과 DMG 및 macOS signing/notarization 경로를 제공한다.
- Electron은 fallback 후보로 유지한다. 풍부한 생태계가 장점이지만 runtime size와 update/signing 운영 부담이 있다.
- Python `agent-platform`은 desktop shell 안으로 무리하게 흡수하지 않고 sidecar/local service/command boundary로 분리해야 한다.
- optional CLI는 앱 실행 필수 조건이 아니다. 누락 시 해당 기능만 `capability_missing`으로 degrade해야 한다.

## 재사용 가능한 release gate

1. 사용자 workspace 선택 전 임의 폴더 scan 금지
2. local command execution allowlist와 timeout
3. token/signing credential/update key 저장소 저장 금지
4. Developer ID signing, hardened runtime, notarization
5. DMG/ZIP/PKG별 clean Mac open/install smoke test
6. update manifest/signature/rollback 검증 후 updater 활성화

## 주요 출처

- https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution
- https://developer.apple.com/documentation/security/hardened-runtime
- https://help.apple.com/xcode/mac/current/en.lproj/dev033e997ca.html
- https://v2.tauri.app/distribute/
- https://v2.tauri.app/distribute/sign/macos/
- https://v2.tauri.app/plugin/updater/
- https://www.electronjs.org/docs/latest/tutorial/code-signing
- https://www.electronjs.org/docs/latest/api/auto-updater/


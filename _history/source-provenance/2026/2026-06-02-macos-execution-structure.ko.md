# macOS 실행 구조 원천 provenance

| 값/주장 | 출처 | 접근일 | 신뢰도 | 사용 위치 |
| --- | --- | --- | --- | --- |
| Mac App Store 밖 배포는 Developer ID signing과 notarization으로 신뢰성을 높여야 하며 Gatekeeper-enabled Mac에서 launch test가 필요하다. | Xcode Help: Distribute outside the Mac App Store | 2026-06-02 | 높음, Apple 공식 | `macos-execution-profile.json` public release gate |
| notarization에는 hardened runtime이 필요하다. | Apple Developer Hardened Runtime, Xcode Help | 2026-06-02 | 높음, Apple 공식 | signing/notarization requirements |
| Tauri는 platform-specific installer, App Bundle, DMG, macOS signing/notarization path를 제공한다. | Tauri Distribute, Tauri macOS Code Signing | 2026-06-02 | 높음, framework 공식 | Tauri-first 구조 |
| ad-hoc signing은 개발/테스트에는 쓸 수 있으나 사용자 보안 설정 우회를 요구할 수 있다. | Tauri macOS Code Signing | 2026-06-02 | 높음, framework 공식 | local/internal/public level 분리 |
| updater는 manifest/signature/channel/rollback을 별도로 설계해야 한다. | Tauri Updater, Electron autoUpdater | 2026-06-02 | 높음, framework 공식 | update strategy gate |
| optional CLI는 앱 실행 필수 조건이 아니라 capability별 degrade 대상이다. | 내부 CLI adapter registry | 2026-06-02 | 중간, 내부 정책 | runtime boundaries |


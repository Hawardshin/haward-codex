# macOS 실행 구조 추적성

## 요청

- `UR-2026-06-02-027`: macOS에서 실행 가능한 구조가 필요하다.

## 요구사항

- 공유: `REQ-WS-069`
- 프로젝트: `PDA-REQ-007`

## 산출물

- 설정: `platform-desktop-app/configs/macos-execution-profile.json`
- 배포 registry: `platform-desktop-app/configs/desktop-distribution-registry.json`
- 문서: `platform-desktop-app/docs/macos-execution-structure.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-02-macos-execution-structure/`
- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-macos-execution-structure.ko.md`
- 출처 provenance: `_history/source-provenance/2026/2026-06-02-macos-execution-structure.ko.md`
- plan evidence: `_history/plan-evidence/2026/2026-06-02-macos-execution-structure.ko.md`
- 평가: `_history/evaluations/2026/2026-06-02-macos-execution-structure.ko.md`

## 근거 연결

- Apple Developer/Xcode 도움말: Developer ID signing, hardened runtime, notarization, Gatekeeper launch testing
- Tauri 공식 문서: App Bundle, DMG, signing/notarization, updater
- Electron 공식 문서: fallback signing/updater 비교


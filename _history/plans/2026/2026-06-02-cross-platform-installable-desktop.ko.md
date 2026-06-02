# 2026-06-02 크로스 플랫폼 설치형 데스크톱 플랫폼 계획

## work_mode

`governance`

## 선택 이유

요청은 설치형 제품 구조, 런타임 언어 선택, macOS/Windows 배포 정책, Codex/Claude Code/Cursor/Antigravity 도구 중립성, memory bootstrap, 요구사항, 스펙, 검증 게이트를 바꾸므로 `governance`가 맞다.

## 핵심 결정

- 데스크톱 셸: Tauri v2/Rust.
- UI: `workspace-monitor` 정적 export 재사용.
- 플랫폼 계층: `agent-platform` Python 유지.
- 장기 실행 local service: 측정된 필요가 생기면 Go 후보.
- AI coding CLI: Codex, Claude Code, Cursor, Antigravity는 optional adapter capability.
- public-ready 주장 금지: signing/notarization/code-signing/clean-machine test 전까지는 scaffold 상태로만 표현.

## 계획 근거

- Tauri v2 공식 문서: platform-specific installer, Windows MSI/NSIS, sidecar, updater, config.
- Apple Developer 문서: macOS outside-App-Store distribution에는 Developer ID signing, hardened runtime, notarization gate가 필요.
- Microsoft Learn 문서: MSIX와 Windows package signing/trust requirements.
- 기존 내부 문서: `language-decision-registry.json`, `cli-adapter-registry.json`, `macos-execution-profile.json`, `user-flow-registry.json`.

## 실행 순서

1. 웹 검색으로 공식 문서와 후보를 확인한다.
2. 기존 platform desktop 구조와 runtime/CLI registry를 검토한다.
3. Windows execution profile을 추가한다.
4. 전문가 토론/architecture decision을 남긴다.
5. Tauri scaffold를 추가한다.
6. 요구사항, 스펙, memory bootstrap, persistent instructions, project registry를 갱신한다.
7. JSON/config/test/readiness 검증을 실행한다.
8. omission/resource/CLI/grounding/evaluator 기록을 남긴다.
9. 커밋 후 push한다.

## 병목과 보류

- Rust가 현재 설치되어 있지 않아 `tauri:dev`와 `tauri:build`는 보류한다.
- 실제 설치는 `_history/installations/` 감사 기록과 rollback 계획이 필요한 별도 단계다.
- Windows signed installer는 Windows build host/CI와 certificate가 준비되어야 한다.


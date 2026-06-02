# 2026-06-02 크로스 플랫폼 설치형 데스크톱 플랫폼 웹 검색 기록

## 요청

지금까지 만든 플랫폼을 macOS와 Windows에 설치 가능한 현실적인 소프트웨어 구조로 만들고, Codex, Claude Code, Cursor, Antigravity 같은 도구를 플랫폼 위에서 설정 가능한 구조로 정리해 달라는 요청.

## 검색 쿼리

- `Tauri v2 distribution macOS Windows installer updater sidecar official docs`
- `Apple notarize macOS software before distribution official developer documentation`
- `Microsoft MSIX packaging code signing Windows desktop apps official documentation`
- `Wails desktop app official docs Go webview packaging Windows macOS`
- `site:v2.tauri.app/distribute/ Tauri v2 distribute macOS Windows installer`
- `site:v2.tauri.app/develop/sidecar/ Tauri v2 sidecar external binaries`
- `site:v2.tauri.app/reference/config/ Tauri v2 config frontendDist beforeBuildCommand`
- `Claude Code CLI official documentation Anthropic install command`
- `OpenAI Codex CLI official documentation GitHub install`
- `Google Antigravity coding agent documentation CLI official`

## 확인한 주요 출처

| 출처 | 유형 | 적용 |
| --- | --- | --- |
| Tauri v2 Distribute, Windows Installer, Sidecar, Updater, Config 문서 | official docs | Tauri-first shell, MSI/NSIS, sidecar, updater, static UI 연결 판단 |
| Apple Developer notarization 문서 | official docs | macOS public distribution gate: Developer ID, hardened runtime, notarization |
| Microsoft Learn MSIX packaging/signing 문서 | official docs | Windows code signing, MSIX signing, distribution trust gate |
| Wails official docs | official docs | Go/Wails 후보 비교 |
| Anthropic Claude Code docs/help | official docs/help | Claude Code를 플랫폼 필수 런타임이 아닌 optional CLI capability로 취급 |
| OpenAI Codex CLI docs/help/GitHub | official docs/help/repo | Codex CLI를 optional CLI capability로 취급 |
| Google Antigravity CLI docs | official docs | Antigravity를 optional CLI capability로 취급 |

## 약한 출처로 처리한 것

- Reddit, 커뮤니티 글, 뉴스성 글은 배포 마찰과 실제 사용자 신호로만 참고했다.
- Wikipedia/비공식 PDF는 결정 근거로 쓰지 않았다.
- 커뮤니티의 설치 성공/실패 사례는 release risk signal로만 보고 공식 문서보다 낮게 평가했다.

## 계획에 반영한 내용

- Tauri v2/Rust를 첫 desktop shell scaffold로 선택했다.
- `workspace-monitor` 정적 export를 Tauri `frontendDist`로 연결하는 구조를 잡았다.
- Python `agent-platform`은 renderer 안에 넣지 않고 future sidecar/local service/command adapter boundary로 남겼다.
- Windows 전용 실행 프로파일을 추가해 MSI/NSIS/MSIX, WebView2, code signing, SmartScreen, update, uninstall, clean Windows smoke test를 관리하도록 했다.
- Codex, Claude Code, Cursor, Antigravity는 필수 런타임이 아니라 optional CLI capability로 남겼다.
- 현재 머신에 Rust가 없어 실제 Tauri build는 하지 않고, dependency 설치 감사 이후로 미뤘다.

## 불확실성

- 실제 signed installer는 Apple Developer ID, Windows code signing certificate, Windows build host 또는 CI, clean-machine test 환경이 필요하다.
- Tauri v2 설정은 source scaffold 수준으로 검증했으며, Rust/Tauri dependency 설치 전에는 compile 검증을 하지 않았다.
- Windows MSI는 Windows 빌드 환경이 필요하므로 macOS 단일 환경에서 완전 검증하지 않았다.


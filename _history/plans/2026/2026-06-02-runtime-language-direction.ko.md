# 런타임/언어 방향 계획

## 요청

Rust, Go 같은 효율적인 언어 중 플랫폼과 설치형 소프트웨어에 좋은 방향을 찾아 달라는 요청.

## 작업 모드

- `governance`

## 근거

- Rust 공식 자료: memory efficiency, no runtime/garbage collector, safety.
- Go 공식 자료: large-scale software engineering, build/dependency/readability/tooling.
- Tauri 공식 자료: system webview 기반 작은 desktop/mobile binary.
- Wails 공식 자료: Go backend와 web technology 기반 desktop app.
- Electron 공식 자료: resource/security-aware performance.

## 계획

1. 요구사항 `REQ-WS-051`을 추가한다.
2. `language-decision-registry.json`을 만든다.
3. 한영 runtime language policy를 추가한다.
4. `platform-desktop-app`에 Go local service/Wails 비교와 언어 방향을 반영한다.
5. memory bootstrap에 새 런타임 방향을 연결한다.
6. 조사/요약/평가/타이밍 기록을 남긴다.
7. 검증 후 commit/push한다.

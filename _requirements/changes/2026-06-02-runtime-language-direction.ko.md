# 런타임/언어 방향 요구사항 변경

## 변경 개요

- 날짜: 2026-06-02
- 출처 요청: `UR-2026-06-02-006`
- 추가 요구사항: `REQ-WS-051`
- 작업 모드: `governance`

## 사용자 요청 요약

사용자는 플랫폼과 설치형 소프트웨어를 만들 때 Rust, Go 같은 효율적인 소프트웨어 언어 중 좋은 방향을 찾아 달라고 요청했다.

## 변경 내용

`REQ-WS-051`을 추가해 런타임 선택을 컴포넌트 경계와 측정 가능한 병목 기준으로 관리한다.

- Python: agent logic, research, evaluation 기본값
- TypeScript/Next.js: monitor, dashboard, HTML UI 기본값
- Rust/Tauri: desktop shell, native command boundary, stable hot path 1차 후보
- Go: local daemon, file watcher, operational CLI 1차 후보
- Electron/Node: JavaScript desktop fallback

## 근거

- Rust 공식 문서는 no runtime/garbage collector, memory efficiency, safety를 핵심 가치로 둔다.
- Go 공식 자료는 large-scale software engineering, build, dependency, readability, tooling을 설계 이유로 설명한다.
- Tauri 공식 문서는 system webview 기반의 작은 desktop/mobile binary 방향을 제시한다.
- Wails 공식 문서는 Go backend와 web technology를 결합한 desktop app 방식을 제공한다.
- Electron 공식 문서는 성능 최적화와 보안 기준을 함께 고려해야 한다고 설명한다.

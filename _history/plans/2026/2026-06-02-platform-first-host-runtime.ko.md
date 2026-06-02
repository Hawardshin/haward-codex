# Platform-First Host Runtime Plan

## 목표

설치형 제품의 런타임 주체를 Codex나 다른 상용 에이전트 도구가 아니라 플랫폼 자체로 명시한다. 외부 AI CLI는 플랫폼 위의 guest adapter lane으로만 붙인다.

## 작업 범위

1. persistent instructions, AGENTS entrypoint, platform identity에 platform-first host runtime 규칙을 반영한다.
2. CLI adapter registry와 desktop/user-flow registry에 host/guest 경계를 추가한다.
3. platform-desktop-app requirements, specs, architecture docs, product boundary, packaging docs를 갱신한다.
4. Workspace Monitor Desktop 탭에서 `Platform-first host`, `Guest adapters`, `Platform state owner`가 보이도록 UI를 수정한다.
5. readiness tests, config contract, memory bootstrap, docs/naming checks, build, visual smoke로 검증한다.

## 비범위

- Codex/Gemini/Claude/OpenCode 실제 설치 또는 자동 설치.
- Tauri shell plugin, sidecar, PTY, xterm.js, Monaco dependency 설치.
- public-ready installer 주장.

# Plan: Chatbot Connection

날짜: 2026-06-07

## 순서

1. 기존 에이전트 채팅, provider 직접 실행, CLI fallback, provider 설정 진입점을 확인한다.
2. `SearchAgentWorkChatPanel`에 provider/model/terminal/store 연결 상태를 추가한다.
3. 채팅 화면에서 provider 설정, terminal drawer, model refresh 액션을 바로 실행하게 한다.
4. 명령 팔레트에 `챗봇 연결` 진입점을 추가한다.
5. CSS를 추가해 연결 상태가 데스크톱과 모바일에서 줄바꿈되게 한다.
6. 문자열 기반 테스트로 연결 UI와 명령 팔레트 contract를 보호한다.
7. renderer check/test, collect/build/platform check, Browser smoke, resource/omission/evaluation guard를 실행한다.

## 결정

- 새 native 기능을 추가하지 않는다. 현재 요청은 이미 존재하는 provider API와 terminal fallback을 사용자가 볼 수 있게 연결하는 UI/UX 개선으로 해결된다.
- 새 CLI나 dependency를 설치하지 않는다. 이번 slice는 설치보다 기존 실행 경로 연결 가시성이 우선이다.
- 작업 모드는 `standard`로 둔다. UI와 실행 동선이 바뀌지만 native runtime schema 변경은 없다.

## 검증 게이트

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`
- `corepack pnpm -w run desktop:renderer:build`
- `corepack pnpm --dir platform-desktop-app run check`
- Browser smoke: `#section-agents`에서 연결 스트립과 액션 확인
- resource guard, omission guard, work evaluator

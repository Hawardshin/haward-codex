# Tool Usage Integration 연구 요약

작성일: 2026-06-06

## 핵심 인사이트

현재 Codex 작업 루프는 단순한 터미널 명령 나열이 아니라 다음 순서를 가진다.

1. 현재성 높은 정보는 웹에서 공식 출처로 확인한다.
2. repo는 `rg`, `sed`, `git status` 중심으로 빠르게 지도화한다.
3. 변경은 patch 단위로 좁게 만든다.
4. collector, 타입, UI, CSS, test를 함께 묶어 스냅샷 계약을 유지한다.
5. build와 desktop package까지 수행해 사용자가 따로 빌드하지 않게 한다.
6. resource cleanup, history, evaluation, commit, push로 작업을 마감한다.

## 플랫폼 적용

- `tool-usage-integration-registry.json`: 반복 도구 루프의 source of truth
- `Tool Studio`: 도구 제작 흐름 옆에 Agent Tool Playbook 표시
- `WorkspaceSnapshot`: `toolUsageIntegration`으로 UI와 평가 화면이 재사용 가능
- `product-feature-registry`: Root Tool Management의 현재 자산으로 연결

## 출처

- Playwright Locators: https://playwright.dev/docs/locators
- Node.js Test Runner: https://nodejs.org/api/test.html
- Tauri Distribute: https://v2.tauri.app/distribute/

## 한계

이번 구현은 실행 가능한 preset runner가 아니라 source-backed playbook이다. 실제 자동 실행은 permission, install, destructive command, secret boundary를 별도 gate로 둔 다음 구현해야 한다.

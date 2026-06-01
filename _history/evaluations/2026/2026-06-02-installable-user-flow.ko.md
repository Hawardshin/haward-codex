# 작업 평가: 설치형 앱 사용자 플로우

## 초기 지시

사용자가 설치형 프로그램을 손쉽게 사용할 수 있도록 사용자 플로우도 잘 설계하라고 요청했다.

## 결과 요약

- `platform-desktop-app/configs/user-flow-registry.json`을 추가해 설치형 앱의 첫 실행, workspace chooser, view mode, readiness scan, dashboard, task timeline, decision inbox, settings, failure recovery를 한 곳에서 관리하게 했다.
- `platform-desktop-app/docs/user-flow.ko.md`와 `platform-desktop-app/docs/first-run-onboarding.ko.md`를 추가했다.
- `platform-desktop-app/artifacts/user-flow-map.html`을 만들어 브라우저에서 흐름을 볼 수 있게 했다.
- `platform-desktop-app/docs/requirements/2026-06-02-installable-user-flow.ko.md`와 `platform-desktop-app/specs/2026-06-02-installable-user-flow/`를 추가했다.
- `_ops/workflows/74-desktop-user-flow-design.md`와 `_ops/prompts/104-desktop-user-flow-design.md`를 추가하고 기존 설치형 소프트웨어 workflow/prompt/policy와 연결했다.
- persistent instructions, AGENTS, memory bootstrap, coordination board, work summary, request trace를 갱신했다.

## 확인한 근거

- Apple Human Interface Guidelines: Onboarding
- Microsoft Fluent 2: Onboarding
- Tauri v2 Distribute
- Tauri v2 Updater
- Electron Forge
- Electron utilityProcess
- 기존 내부 기준: desktop distribution registry, view mode registry, CLI adapter registry

## 검증

- JSON 검사 통과: `user-flow-registry.json`, `desktop-distribution-registry.json`, `bootstrap-manifest.json`, `status.json`
- `check-config-contract`: 통과
- `check-memory-bootstrap`: 통과
- `docs-audit`: 통과
- `workspace-index`: map 갱신
- `task-board`: board 갱신
- `workspace-monitor`: `npm run collect`, `npm test`, `npm run check`, `npm run build` 통과
- `agent-platform`: unittest 150개 통과
- `naming-audit`: 통과
- `workspace-health`: 20개 체크 통과
- `check-omissions`: `coverage_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`

## 평가

초기 지시는 충족됐다. 이번 변경은 실제 Tauri/Electron 앱 구현이 아니라 구현 전에 반드시 따라야 할 사용자 플로우와 운영 기준을 만든 작업이다. 따라서 실제 desktop shell, installer smoke test, usability test는 후속 구현 단계의 개선 항목으로 남긴다.

## 후속 개선

- Tauri-first prototype을 만들기 전 설치 감사와 framework decision record를 작성한다.
- 실제 desktop shell이 생기면 workspace chooser, first-run, screenshot, installer smoke test를 추가한다.
- time-to-first-dashboard와 optional setup deferral에 대한 사용성 체크리스트를 추가한다.

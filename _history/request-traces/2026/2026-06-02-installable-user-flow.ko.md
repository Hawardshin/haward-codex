# 요청-결과 추적: 설치형 앱 사용자 플로우

## 요청

- 사용자가 설치형 프로그램을 손쉽게 사용할 수 있도록 사용자 플로우도 잘 설계해 달라고 요청했다.

## 결과

- 설치형 앱 사용자 플로우의 source of truth를 `platform-desktop-app/configs/user-flow-registry.json`으로 만들었다.
- 첫 실행 온보딩과 사용자 플로우 문서를 한국어/영어로 추가했다.
- 브라우저에서 볼 수 있는 HTML 플로우 맵을 추가했다.
- 기존 desktop distribution registry, installable software policy, prompt router, workflows, persistent instructions, AGENTS, memory bootstrap과 연결했다.

## 산출물

- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/docs/user-flow.ko.md`
- `platform-desktop-app/docs/first-run-onboarding.ko.md`
- `platform-desktop-app/artifacts/user-flow-map.html`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-user-flow.ko.md`
- `platform-desktop-app/specs/2026-06-02-installable-user-flow/`
- `_ops/workflows/74-desktop-user-flow-design.md`
- `_ops/prompts/104-desktop-user-flow-design.md`
- `_history/web-searches/2026/2026-06-02-installable-user-flow.ko.md`

## 검증

- 검증 결과는 `_history/evaluations/2026/2026-06-02-installable-user-flow.ko.md`에 기록한다.

## 커밋

- close-out 후 final response에 기록한다.

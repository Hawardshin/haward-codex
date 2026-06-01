# Desktop User Flow Design Prompt

Use when: 설치형 desktop app의 사용자 플로우, 첫 실행 온보딩, workspace chooser, task timeline, decision inbox, 설정/복구 흐름을 설계하거나 수정해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Treat this as installable desktop app user-flow design.

Read:
- platform-desktop-app/configs/user-flow-registry.json
- platform-desktop-app/configs/desktop-distribution-registry.json
- agent-platform/configs/access/view-mode-registry.json
- agent-platform/configs/workflows/work-mode-registry.json
- agent-platform/configs/integrations/cli-adapter-registry.json

Design for:
- fast time-to-first workspace dashboard
- open/create/demo workspace paths
- explicit workspace data boundary
- user/developer/superadmin view mode separation
- optional CLI and notification setup that can be deferred
- task run timeline with phase, time, agents, files, evidence, decisions, verification, commit/push state
- decision inbox that isolates blocked questions while unblocked work continues
- recovery for unreadable workspace, missing optional CLI, pending decision, stale snapshot, and update failure

Return:
- target user segment
- first-run flow
- home information architecture
- guided task flow
- decision inbox behavior
- settings and capability setup flow
- developer/superadmin flow
- recovery flow
- acceptance checks

Do not make first run a full integration setup wizard.
Do not expose raw internal config by default in user mode.
Do not treat UI hiding as a security boundary.
```

## Checklist

- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/docs/user-flow.ko.md`
- `platform-desktop-app/docs/first-run-onboarding.ko.md`
- `platform-desktop-app/artifacts/user-flow-map.html`
- `_ops/workflows/74-desktop-user-flow-design.md`

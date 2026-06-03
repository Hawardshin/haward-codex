# View Mode Selection Prompt

Use when: 사용자 보기, 개발자 보기, 슈퍼어드민 개발 보기를 UI/운영 화면에서 나눠야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Read agent-platform/configs/access/view-mode-registry.json.
Classify the UI or operations surface into exactly one view_mode: user, developer, or superadmin_developer.

Use view_mode=user when the person only needs stable outputs, projects, readable history, docs, or artifacts.
Use view_mode=developer when the person or agent is improving code, tests, requirements, specs, dashboards, validators, or project internals.
Use view_mode=superadmin_developer when the repository owner or governance agent needs the full platform-building view, including operations, governance, agents, configs, history, requirements, specs, and public-readiness.

Keep view_mode separate from:
- install_mode, which controls environment setup.
- work_mode, which controls planning, evidence, evaluation, and close-out strictness.

Return:
- selected view_mode
- reason
- target surface
- visible sections
- hidden-by-default or collapsed surfaces
- privacy/security interpretation
- verification commands
- follow-up needed for real authentication, authorization, or collector-level publication filtering

Do not claim that client-side hiding is a security boundary. If the surface may become public or multi-user, require server-side or collector-level enforcement and tests before treating it as protected.
```

## Checklist

- `agent-platform/configs/access/view-mode-registry.json`
- `_docs/policies/view-mode-policy.ko.md`
- `_ops/workflows/73-view-mode-selection.md`
- `PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json`
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs` when monitor snapshot surfaces change
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx` when UI selection behavior changes

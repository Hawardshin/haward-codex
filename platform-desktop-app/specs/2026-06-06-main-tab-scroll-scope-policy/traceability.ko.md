# Traceability: Main Tab Scroll Scope Policy

| 요구사항 | 구현 | 검증 |
|---|---|---|
| REQ-PDA-126 | `check-scroll-containers.mjs`의 `.desktop-viewport`, `.mounted-section-panel` forbidden pattern | `workspace-monitor run check` |
| REQ-PDA-127 | `_docs/policies/ui-tone-policy.*.md`, scoped scroll contract 유지 | `check-scroll-containers.mjs` |
| REQ-PDA-128 | `persistent-instructions.*.md`, `AGENTS.md` durable rule | docs audit, request trace |
| REQ-PDA-129 | `bootstrap-manifest.json` reference link와 anchor purpose 갱신 | `check-memory-bootstrap`, `check-config-contract` |

## 변경 파일

- `AGENTS.md`
- `_docs/instructions/persistent-instructions.md`
- `_docs/instructions/persistent-instructions.en.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/policies/ui-tone-policy.en.md`
- `_docs/policies/ui-tone-policy.ko.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-scroll-containers.mjs`

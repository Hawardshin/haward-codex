# 추적성: 기본 사용자 인터페이스 단순화

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| `REQ-WM-011` | `agent-platform/configs/access/view-mode-registry.json`, `agent-platform/src/agent_platform/view_modes.py`, `components/MonitorShell.tsx` | `check-view-modes`, `collector.test.mjs`, renderer tests |
| `REQ-WM-076` | `components/MonitorShell.tsx`, `components/shell/DesktopActivityRail.tsx`, `app/globals.css` | `data-simple-user-start`, activity rail test/static checks, build |
| `REQ-WS-061` | `_docs/policies/view-mode-policy.*`, `_docs/instructions/persistent-instructions.*`, `_requirements/baselines/*` | config contract, docs audit, evaluation record |

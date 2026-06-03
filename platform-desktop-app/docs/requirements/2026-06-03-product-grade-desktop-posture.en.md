# Product-Grade Desktop Structure Requirements

## Scope

These requirements promote `platform-desktop-app/` from initial UI candidate or PoC language to a sellable installable desktop product structure.

## Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| PDA-PROD-001 | The selected desktop product path shall stay fixed as Tauri v2/Rust shell, `workspace-monitor` product UI source, and `agent-platform` Python layer. | must | desktop distribution registry, README |
| PDA-PROD-002 | The current `platform-desktop-app/` product structure shall not be described as a PoC, prototype, initial UI candidate, or scaffold candidate. | must | policies, persistent instructions, search check |
| PDA-PROD-003 | Electron, Wails, and native-packaging-only shall be re-evaluated only when a recorded release blocker or maintenance case justifies fallback/comparison work. | should | distribution registry |
| PDA-PROD-004 | Readiness script success states shall separate product-structure readiness from public release gates, and must not imply dependency-audit candidacy or public-release candidacy. | must | `check-readiness.mjs`, `check-service-readiness.mjs`, Tauri report |
| PDA-PROD-005 | Public distribution readiness shall remain blocked or gated until signing, notarization, signed updater, clean-machine smoke tests, and privacy/dependency review are complete. | must | service readiness, release preflight |

## Out Of Scope

- Creating public signing/notarization credentials
- Implementing a new desktop UI
- Re-running Electron/Wails comparison

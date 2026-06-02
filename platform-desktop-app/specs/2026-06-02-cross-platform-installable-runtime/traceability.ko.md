# 추적성

| 요구사항 | 산출물 | 검증 |
| --- | --- | --- |
| PDA-REQ-001 | `_ops/projects/registry.json`, `platform-desktop-app/README.md` | registry review |
| PDA-REQ-002 | `platform-desktop-app/configs/desktop-distribution-registry.json` | config contract |
| PDA-REQ-003 | `platform-desktop-app/src-tauri/tauri.conf.json`, `workspace-monitor/` | readiness check |
| PDA-REQ-004 | `docs/architecture/cross-platform-installable-runtime-decision.ko.md` | manual review |
| PDA-REQ-005 | macOS/Windows execution profiles, desktop registry release gates | config contract |
| PDA-REQ-006 | desktop registry security/privacy rules | manual review |
| PDA-REQ-007 | `configs/macos-execution-profile.json` | config contract |
| PDA-REQ-008 | `configs/windows-execution-profile.json` | config contract |
| PDA-REQ-009 | `package.json`, `src-tauri/`, `scripts/check-readiness.mjs`, `tests/readiness.test.mjs` | npm check/test |
| PDA-REQ-010 | desktop registry selected architecture, CLI adapter registry reference | readiness check |
| PDA-REQ-011 | README planned commands, registry planned commands | manual review |
| PDA-REQ-012 | README limitation, validation plan, release gates | manual review |


# Installable Desktop App Requirements

## Scope

These are the first requirements for turning the platform into installable software, similar to a desktop application such as Visual Studio Code.

## Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| PDA-REQ-001 | Installable app productization shall be owned by the `platform-desktop-app/` root project. | must | Project registry and structure audit |
| PDA-REQ-002 | Repository setup `install_mode` and end-user installer packaging shall be separated in docs and configs. | must | Product boundary docs and registry review |
| PDA-REQ-003 | The first desktop prototype should evaluate reuse of `workspace-monitor`. | should | Desktop distribution registry review |
| PDA-REQ-004 | Tauri, Electron, and native packaging options shall be compared before dependency installation or implementation. | must | Packaging strategy and spec traceability |
| PDA-REQ-005 | Release readiness shall require signing, notarization or OS trust, install/update/uninstall smoke tests, privacy review, and dependency/license review. | must | Release gate checklist |
| PDA-REQ-006 | Real tokens, webhook URLs, browser cookies, and private snapshots shall not be bundled in installers. | must | Privacy/security review |

## Current Status

- Status: baseline draft
- Actual desktop dependency installation: none
- Next step: perform a deeper Tauri/Electron/native packaging comparison before deciding whether to implement a prototype

# Installable Desktop App Product Boundary

## Purpose

`platform-desktop-app/` productizes this workspace platform as software that an end user can install. The existing `agent-platform` `install_mode` prepares a repository environment for users or developers. This project owns distributable desktop packaging and the installed-app experience.

## Owned Scope

- Desktop app product requirements
- Desktop shell or native wrapper selection
- macOS, Windows, and Linux packaging strategy
- Code signing, notarization, update, uninstall, and rollback release gates
- User settings, workspace selection, and private-data protection boundaries
- Command allowlists, workspace path allowlists, permission settings, and missing-CLI fallback boundaries when external CLI execution is needed

## Out Of Scope

- Core agent, evaluation, and research implementation in `agent-platform/`
- General web dashboard implementation in `workspace-monitor/`
- Repository setup `install_mode`
- Behavior or authenticated sessions of external CLIs such as Codex CLI, Claude Code, GitHub CLI, package managers, or deployment CLIs
- Domain projects such as `presentation-agent/`

## First Product Assumption

The first version should reuse `workspace-monitor/` inside a desktop shell instead of creating a separate UI. The platform's first user-facing value is browsing history, documents, project structure, and evaluations.

Add desktop-specific UI or native behavior later when requirements are concrete:

- Running local Python agents from the app
- File-system watching, notifications, OS credential storage, or other native APIs
- Adapter and permission UI for invoking multiple CLIs without becoming dependent on any one of them
- Update channels, workspace profiles, or plugin management

## Core Rules

- An installable app is not the same thing as a repository development environment.
- This repository is the development source for building the platform; the customer product is distributed as an app/runtime/data boundary that does not expose the platform source tree.
- User workspaces, platform data stores, log stores, and agent workspaces are runtime data planes separated from platform source code.
- Agent definitions are grouped in `agent-platform/configs/agents/`; runtime agent input/output/log/handoff/temp files belong in the installed app's agent workspace plane.
- Logs are classified as runtime health, task execution, CLI IO, agent work, or support diagnostic before retention, redaction, and support export policies apply.
- Do not bundle real tokens, webhook URLs, browser cookies, or private snapshots.
- A build is not distributable until signing, notarization or OS-specific trust requirements, install/uninstall smoke tests, and privacy review are complete.
- Before installing Tauri or Electron, record dependency audit and installation-audit plans.
- The installable app is not a single CLI wrapper. The platform launches first as the host runtime; external CLIs attach only as guest adapter capabilities registered in `agent-platform/configs/integrations/cli-adapter-registry.json`.
- Follow `platform-desktop-app/configs/runtime-data-boundary-registry.json` for detailed code/data/log/agent workspace steering.

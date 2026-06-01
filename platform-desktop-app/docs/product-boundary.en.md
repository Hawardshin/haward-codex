# Installable Desktop App Product Boundary

## Purpose

`platform-desktop-app/` productizes this workspace platform as software that an end user can install. The existing `agent-platform` `install_mode` prepares a repository environment for users or developers. This project owns distributable desktop packaging and the installed-app experience.

## Owned Scope

- Desktop app product requirements
- Desktop shell or native wrapper selection
- macOS, Windows, and Linux packaging strategy
- Code signing, notarization, update, uninstall, and rollback release gates
- User settings, workspace selection, and private-data protection boundaries

## Out Of Scope

- Core agent, evaluation, and research implementation in `agent-platform/`
- General web dashboard implementation in `workspace-monitor/`
- Repository setup `install_mode`
- Domain projects such as `presentation-agent/`

## First Product Assumption

The first version should reuse `workspace-monitor/` inside a desktop shell instead of creating a separate UI. The platform's first user-facing value is browsing history, documents, project structure, and evaluations.

Add desktop-specific UI or native behavior later when requirements are concrete:

- Running local Python agents from the app
- File-system watching, notifications, OS credential storage, or other native APIs
- Update channels, workspace profiles, or plugin management

## Core Rules

- An installable app is not the same thing as a repository development environment.
- Do not bundle real tokens, webhook URLs, browser cookies, or private snapshots.
- A build is not distributable until signing, notarization or OS-specific trust requirements, install/uninstall smoke tests, and privacy review are complete.
- Before installing Tauri or Electron, record dependency audit and installation-audit plans.

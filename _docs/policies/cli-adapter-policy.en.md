# CLI Adapter Policy

## Purpose

Even as the platform becomes installable software, it must not become dependent on one CLI. The platform provides the workspace, history, documents, evaluations, settings, UI, and operating principles. External commands such as Codex CLI, Claude Code, Cursor, GitHub CLI, package managers, and deployment CLIs are used through replaceable adapters when useful.

## Core Principles

- The installable app must not require a specific external CLI just to open, read, or navigate the workspace.
- A CLI is an added capability, not the platform body.
- The platform core owns intent and output contracts; CLI adapters translate them into provider-specific commands.
- CLI adapters need availability checks, version checks, permission scopes, timeouts, output contracts, and fallbacks.
- A missing CLI should become `capability_missing`, not a whole-platform failure.
- Prefer argv-style execution, explicit cwd, timeouts, environment allowlists, and redacted stdout/stderr handling over shell strings.
- If a desktop shell runs local commands, document command allowlists, workspace path allowlists, and user approval/settings boundaries first.
- If a CLI becomes required, bundled, globally installed, or auto-installed, create an installation audit plan and rollback path first.

## Source Of Truth

- CLI adapter registry: `agent-platform/configs/integrations/cli-adapter-registry.json`
- Installable app boundary: `platform-desktop-app/configs/desktop-distribution-registry.json`
- Installation audit: `_ops/workflows/58-installation-record.md`
- Productization policy: `_docs/policies/installable-software-policy.en.md`

## Examples

- AI assistant CLIs: Codex, Claude Code, Cursor, and Antigravity can be execution providers, but they are not the source of truth for platform principles.
- Git/GitHub CLI: these can enrich history and remote work, but document/history browsing itself must not depend on `gh`.
- Package managers: these can support installation or validation, but dependency state changes require installation audit records.
- Deployment CLIs: Vercel, Docker, and cloud CLIs can be deployment adapters, but credential, target, rollback, and preview boundaries must be explicit.

## Validation

After creating or changing important CLI adapter settings, run:

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/integrations/cli-adapter-registry.json
```

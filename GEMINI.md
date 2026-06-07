# Agent Workspace Platform (Codex) - Gemini CLI Instructions

This file provides foundational guidance for Gemini CLI (and other agent-based tools) operating in this workspace.

## Project Overview

This is a personal agent-building platform workspace. It is organized as a pnpm monorepo.

- `agent-platform/`: Core platform logic (Python-based).
- `platform-desktop-app/`: Tauri-based desktop application (Rust + Next.js).
- `_docs/`, `_philosophy/`, `_research/`, `_specs/`, `_skills/`: Governance, documentation, and research.
- `_ops/`: Operational workflows and prompts.
- `_history/`: Recorded logs of tasks and decisions.

## Primary Principles

Gemini CLI must follow the same core mandates as Codex CLI, as defined in:
1.  **`AGENTS.md`**: Canonical repository operating principles.
2.  **`_docs/operating-models/tool-agnostic-agent-operating-model.ko.md`**: Tool-agnostic agent model.
3.  **`_docs/instructions/persistent-instructions.md`**: Shared persistent instructions.

## Automatic Settings Discovery

The platform is designed to automatically detect and apply your settings:
- **API Keys**: Stored credentials (Gemini, OpenAI, etc.) in the Desktop App settings are automatically injected as environment variables (e.g., `GEMINI_API_KEY`) when running CLI tasks.
- **PATH Discovery**: The app automatically searches for `gemini`, `awp`, and other tools in your system PATH and `~/.local/bin`.
- **Workspace Context**: Gemini CLI should always respect the current workspace root and the `AGENTS.md` principles.

## Development Workflows

### Primary Commands

| Goal | Command |
| :--- | :--- |
| Full Workspace Setup | `corepack pnpm install` |
| Desktop App Setup | `corepack pnpm run desktop:setup` |
| Desktop App Dev Mode | `corepack pnpm run desktop:dev` |
| CLI Setup | `corepack pnpm --filter platform-desktop-app run cli:install` |
| Health Check | `corepack pnpm run desktop:doctor` |

## Gemini CLI Shortcuts

- **`@gemini build desktop`**: Run `corepack pnpm run desktop:package:internal`.
- **`@gemini setup cli`**: Run `corepack pnpm --filter platform-desktop-app run cli:install`.
- **`@gemini doctor`**: Run `corepack pnpm run desktop:doctor`.
- **`@gemini check health`**: Verify the workspace integrity.

## Workspace Integrity

- Never commit secrets or API keys.
- Respect `.gitignore` and `.gitattributes`.
- Use `_private/` for local-only experiments.
- Follow the **Research -> Strategy -> Execution** lifecycle for all changes.

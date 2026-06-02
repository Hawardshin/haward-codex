# Platform-First Host Runtime Requirement Change

- Date: 2026-06-02
- Request: Shift to a platform-first structure where Codex/Gemini CLI/Claude CLI-like tools run on top of the platform.
- Change type: durable product/runtime identity change

## Added

- `PDA-REQ-026`: The installable platform shall be a platform-first host runtime, not an app dependent on Codex, Gemini CLI, Claude Code CLI, OpenCode, Cursor, Antigravity, or another commercial/external AI tool.
- `PDA-UX-019`: First run and the Desktop tab shall make clear that the platform starts first and external AI CLIs attach as guest lanes.

## Non-Goals

- Do not make external AI CLIs required runtimes.
- Do not auto-install or bundle external AI CLIs into the installer.
- Do not let external AI tools own durable memory, decision authority, or validation gates.

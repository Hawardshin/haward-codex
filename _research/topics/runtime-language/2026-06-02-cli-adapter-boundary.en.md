# CLI Adapter Boundary Research Note

## Core Conclusion

The installable platform should not depend on one CLI. The platform core owns intent, work records, documents, evaluations, settings, and UI. CLIs are external capabilities attached only when useful.

## Evidence Roles

- Python subprocess and Node child_process docs show that external command execution needs explicit handling for arguments, shell use, timeouts, stdout/stderr, and security.
- Tauri command scopes support explicit permission boundaries when a desktop shell handles local commands.
- GitHub CLI extensions show that CLI ecosystems can be extensible, while extensions and external tools carry separate support and trust boundaries.
- Twelve-Factor backing services and ports/adapters framing support treating external tools as attachable adapters rather than platform internals.

## Platform Application

- Use `cli-adapter-registry.json` for CLI adapter contracts.
- The installable app should keep basic UI and document navigation available when optional CLIs are missing.
- Strengthen installation audit and release gates only when a CLI is promoted to required or bundled status.
- Desktop-originated CLI execution needs command allowlists, workspace path allowlists, permission UI, timeouts, and redaction.

## Reuse Note

This note records general principles. Concrete adapters for Codex CLI, Claude Code, GitHub CLI, Vercel CLI, or similar tools still need fresh official documentation checks.

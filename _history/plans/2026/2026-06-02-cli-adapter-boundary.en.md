# CLI Adapter Boundary Plan

## Request

The user said the platform is installable but can use many CLIs, should not depend on any specific CLI, and should operate by using those CLIs on top.

## Work Mode

- `governance`

## Evidence

- External command execution docs require shell, argument, timeout, and stdout/stderr boundaries.
- Tauri command scopes show that desktop local command execution needs permission boundaries.
- Ports/adapters and attached-resource framing support treating CLIs as attachable adapters instead of platform internals.

## Plan

1. Add `REQ-WS-053`.
2. Create the CLI adapter registry.
3. Create CLI adapter policy, workflow, and prompt.
4. Reflect CLI-neutral boundaries in installable platform and desktop app docs/config.
5. Connect memory bootstrap, router, and index.
6. Record history/evaluation, verify, commit, and push.

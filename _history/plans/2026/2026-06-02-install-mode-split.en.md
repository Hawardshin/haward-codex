# Plan Record: Install Mode Split

## Goal

Implement `install_mode` so people using the platform and developers improving the platform get different setup paths.

## Plan

1. Check web sources for Python regular/editable installs, pyproject dependency structure, npm dev dependency omit behavior, and Vercel Next.js deployment.
2. Add `REQ-WS-049` to the requirements baseline.
3. Create `install-mode-registry.json`.
4. Add install mode validation/lookup commands to the `agent-platform` CLI.
5. Update policy, workflow, prompt, README, persistent instructions, and memory bootstrap.
6. Create history, research, evaluation, and timing records.
7. Verify, commit, and push.

## Decisions

- Do not add user/developer to `work_mode`.
- Use `install_mode` for setup audience.
- Do not run dependency installation in this scope.
- Keep actual installs under the existing installation audit workflow.

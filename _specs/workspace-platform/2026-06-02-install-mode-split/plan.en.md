# Plan: Install Mode Split

## Evidence Summary

- pip official docs distinguish regular local installs from editable installs and describe editable installs as development installations.
- The Python Packaging User Guide provides project dependency and optional dependency structure through `pyproject.toml`.
- npm official docs explain `npm ci` and `--omit=dev` for omitting dev dependencies from the install tree.
- Vercel Next.js docs support the deployment path for Next.js projects like workspace-monitor.

## Execution Order

1. Add `REQ-WS-049` to the baseline and create change/review records.
2. Create the install mode registry.
3. Add registry validation and lookup commands to the agent-platform CLI.
4. Add install mode policy, workflow, and prompt.
5. Connect persistent instructions, `AGENTS.md`, memory bootstrap, router, index, installation README, and agent-platform README.
6. Create history, research, evaluation, and timing records.
7. Verify, commit, and push.

## Risks And Responses

- Risk: `install_mode` and `work_mode` get confused.
- Response: Define their boundary in the registry, policy, workflow, and prompt.
- Risk: User install omits dev dependencies needed for a Next.js source build.
- Response: Separate source build setup from runtime-only pruning and rely on Vercel/project build verification.
- Risk: Documented install commands are mistaken for completed installs.
- Response: State that actual execution requires installation audit records.

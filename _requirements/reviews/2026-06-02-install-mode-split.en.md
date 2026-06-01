# Install Mode Split Requirement Review

## Review Target

- Requirement: `REQ-WS-049`
- Change record: `_requirements/changes/2026-06-02-install-mode-split.en.md`

## Decision

Accepted.

## Rationale

Existing `work_mode` controls how a task is planned and closed. The user's "use mode" and "improvement mode" describe setup scope, so mixing them into `work_mode` would blur the model.

Use a separate `install_mode`.

- User install provides the minimum regular/runtime path needed to use the platform.
- Developer install provides editable installs, devDependencies, tests, and governance checks needed to improve the platform.
- Documenting setup commands is separate from actually running them.
- If an actual install occurs, installation audit records still apply.

## Verification Criteria

- A self-documenting install mode registry exists.
- The CLI can validate the registry and show modes.
- Persistent instructions and memory bootstrap expose the install mode.
- Workflow, prompt, router, and index show the install mode selection path.

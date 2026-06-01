# Requirement Review: Platform Notification Settings

## Reviewed Requirement

- `REQ-WS-025`

## Review Result

- Status: approved
- Work mode: `governance`
- Scope: shared integration capability under `agent-platform/`

## Review Notes

- This is a platform operating capability rather than a single project artifact, so it belongs in the workspace/platform requirements baseline.
- Keeping secrets out of git is an acceptance criterion.
- Because Microsoft Teams connector behavior is changing, the docs should prefer Workflows webhook URLs.
- Real sending should require explicit `--send`; default behavior should be dry-run.

## Accepted Criteria

- Provider channels can be enabled or disabled through config.
- Only environment variable names are stored; real secret values are not stored.
- The CLI can validate settings and perform dry-run notification checks.
- Unit tests cover provider payloads, secret guards, disabled channels, and filtered channels.


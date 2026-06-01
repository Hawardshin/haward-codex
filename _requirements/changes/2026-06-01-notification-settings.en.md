# Requirement Change: Platform Notification Settings

## Change ID

- `REQ-WS-025`

## Source Request

- `UR-2026-06-01-007`

## Change

- Slack, Discord, and Microsoft Teams notifications must be configurable through a platform-wide settings file.
- Real tokens, webhook URLs, and secrets must not be stored in the repository; the user supplies them through environment variables.
- The settings file must be understandable by inspection, including provider, event, severity, and secret handling rules.
- Default execution should be dry-run so tests and evaluations do not accidentally send external messages.

## Evidence

- Slack official docs describe posting JSON with a `text` payload to an incoming webhook URL.
- Discord official docs describe executing incoming webhooks with message fields such as `content`.
- Microsoft Teams connector behavior is changing, so new setup should prefer Workflows webhook URLs.

## Validation

- The notification settings file must pass the self-documenting config contract.
- Enabled channels can require their secret environment variable.
- Inline secret fields must be reported as gaps.
- Dry-run must return provider payload previews without a real network call.


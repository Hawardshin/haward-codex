# Plan Record: Platform Notification Settings

## Request

- Let platform-wide work send Slack, Discord, and Microsoft Teams notifications through a configurable on/off settings file.
- Let the user provide real tokens or webhook URLs.

## Work Mode

- `governance`
- Reason: this is a new cross-project platform capability, and the config/CLI/secret handling pattern will become reusable operating structure.

## Research And Evidence

- Slack incoming webhook official docs: JSON `text` payloads are posted to webhook URLs.
- Discord Execute Webhook official docs: message fields such as `content` are required, and mention safety matters.
- Microsoft Teams official docs: prefer Workflows webhooks; Microsoft 365 Connectors carry deprecation/migration risk.
- Python official docs: `urllib.request` can perform HTTP POST without an external dependency.
- Internal evidence: existing platform helpers live under `src/agent_platform/<capability>/`, CLI commands live in `agent_platform.cli`, and settings follow the self-documenting config contract.

## Decisions

- Settings file: `agent-platform/configs/integrations/notification-channels.json`
- Secret handling: commit only `webhook_url_env`; real values are injected through environment variables.
- Implementation: Python standard-library module `agent_platform.integrations.notifications`.
- CLI:
  - `check-notifications`: validate settings and secret policy
  - `notify`: dry-run by default; real sends require `--send`
- Teams: default to `message_card`, with selectable `simple_text` and `adaptive_card` styles.

## Validation Plan

- Run notification unit tests and full test suite.
- Run config contract and notification config CLI checks.
- Run notify dry-run smoke test.
- Run coding research readiness, memory bootstrap, grounding, and work evaluation checks.
- Regenerate workspace index and task board.


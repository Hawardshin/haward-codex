# Implementation Plan: Platform Notification Settings

## Evidence

- Slack official docs: incoming webhooks accept JSON `text` payloads through webhook URLs.
- Discord official docs: Execute Webhook requires at least one message field such as `content`.
- Microsoft Teams official docs: new incoming webhook setup can use Workflows templates, and Microsoft 365 Connectors carry deprecation/migration risk.
- Python official docs: `urllib.request.Request` and `urlopen` can perform JSON POST requests.
- Existing repository structure: platform helpers live under `src/agent_platform/<capability>/`, CLI commands live in `agent_platform.cli`, and validation lives under `tests/`.

## Strategy

1. Add a self-documenting `configs/integrations/notification-channels.json` settings file.
2. Add `src/agent_platform/integrations/notifications.py` for config validation, payload generation, dry-run, and real POST dispatch.
3. Add `check-notifications` and `notify` CLI commands.
4. Add unit tests for secret guards, provider payloads, channel filters, dry-run, and sender injection.
5. Document usage and secret handling in README/docs.
6. Record history, request trace, evaluation, commit, and push.

## Risks And Controls

- Teams webhook payload compatibility: keep `payload_style` selectable as `message_card`, `simple_text`, or `adaptive_card`, and recommend Workflows URLs in docs.
- Secret exposure risk: validator reports inline secret fields as gaps.
- Accidental external sends during tests: default to dry-run and use sender injection for send-path tests.


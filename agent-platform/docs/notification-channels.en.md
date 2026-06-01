# Notification Channel Settings

## Purpose

`agent-platform` can send events such as work completion, failures, approval needs, spec clarification needs, and long-running updates to Slack, Discord, and Microsoft Teams. Real webhook URLs are credentials, so the repository stores only environment variable names.

## Settings File

- Default settings: `agent-platform/configs/integrations/notification-channels.json`
- Example environment file: `agent-platform/configs/integrations/notification-secrets.example.env`

By default, all channels have `enabled=false`. Turn on only the provider channels you want, then put the real webhook URL in the matching `webhook_url_env` environment variable.

```bash
export AGENT_PLATFORM_DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
export AGENT_PLATFORM_SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
export AGENT_PLATFORM_TEAMS_WEBHOOK_URL="https://..."
```

## Commands

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-notifications configs/integrations/notification-channels.json
PYTHONPATH=src python3 -m agent_platform.cli check-notifications configs/integrations/notification-channels.json --require-secrets
PYTHONPATH=src python3 -m agent_platform.cli notify configs/integrations/notification-channels.json --event work_completed --title "Work complete" --message "Verification is done." --severity info --dry-run
PYTHONPATH=src python3 -m agent_platform.cli notify configs/integrations/notification-channels.json --event clarification_needed --title "Spec clarification needed" --message "Q1=<answer>" --severity warning --dry-run
PYTHONPATH=src python3 -m agent_platform.cli notify configs/integrations/notification-channels.json --event work_completed --title "Work complete" --message "Verification is done." --severity info --send
```

`--dry-run` returns provider payload previews only. Use explicit `--send` to send a real message.

`clarification_needed` is used when a spec is ambiguous or differs from source. Its message should include question IDs and answer formats the user can reply with directly.

## Provider Notes

- Slack: official incoming webhook docs use JSON `text` payloads.
- Discord: Execute Webhook requires a message field such as `content`. The default payload uses `allowed_mentions.parse=[]` to avoid accidental mentions.
- Teams: Microsoft 365 Connectors carry migration/deprecation risk, so new setup should prefer Workflows webhook URLs. `payload_style` can be `message_card`, `simple_text`, or `adaptive_card`.

## Secret Rules

- Do not store real `webhook_url`, `token`, `secret`, `bearer_token`, `bot_token`, or `incoming_webhook` values in the repository.
- Store only environment variable names in config.
- `check-notifications --require-secrets` checks whether enabled channels have their environment variables.
- When a webhook value changes, update the shell, direnv, or secret manager value instead of editing tracked config.

# Web Search Record: Platform Notification Settings

## Request Summary

- Add a platform setting that enables or disables Slack, Discord, and Microsoft Teams notifications while letting the user provide real tokens or webhook URLs.

## Queries

- `Slack incoming webhooks official documentation 2026`
- `Discord developer documentation execute webhook`
- `Microsoft Teams incoming webhook workflow official documentation connector retirement Power Automate`
- `Python urllib.request official documentation Request urlopen`

## Sources Checked

| Source | Type | Checked | Used For |
| --- | --- | --- | --- |
| Slack Developer Docs: Sending messages using incoming webhooks, `https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/` | official | 2026-06-01 | Evidence that Slack incoming webhooks accept JSON `text` payloads |
| Discord Developer Docs: Webhook Resource / Execute Webhook, `https://docs.discord.com/developers/resources/webhook#execute-webhook` | official | 2026-06-01 | Evidence for Discord webhook payload fields such as `content` and mention safety |
| Microsoft Support: Send messages in Teams using incoming webhooks, `https://support.microsoft.com/en-US/Workflows/send-messages-in-teams-using-incoming-webhooks` | official | 2026-06-01 | Teams Workflows webhook setup and Adaptive/Message card support |
| Microsoft Learn: Manage Microsoft 365 connectors and custom connectors, `https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors` | official | 2026-06-01 | Microsoft 365 Connector deprecation risk and Workflows preference |
| Python Docs: `urllib.request`, `https://docs.python.org/3/library/urllib.request.html` | official | 2026-06-01 | Standard-library HTTP POST implementation evidence |

## Weak Sources Or Supporting Signals

- Reddit and vendor docs surfaced Teams connector migration friction, but implementation decisions rely on official Microsoft documentation.
- Community posts are treated only as discovery signals for migration risk.

## Plan Impact

- Real webhook URLs are credentials, so the settings file stores only environment variable names.
- CLI behavior defaults to dry-run; real sends require explicit `--send`.
- Teams channels should prefer Workflows webhook URLs and can choose `message_card`, `simple_text`, or `adaptive_card` payload style.
- The implementation uses Python standard library only, so no installation is required.

## Uncertainty

- Teams Workflows payload expectations can vary by tenant and workflow template. The config keeps payload style selectable and requires dry-run/provider validation before real sends.

## Public Decision Summary

- This feature depends on current provider policy, so it is designed from official docs.
- Keeping secret values out of the repository and injecting them through environment variables is the safest default.


# Spec: Platform Notification Settings

## Goal

Create config-driven notifications for platform events such as work completion, failures, approval needs, and long-running updates through Slack, Discord, and Microsoft Teams.

## Requirement

- `REQ-WS-025`

## Acceptance Criteria

- `agent-platform/configs/integrations/notification-channels.json` can enable or disable global notifications and provider channels.
- The config stores environment variable names only, not real tokens, webhook URLs, or secrets.
- Discord, Slack, and Teams payload differences are generated deterministically in Python.
- Default execution is dry-run; real sending requires explicit `--send` in the CLI.
- Validation can require secret environment variables for enabled channels.
- Inline secret fields in config are reported as validation gaps.
- Unit tests and CLI smoke tests verify the behavior.

## Non-Goals

- Automatically entering webhook URLs or provider UI setup.
- OAuth app installation flows.
- Retry queues, background workers, or rate-limit schedulers.
- Persisting notification delivery history in a database.


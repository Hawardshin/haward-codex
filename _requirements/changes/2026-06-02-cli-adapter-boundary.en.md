# Requirement Change: CLI Adapter Boundary

## Change ID

- `REQ-CHANGE-2026-06-02-CLI-ADAPTER-BOUNDARY`

## Background

The user said the platform is installable but should be able to use many CLIs without becoming dependent on any one of them. The platform should operate by using those CLIs on top.

## Change

- Add `REQ-WS-053`.
- Define external CLIs as optional adapter capabilities attached to the installable platform.
- Require missing CLIs to degrade as `capability_missing` instead of whole-platform failure.
- Require installation audit, security boundary, rollback, and validation commands before promoting a CLI to required, bundled, or globally installed status.

## Impact

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `_docs/policies/cli-adapter-policy.en.md`
- `_ops/workflows/66-cli-adapter-integration.md`
- `_ops/prompts/97-cli-adapter-integration.md`
- `platform-desktop-app/configs/desktop-distribution-registry.json`

## Status

- Applied

# Research Note: Desktop User Improvements

- Date: 2026-06-02
- Reliability: medium. Official documentation and product signals were used separately.

## Summary

The next user-side improvement should make setup, decision handling, and intent selection easier before increasing automation power.

## Applied Decisions

- CLI installation has security and environment variance, so setup guidance and verification commands come before auto-install.
- HITL decisions need answer type, answer text, status updates, and history records rather than only a delayed chat response.
- Session prompts should start from presets such as `User Task`, `Platform Improvement`, `Knowledge Accumulation`, and `Review & Verify`.

## Limits

- Provider auth UX is not implemented yet.
- Official install links are guidance only; the app does not execute installation commands.
- OpenCode uses `https://opencode.ai/docs/cli/` as the final UI link; `https://opencli.co/cli/opencode` is kept only as a package-discovery signal.

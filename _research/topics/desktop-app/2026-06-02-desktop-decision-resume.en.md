# Research Note: Desktop Decision Resume

- Date: 2026-06-02
- Reliability: medium. Official Tauri material and HITL pattern docs were prioritized; product/community sources were used only as UX risk signals.

## Summary

Saving a deferred decision answer is not enough for a smooth return-to-work flow. Automatic resume is risky, so the Desktop app should send the answer to the linked active CLI session only when the user explicitly chooses `Answer & Resume`.

## Applied Decisions

- Answer-only and answer-and-resume must remain separate actions.
- The resume target comes from decision metadata `session_id`, and that session must be active in the current app runtime.
- If the session is missing, finished, or lacks stdin, the answer remains saved and the UI receives resume failure detail.
- This slice reuses the existing pipe session path without adding shell plugin or PTY dependencies.

## Limits

- Direct Tauri Rust compilation was not verified because Rust/Cargo is not installed.
- CLI-specific response formats are not standardized, so the app sends the user's free-form answer to stdin as-is.

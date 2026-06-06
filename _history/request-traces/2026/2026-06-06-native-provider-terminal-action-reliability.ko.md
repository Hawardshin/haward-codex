# Request Trace: Native Provider and Terminal Action Reliability

## Request

- User reported that the previously added provider/terminal/CLI setup functions did not seem to work.

## Requirements

- `platform-desktop-app/docs/requirements/2026-06-06-native-provider-terminal-action-reliability.ko.md`

## Specs

- `platform-desktop-app/specs/2026-06-06-native-provider-terminal-action-reliability/`

## Implementation

- Tauri opener and clipboard manager plugins added to `platform-desktop-app/src-tauri`.
- Provider URL opener command changed to Tauri opener.
- Native clipboard read/write commands added.
- Renderer clipboard helper changed to native-first fallback order.
- Provider/terminal Playwright smoke added.

## Validation

- `platform-desktop-app/specs/2026-06-06-native-provider-terminal-action-reliability/validation.ko.md`

## Evaluation

- `_history/evaluations/2026/2026-06-06-native-provider-terminal-action-reliability.ko.md`

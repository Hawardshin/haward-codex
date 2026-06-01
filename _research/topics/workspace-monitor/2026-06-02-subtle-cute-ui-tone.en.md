# Research Note: Subtle Cute UI Tone for Workspace Monitor

## Conclusion

For an operational tool, cuteness should not become a decorative theme. It should be a small emotional buffer that reduces fatigue in repeated use. Small color signals, hover feedback, and softer empty states are useful when they preserve information density and hierarchy.

## Application Criteria

- Use only small accents that help communicate state.
- Use short `transform` feedback rather than layout-shifting hover behavior.
- Do not make users wait for motion.
- Provide `prefers-reduced-motion` handling.
- Keep the existing green/blue/amber/red/violet/slate palette and add only a supporting warm accent.

## Applied Here

- Added `--rose`, `--mint-soft`, `--peach-soft`, and `--soft-shadow` in `workspace-monitor/app/globals.css`.
- Added small status dots to metric cards.
- Added a 1px lift and soft shadow to major cards/buttons on hover.
- Added a `prefers-reduced-motion` media query.

## Reuse

Future `platform-desktop-app/` and dashboard/report HTML work should check `_docs/policies/ui-tone-policy.en.md` first.

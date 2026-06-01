# Installable App User Flow Research Note

## Summary

The installable agent platform should prioritize fast first value over a full setup wizard. Official design guidance favors short, optional, contextual onboarding. Desktop distribution docs keep signing, updater, installer, and OS-specific packaging as separate release gates.

## Applied Principles

- First run targets workspace dashboard arrival.
- Optional capabilities become setup-later capability cards and disable only that capability when missing.
- Permissions, file access, network behavior, and CLI execution are explained when they become relevant.
- User mode stays focused on tasks and history.
- Developer and superadmin modes expose raw configs, validators, release gates, and source provenance.
- The decision inbox prevents one pending question from blocking unrelated work.

## Key Sources

- Apple Human Interface Guidelines: Onboarding: https://developer.apple.com/design/human-interface-guidelines/onboarding
- Microsoft Fluent 2: Onboarding: https://fluent2.microsoft.design/onboarding/
- Tauri v2 Distribute: https://v2.tauri.app/distribute/
- Tauri v2 Updater: https://v2.tauri.app/plugin/updater/
- Electron Forge: https://www.electronforge.io/
- Electron utilityProcess: https://www.electronjs.org/docs/latest/api/utility-process

## Limitations

- No real desktop shell or installer was implemented.
- Actual usability testing is still needed.
- OS-specific installer validation should happen after dependency installation and prototype work.

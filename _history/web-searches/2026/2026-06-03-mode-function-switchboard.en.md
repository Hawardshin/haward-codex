# Web Search Record: Mode and Function Switchboard

## Request

- Make the many functions and modes explicitly selectable and show where each one is selected.

## Searches

- `Apple Human Interface Guidelines sidebars navigation modes segmented controls official`
- `Microsoft Fluent 2 navigation command bar tabs modes official design guidelines`
- `WAI ARIA tabs pattern navigation landmark official`

## Sources Checked

- Apple Human Interface Guidelines, Navigation and Search: https://developer.apple.com/design/human-interface-guidelines/navigation-and-search
- Apple Human Interface Guidelines, Segmented Controls: https://developer.apple.com/design/human-interface-guidelines/segmented-controls
- Microsoft Fluent 2, Navigation: https://fluent2.microsoft.design/components/web/react/core/navigation
- WAI-ARIA Authoring Practices, Tabs Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- WAI-ARIA Authoring Practices, Landmarks Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/

## Impact

- Mode selection is collected into an explicit Overview switchboard instead of remaining only in scattered controls.
- The snapshot now structures group, option, selector location, and source path information.
- Directly selectable items such as view/language/section are wired to UI actions, while task/setup modes such as work/install show their registry source and selector location.

## Uncertainty

- Public-release accessibility readiness still needs separate screenshot and keyboard validation.

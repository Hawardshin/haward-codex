# Web Search: Responsive Button Design

## Queries

- `Apple Human Interface Guidelines buttons macOS responsiveness target size`
- `Microsoft Fluent UI button design responsive accessibility target size`
- `WCAG 2.2 target size minimum 24 CSS pixels official`

## Checked Sources

- Apple Human Interface Guidelines, Buttons: https://developer.apple.com/design/human-interface-guidelines/buttons
- Microsoft Learn, screen sizes and breakpoints for responsive design: https://learn.microsoft.com/windows/apps/design/layout/screen-sizes-and-breakpoints-for-responsive-design
- W3C WCAG 2.2 Understanding SC 2.5.8 Target Size Minimum: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- WCAG 2.2 Recommendation: https://www.w3.org/TR/WCAG22/

## Plan Impact

- Used 24x24 CSS px as the minimum target-size floor and kept the app's desktop controls above that floor.
- Treated responsive behavior as window-width based rather than device-class based.
- Kept button groups visually consistent without adding a new component library.

## Weak Sources Ignored

- Non-official blog summaries and community posts were treated as discovery signals only.

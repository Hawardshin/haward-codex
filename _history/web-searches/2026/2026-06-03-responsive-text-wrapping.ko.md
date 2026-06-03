# Web Search: Responsive Text Wrapping

## Queries

- `CSS Text Module overflow-wrap line-break word-break official specification responsive text wrapping`
- `WCAG 2.2 Reflow text spacing responsive text official W3C`
- `MDN CSS overflow-wrap word-break line-break text-wrap balance stable reference`

## Checked Sources

- MDN `overflow-wrap`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-wrap
- MDN `text-wrap`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap
- W3C WCAG 2.2 Understanding Reflow: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- W3C WCAG 2.2 Reflow criterion: https://www.w3.org/TR/WCAG22/#reflow

## Plan Impact

- `overflow-wrap: anywhere` can affect intrinsic sizing and create more aggressive break opportunities, so it should not be the default for normal UI text.
- `overflow-wrap: break-word` is a safer default for ordinary UI copy because it still protects against unbreakable strings without making every container's min-content calculation aggressively narrow.
- WCAG reflow keeps horizontal scrolling as a key risk, so long path/code/log values still need an explicit overflow-safe token path.

## Weak Sources Ignored

- Forum and generic blog answers were not used for the implementation decision.

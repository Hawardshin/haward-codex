# Web Search Record: Subtle Cute UI Tone

## Purpose

The user said that a subtly cute UI tone is also good. I researched how to apply this to an operational tool without turning it into decorative clutter.

## Queries

- `Nielsen Norman Group delight UX emotional design subtle design official`
- `Material Design delightful moments motion design official guidelines`
- `Apple Human Interface Guidelines motion design delight official`
- `Microsoft Fluent 2 design principles delight official`
- `Material Design 3 motion guidance official expressive delightful UI`
- `Fluent 2 design principles official UI delightful`

## Sources Checked

| Source | URL | Reliability | Why It Was Used |
| --- | --- | --- | --- |
| Apple Human Interface Guidelines: Motion | https://developer.apple.com/design/Human-Interface-Guidelines/motion | Official | Motion can support status and feedback but should not distract or harm comfort/accessibility |
| Microsoft Fluent 2 Design Principles | https://fluent2.microsoft.design/design-principles | Official | Balances focus, low clutter, trust, and personality |
| Material Design: Understanding motion | https://m2.material.io/design/motion/understanding-motion.html | Official | Treats motion as a way to communicate relationships, action availability, and outcomes |
| Don Norman, Emotional Design | https://ubiquity.acm.org/article.cfm?id=966013 | Author/academic source | Provides background that pleasure and usability can be connected |

## Lower-Weight Sources

- Reddit/community discussions were useful as discovery signals about over-expressive UI risk, but not used as proof.
- General UX blog posts were directionally similar, but official and author-level sources were enough for this policy.

## Plan Impact

- Defined cuteness as small accents, status signals, friendly empty states, and restrained micro-interactions, not mascots, emoji, or decoration.
- Applied the change only at the CSS layer in Workspace Monitor.
- Added brief motion and `prefers-reduced-motion` handling.

## Remaining Uncertainty

- The user's preferred intensity still needs visual review and feedback.
- If browser screenshot verification is available, color, hover, and density balance should be checked visually.

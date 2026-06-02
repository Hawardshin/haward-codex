# UI Tone Policy

## Purpose

Platform surfaces should feel fast to scan and trustworthy like operational tools. Because the user will repeatedly work in these tools, a small amount of quiet delight and subtle cuteness is allowed when it does not weaken clarity.

## Principles

- Clarity, scanability, accessibility, and operational trust come first.
- Cuteness is not the main event; it is a supporting signal that makes status and flow easier to feel.
- Good applications include small color accents, status dots, gentle hover feedback, friendly empty states, and restrained micro-interactions.
- Avoid decorative clutter, emoji-heavy UI, unnecessary animation, reduced information density, and visual noise.
- Motion must be brief and purposeful, and must respect `prefers-reduced-motion`.
- Operational and management surfaces should keep card radii aligned with the local design system and avoid feeling like broad marketing UI.

## Applies To

- `workspace-monitor/` dashboards, history, source viewer, and agent board
- `platform-desktop-app/` installable app UI
- Future admin, monitor, coordination board, and generated report HTML

## Evidence

- Apple Human Interface Guidelines for Motion describe motion as useful for status and feedback, but warn against gratuitous or excessive animation. Reduced-motion handling is required by this policy.  
  https://developer.apple.com/design/Human-Interface-Guidelines/motion
- Microsoft Fluent 2 design principles emphasize focus, less visual clutter, trust, and personality in balance.  
  https://fluent2.microsoft.design/design-principles
- Material Design's motion guidance treats motion as a way to communicate relationships, action availability, and action outcomes.  
  https://m2.material.io/design/motion/understanding-motion.html
- Don Norman's emotional design discussion supports the idea that usability and pleasure are connected, while this repository still keeps operational readability and verification first.  
  https://ubiquity.acm.org/article.cfm?id=966013

## Verification

- Check that delightful details do not weaken information hierarchy.
- Check that buttons, tabs, cards, charts, and code viewers do not create text overlap.
- Check that repeated interactions do not add unnecessary waiting animations.
- Check that `prefers-reduced-motion` handling exists.
- Run `pnpm run build` or the owning project's build/check command.

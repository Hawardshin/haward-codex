# Design Asset Usability Expansion Requirement Change

## Change ID

- `REQ-WS-082`

## User Intent

- Keep collecting many useful design assets, but make them easy for the user to find and use.

## Change

- Expand `design-asset-library` to 600 internally generated SVG assets.
- Avoid relying only on manual JSON browsing by adding `families`, `search`, `snippet`, and `gallery` flows.
- Generate the gallery as static HTML that can open without a separate server.
- Keep external open-source icon and emoji sources as candidates only; store files only after license review.

## Rationale

- The previous 120 generated assets were legally cautious, but discovery was still too manual.
- Presentation, HTML artifact, dashboard, and prototype work needs a way to scan visual candidates and paste usable paths quickly.

# Design Asset Library Requirement Review

## Reviewed Requirement

- `REQ-WS-081`

## Fit

- Directly reflects the user's constraint that assets must not be illegally downloaded.
- Internally generated SVG packs are a good default when many assets must be available immediately.
- External open-source candidates are useful, but storing files before license review is not acceptable.

## Decision

- Approved.
- Manage `design-asset-library/` as a separate root project.

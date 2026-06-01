# Requirements Review: Source Discovery Expansion

## Reviewed Requirements

- `REQ-WS-003`
- `REQ-WS-016`
- `REQ-WS-017`
- `REQ-WS-018`

## Result

The existing requirements already cover the latest user request. This work is handled as concrete source coverage expansion for `REQ-WS-018`, not as a new requirement.

## Reflected Changes

- Added global, Korean, India, India people/expert, and paper-discovery source origins to `source-discovery-registry.json`.
- Added broadly reusable global engineering sources to `enterprise-source-registry.json`.
- Made individual/community/adoption signals explicitly non-primary proof in config and documentation.
- Split paper sources into graph, publisher/venue, preprint, and code/adoption signal roles.

## Decision

- Requirement change needed: no
- Follow-up improvement: after real research tasks use this source set, remove or reclassify stale or low-signal sources.

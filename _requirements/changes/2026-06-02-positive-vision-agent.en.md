# Requirement Change: Positive Vision Agent

## Change

Add `REQ-WS-065`.

The platform shall provide `positive-vision-agent`, which turns "somehow make it happen" requests into grounded positive vision and executable pathways.

## Reason

The user asked for an expert that gives a positive vision. Existing `timekeeper-agent` handles time pressure, but a separate role is needed to preserve morale, possibility, agency, and execution paths under pressure.

## Acceptance Criteria

- Agent config and docs exist.
- The output contract includes desired future state, agency, pathways, if-then plans, risk truth, and fallback options.
- The policy prohibits unsupported guarantees, risk hiding, and verification bypass.
- Verification and evaluation pass.

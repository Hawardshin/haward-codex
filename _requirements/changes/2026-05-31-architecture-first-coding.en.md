# Requirement Change: Architecture-First Coding

## Change Summary

- Add `REQ-WS-015`.
- Require source-code work to research best-fit architectures and reference architectures, then record at least two structure candidates and decision rationale.

## Reason

The user instructed that source code should naturally look for best architectures. Existing `code_reference_sources` captured code examples, but did not separately require architecture option comparison and decision rationale.

## Impact

- `coding-research-agent` input and readiness checks gain architecture fields.
- Coding research reports need architecture references, options, and decision notes before implementation.
- Docs and settings files reflect the architecture-first coding policy.

## Verification

- Confirm `complete-coding-research` tests return `more_research_required` when architecture fields are missing.
- Validate JSON settings and config contracts.


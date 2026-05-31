# Requirement Change: Stack-Aware Coding Research

## Change Summary

- Add `REQ-WS-021`.
- Require coding research to manage `technology_stack`, `technology_official_docs`, `stack_version_constraints`, `issue_discussion_sources`, `issue_discussion_notes`, and `community_signal_notes`.

## Reason

The user stated that Java/Spring Boot, C, React, and Next.js need different official documentation, and high-signal Stack Overflow, Reddit, GitHub, and discussion activity can be valuable research input.

## Impact

- `coding-research-agent` readiness checks now flag missing stack-specific official docs/standards and missing community signal interpretation.
- Coding research templates, research profile, operating prompt/workflow, and persistent instructions are updated.
- Community reactions are recorded as discovery, adoption, or risk signals, not factual proof.

## Verification

- Unit tests cover missing new fields and missing technology-specific official docs.
- Changed JSON settings plus memory bootstrap/config contract are verified.

# Requirement Review: Coding Project Bootstrap

- Date: 2026-06-01
- Requirement: `REQ-WS-038`
- Review result: approved

## Fit

The request is not a single application feature. It is a shared operating capability for creating and continuing many future coding projects. It belongs across `_tools/`, `_ops/`, `_requirements/`, and `_specs/` as a shared workspace capability.

## Scope

- Included: technology-specific blueprints, dry-run planning, actual creation, optional root registry update, usage docs, workflow/prompt links, monitor reflection
- Excluded: dependency installation, external framework generator execution, immediate creation of a new product project

## Risks

- Overly large blueprints can create waste.
- Framework versions change quickly, so generated files should stay minimal.
- Registry updates should be allowed only for root project creation.

## Verification Criteria

Accept into the baseline after unit tests, workspace-health, structure-audit, memory bootstrap, request trace, and evaluation pass.

# Requirements Management

This folder defines, reviews, changes, and baselines requirements derived from user requests so implementation can be driven by those requirements.

## Purpose

- Convert user work requests into requirement candidates.
- Keep requirements editable and reviewable, with rationale and impact recorded.
- Make implementation and evaluation run against requirements.
- Separate project-specific requirements from shared workspace requirements.

## Path Convention

Shared workspace requirements:

```text
_requirements/baselines/YYYY-MM-DD-workspace-platform.ko.md
_requirements/changes/YYYY-MM-DD-<slug>.ko.md
_requirements/reviews/YYYY-MM-DD-<slug>.ko.md
```

Project-specific requirements:

```text
project-name/docs/requirements/
```

## Requirement Lifecycle

1. `candidate`: derive a requirement candidate from a user request or research.
2. `draft`: write the requirement, rationale, and verification method.
3. `reviewed`: review conflicts, gaps, verifiability, and project boundaries.
4. `baseline`: approve it as the current implementation basis.
5. `implemented`: link artifacts and commits.
6. `verified`: confirm with tests, document review, or evaluation.
7. `changed`: update it after a new request or review.
8. `superseded`: replace it with a better requirement.

## Required Fields

- Requirement ID
- Requirement statement
- Source request ID
- Rationale and intent
- Priority
- Status
- Owning scope
- Verification method
- Related artifacts
- Change history

## Close-Out Rule

Meaningful work must include `requirements_targets` in `work-evaluator-agent` input. Missing targets are blocking gaps.

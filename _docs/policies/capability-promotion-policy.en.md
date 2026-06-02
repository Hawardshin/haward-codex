# Capability Promotion Policy

## Purpose

The platform may create feature and capability candidates while doing work whenever it detects repetition, bottlenecks, omissions, or manual rework. This is bounded black-box processing, not opaque autonomous change.

## Principles

- Automation exists to reduce repeated human work.
- The user-facing flow may feel automatic, but the internal record must remain inspectable.
- Candidate generation can be broad; execution is limited by risk.
- Before generating ideas, model how a competent person would directly do the work: frame the goal, read context, check evidence, keep notes, compare options, execute, verify, and hand off.
- Separate idea generation from idea evaluation. Do not execute the first idea directly; create several ideas and evaluate them against explicit criteria.
- New functionality must start with the smallest reusable asset.
- High-risk changes must not run without a human checkpoint, rollback path, and audit record.

## Human Process Model

Automation candidates must first be explainable as a direct human work process.

- goal and success criteria
- existing context and constraints
- source or local evidence checks
- assumptions, unknowns, and working notes
- option and trade-off comparison
- decision reason or human judgment checkpoint
- smallest safe execution step
- result verification
- handoff summary and next action
- omission and rework review

If this model cannot be written, do not jump directly to automation. Consider documentation, a checklist, a prompt refinement, or additional research first.

## Promotion Order

1. `prompt`: repeated judgment framing
2. `workflow`: repeated sequence with close-out conditions
3. `template`: repeated structure
4. `tool`: deterministic execution, conversion, validation, or generation
5. `skill`: repeated agent behavior, domain rules, or tool integration knowledge
6. `agent`: repeated role that needs input/output/tool/policy/validation contracts
7. `project_feature`: UI, monitor, desktop app, or product feature

## Idea Evaluation

Generated ideas must be evaluated before promotion.

- repetition reduction
- time savings
- maintenance cost
- evidence strength
- risk and rollback fit
- smallest suitable asset fit

Each evaluation result must be one of `promote_now`, `queue_for_later`, `merge_with_existing_asset`, `reject`, or `human_review_required`. Rejected or queued ideas must keep their reasons.

## Human Checkpoints

The following must not execute automatically:

- destructive file/git/database/infrastructure changes
- secrets, tokens, credentials, or private data handling
- installs, upgrades, removals, or global configuration
- permission, cost, public deployment, or publishing changes
- security/privacy-sensitive features
- irreversible migrations
- changes with unclear project ownership boundaries

## Completion Criteria

Promoted capabilities must leave:

- observation evidence
- candidate and rejected lighter options
- human process model and work artifacts
- risk tier
- validation plan and result
- rollback or disablement path
- documentation
- evaluation
- commit and push

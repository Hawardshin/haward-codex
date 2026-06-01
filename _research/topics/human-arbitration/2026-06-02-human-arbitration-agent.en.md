# Human Arbitration Agent Research Summary

## Core Insight

In an AI workflow, a "both sides are right" situation must be split into two cases:

1. facts are still unresolved
2. facts are sufficiently grounded, but the remaining choice depends on values, strategy, risk appetite, or accountability

The first case should go back to research, validation, evaluators, or knowledge review before asking the human. The second case should not be decided by simulated AI certainty. It should become a small, answerable human decision packet.

## Evidence Roles

- NIST AI RMF: frames risk governance and accountability as part of AI operation.
- OECD AI Principles: treats human agency, oversight, and accountability as part of trustworthy AI.
- ISO/IEC 42001: frames AI use and provision as a management system with policies, objectives, and processes.
- EU AI Act: treats human oversight as a distinct requirement in high-risk AI contexts.

## Platform Application

- `human-arbitration-agent` does not route missing evidence directly to preference.
- Arbitration packets go into `_ops/coordination/human-decision-inbox.json`.
- While waiting, only the dependent branch pauses; safe `unblocked_work` continues.

## Reuse Value

Reuse this structure for design taste, project strategy, cost/quality trade-offs, principle conflicts, and risk-appetite decisions.

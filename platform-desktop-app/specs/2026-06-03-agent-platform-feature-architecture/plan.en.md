# Agent Platform Feature Architecture Plan

## Sequence

1. Add the product feature registry and connect requirements, product boundary, README, and distribution registry.
2. Extend the Workspace Monitor collector so feature layers enter developer and customer snapshots.
3. Add the Product Feature Architecture panel to Overview as a separate component.
4. Strengthen readiness, tests, and config-contract checks around primary/supporting feature roles.
5. Record history, evaluation, request trace, and work summary before commit and push.

## Structure Decision

- UI goes under `components/features/`.
- Collection logic goes under `scripts/lib/product-feature-architecture.mjs`.
- Monitoring sections remain available but are labeled and presented as supporting observability.

# Spec: Infrastructure Expert Agent

## Goal

Add an infrastructure expert role as a reusable agent spec so infrastructure, deployment, cloud, SRE, IaC, Kubernetes, security, cost, and operations-readiness decisions are source-grounded.

## Requirements

- `REQ-WS-060`
- `REQ-WS-063`

## Scope

- Included:
  - `infrastructure-expert-agent` spec
  - Korean and English agent documentation
  - requirement, spec, search, plan, evaluation, and request-trace records
  - official-doc and SRE-grounded source requirements
  - human checkpoint, rollback, resource-risk, and CLI adapter/pipeline safety rules
- Excluded:
  - installing cloud provider CLIs
  - installing Terraform, Kubernetes, Pulumi, OpenTofu, or other new tools
  - actual provisioning, migration, deletion, or DNS/network changes
  - runtime scheduler or long-running daemon implementation

## Success Criteria

- The agent spec is inspectable and listable through the existing agent registry.
- The agent spec follows required metadata from the orchestration registry contract.
- Documentation exists in Korean and English.
- Infrastructure decisions are not finalized from memory alone and separate official docs, SRE evidence, local config, risk, and rollback.
- High-risk operations lead to human checkpoints plus resource and CLI validation gates.

# Requirement Change: Infrastructure Expert Agent

- Date: 2026-06-02
- Change ID: `REQ-WS-063`
- Request ID: `UR-2026-06-02-021`
- Work mode: `governance`

## Change

Added `infrastructure-expert-agent` as a shared platform requirement for infrastructure, deployment, cloud architecture, SRE, IaC, Kubernetes, networking, security, cost, observability, backup/disaster recovery, and operations-readiness decisions.

## Rationale

Infrastructure decisions carry cost, security, reliability, data, and operational incident risks. The expert agent should therefore be an evidence-grounded reviewer/planner that separates official sources, local evidence, risk, rollback, and human checkpoints rather than a memory-only advisor.

## Impact

- Adds a new agent spec and Korean/English docs.
- Does not include real cloud provisioning or CLI installation.
- Future infrastructure work must re-check provider-specific official docs and local configuration.

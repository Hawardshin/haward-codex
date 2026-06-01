# Web Search Record: Infrastructure Expert Agent

- Date: 2026-06-02
- Work mode: `governance`
- Request summary: Add an infrastructure expert role as a platform agent.

## Queries

- `Google SRE book official site service reliability engineering principles`
- `AWS Well-Architected Framework operational excellence reliability official`
- `Azure Well-Architected Framework reliability operational excellence official`
- `Terraform best practices infrastructure as code official documentation Kubernetes production best practices official`

## Checked Sources

| Source | Type | What was checked | Application |
| --- | --- | --- | --- |
| https://sre.google/books/ | official SRE material | SRE and reliability principles can ground infrastructure decisions | Added SRE/reliability evidence lane |
| https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html | cloud provider official docs | Well-Architected review separates operational excellence, reliability, security, cost, and other concerns | Added cost/security/reliability impact to the output contract |
| https://learn.microsoft.com/en-us/azure/well-architected/ | cloud provider official docs | Azure Well-Architected Framework covers workload quality dimensions and trade-offs | Added cloud/provider official docs evidence lane |
| https://kubernetes.io/docs/setup/production-environment/ | Kubernetes official docs | Production Kubernetes requires environment preparation and configuration review | Added Kubernetes official docs evidence lane |
| https://developer.hashicorp.com/terraform/language/style | Terraform official docs | IaC benefits from documented and consistent style guidance | Added Terraform/IaC official docs evidence lane |

## Weak Source Handling

- Blogs, issues, discussions, and postmortems may be useful, but the agent treats them as discovery or risk signals rather than standalone proof.
- No cloud vendor, CLI, or IaC tool was selected or installed in this request.

## Plan Impact

- The infrastructure expert is defined as an evidence-lane review/planning agent, not a memory-only answerer.
- Production changes, destructive commands, secret/DNS/network changes, and cost-impacting work require human checkpoints and rollback plans.
- Long-running processes, servers, queues, caches, streams, or subprocesses connect to resource guard and CLI pipeline policies.

## Uncertainty

- The user has not selected a specific cloud provider, IaC tool, or deployment target.
- This change therefore remains a provider-agnostic agent contract; future project use must re-check provider-specific official documentation.

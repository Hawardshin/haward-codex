# Infrastructure Expert Agent Research Note

- Date: 2026-06-02
- Purpose: Capture which evidence lanes and safety rules are needed when adding an infrastructure expert agent to the platform.

## Main Conclusions

- The infrastructure expert should start as a reviewer/planner rather than an executor.
- Official cloud provider docs, SRE principles, Kubernetes/IaC official docs, and local repository evidence need separate lanes.
- Blogs, issues, discussions, and postmortems are useful for adoption/risk discovery but are not standalone production facts.
- Cost, security, reliability, operational excellence, rollback, observability, and blast radius must be part of the output contract.

## Reusable Rules

- Cloud-specific work must re-check that provider's official docs.
- IaC work should clarify plan/dry-run, state, secrets, and rollback boundaries before execution.
- Kubernetes work should separate production environment, cluster lifecycle, network/security, workload health, and observability.
- Work involving long-running processes or external CLIs should check resource guard and CLI pipeline policies together.

## References

- Google SRE Books: https://sre.google/books/
- AWS Well-Architected Framework: https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html
- Azure Well-Architected Framework: https://learn.microsoft.com/en-us/azure/well-architected/
- Kubernetes Production Environment: https://kubernetes.io/docs/setup/production-environment/
- Terraform Style Guide: https://developer.hashicorp.com/terraform/language/style

# Source Provenance: Infrastructure Expert Agent

| Value/decision | Source | Source type | Application |
| --- | --- | --- | --- |
| Need SRE/reliability evidence lane | https://sre.google/books/ | official SRE material | Added SRE/reliability references to agent source requirements |
| Operational excellence, reliability, security, and cost should be separated | https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html | cloud provider official docs | Added cost/security/reliability notes to output contract |
| Cloud workload quality dimensions and trade-offs are needed | https://learn.microsoft.com/en-us/azure/well-architected/ | cloud provider official docs | Required architecture options and trade-offs |
| Kubernetes production readiness requires environment checks | https://kubernetes.io/docs/setup/production-environment/ | Kubernetes official docs | Added Kubernetes official docs evidence lane |
| IaC style and consistency need checking | https://developer.hashicorp.com/terraform/language/style | Terraform official docs | Added Terraform/IaC official docs evidence lane |
| Agent specs need blueprint, pattern, and validation commands | `agent-platform/configs/orchestration/agent-orchestration-registry.json` | internal config | Added `metadata.blueprint`, `orchestration_pattern`, and `validation_commands` |
| High-risk infrastructure work needs human checkpoints | `agent-platform/configs/agents/infrastructure-expert-agent.json` | produced artifact | Marked provisioning, deletion, migration, secrets, DNS/network, and cost-impacting work as checkpoint targets |

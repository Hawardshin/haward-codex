# Source Provenance: Infrastructure Expert Agent

| 값/판단 | 출처 | 출처 유형 | 적용 방식 |
| --- | --- | --- | --- |
| SRE/reliability evidence lane 필요 | https://sre.google/books/ | 공식 SRE 자료 | agent source requirements에 SRE/reliability references 포함 |
| 운영 우수성, 신뢰성, 보안, 비용을 분리해야 함 | https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html | cloud provider 공식 문서 | output contract에 cost/security/reliability notes 포함 |
| cloud workload 품질 축과 trade-off 필요 | https://learn.microsoft.com/en-us/azure/well-architected/ | cloud provider 공식 문서 | architecture options/trade-off 요구 |
| Kubernetes production 환경 준비성 확인 필요 | https://kubernetes.io/docs/setup/production-environment/ | Kubernetes 공식 문서 | Kubernetes official docs evidence lane 포함 |
| IaC style/consistency 확인 필요 | https://developer.hashicorp.com/terraform/language/style | Terraform 공식 문서 | Terraform/IaC official docs evidence lane 포함 |
| agent spec은 blueprint/pattern/validation command를 가져야 함 | `agent-platform/configs/orchestration/agent-orchestration-registry.json` | 내부 설정 | `metadata.blueprint`, `orchestration_pattern`, `validation_commands` 포함 |
| 위험한 인프라 작업은 human checkpoint 필요 | `agent-platform/configs/agents/infrastructure-expert-agent.json` | 이번 산출물 | provisioning/deletion/migration/secret/DNS/network/cost-impacting 작업을 checkpoint 대상으로 명시 |

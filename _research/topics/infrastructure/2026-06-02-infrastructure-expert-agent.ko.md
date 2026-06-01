# Infrastructure Expert Agent 조사 노트

- 날짜: 2026-06-02
- 목적: 플랫폼에 인프라 전문가 에이전트를 추가할 때 어떤 근거 lane과 안전 규칙이 필요한지 정리한다.

## 핵심 결론

- 인프라 전문가는 실행자보다 검토자/계획자로 시작해야 한다.
- 공식 cloud provider 문서, SRE 원칙, Kubernetes/IaC 공식 문서, local repository evidence를 분리해야 한다.
- 블로그, issue, discussion, postmortem은 채택 신호나 위험 발견에는 유용하지만 프로덕션 사실 확정 근거로는 부족하다.
- 비용, 보안, 신뢰성, 운영 우수성, rollback, observability, blast radius가 output contract에 포함되어야 한다.

## 재사용 규칙

- cloud-specific 작업은 해당 provider 공식 문서를 다시 확인한다.
- IaC 작업은 plan/dry-run과 state/secret/rollback 경계를 먼저 정리한다.
- Kubernetes 작업은 production environment, cluster lifecycle, network/security, workload health, observability를 분리해 검토한다.
- 장시간 실행 프로세스나 외부 CLI를 붙이는 작업은 resource guard와 CLI pipeline 정책을 동시에 검토한다.

## 참고 출처

- Google SRE Books: https://sre.google/books/
- AWS Well-Architected Framework: https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html
- Azure Well-Architected Framework: https://learn.microsoft.com/en-us/azure/well-architected/
- Kubernetes Production Environment: https://kubernetes.io/docs/setup/production-environment/
- Terraform Style Guide: https://developer.hashicorp.com/terraform/language/style

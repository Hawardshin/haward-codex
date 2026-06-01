# 웹 검색 기록: Infrastructure Expert Agent

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 요청 요약: 인프라 전문가 역할을 플랫폼 agent로 추가한다.

## 검색 쿼리

- `Google SRE book official site service reliability engineering principles`
- `AWS Well-Architected Framework operational excellence reliability official`
- `Azure Well-Architected Framework reliability operational excellence official`
- `Terraform best practices infrastructure as code official documentation Kubernetes production best practices official`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| https://sre.google/books/ | 공식 SRE 자료 | SRE 원칙과 운영 신뢰성 관점을 인프라 판단 근거로 사용 | SRE/reliability evidence lane 추가 |
| https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html | cloud provider 공식 문서 | well-architected 검토가 운영 우수성, 신뢰성, 보안, 비용 등 축을 분리한다는 점 확인 | output contract에 비용/보안/신뢰성 영향 포함 |
| https://learn.microsoft.com/en-us/azure/well-architected/ | cloud provider 공식 문서 | Azure Well-Architected Framework가 workload 품질 축과 trade-off를 다룬다는 점 확인 | cloud/provider official docs evidence lane 추가 |
| https://kubernetes.io/docs/setup/production-environment/ | Kubernetes 공식 문서 | production Kubernetes는 환경 준비와 구성 검토가 필요하다는 점 확인 | Kubernetes official docs evidence lane 추가 |
| https://developer.hashicorp.com/terraform/language/style | Terraform 공식 문서 | IaC 문서화와 일관된 style guide의 필요성 확인 | Terraform/IaC official docs evidence lane 추가 |

## 약한 출처 처리

- 블로그, issue, 토론, postmortem은 유용할 수 있지만 사실 확정 근거가 아니라 discovery/risk signal로만 사용하도록 agent policy에 반영했다.
- 특정 cloud vendor 선택, CLI 설치, IaC 도구 설치는 이번 요청 범위가 아니므로 실행하지 않았다.

## 계획 영향

- 인프라 전문가는 기억 기반 답변자가 아니라 evidence lane을 분리하는 검토/계획 agent로 정의한다.
- 프로덕션 변경, destructive command, secret/DNS/network/cost-impacting 작업은 human checkpoint와 rollback 계획을 요구한다.
- 장시간 실행 프로세스, 서버, queue, cache, stream, subprocess가 있으면 resource guard와 CLI pipeline 정책으로 연결한다.

## 불확실성

- 사용자가 원하는 특정 cloud provider, IaC 도구, 배포 대상은 아직 정해지지 않았다.
- 따라서 이번 작업은 provider-agnostic agent 계약으로 남기고, 실제 프로젝트 적용 시 provider별 공식 문서를 다시 확인해야 한다.

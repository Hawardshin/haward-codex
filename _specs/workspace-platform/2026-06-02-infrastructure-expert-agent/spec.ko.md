# Spec: Infrastructure Expert Agent

## 목표

플랫폼에 인프라 전문가 역할을 재사용 agent spec으로 추가해, 인프라/배포/클라우드/SRE/IaC/Kubernetes/보안/비용/운영 준비성 판단이 출처 기반으로 이루어지게 한다.

## 요구사항

- `REQ-WS-060`
- `REQ-WS-063`

## 범위

- 포함:
  - `infrastructure-expert-agent` spec
  - 한/영 agent 문서
  - 요구사항, 스펙, 검색, 계획, 평가, 요청 추적 기록
  - 공식 문서/SRE 근거 기반의 출처 요구사항
  - human checkpoint, rollback, resource risk, CLI adapter/pipeline 안전 규칙
- 제외:
  - cloud provider CLI 설치
  - Terraform, Kubernetes, Pulumi, OpenTofu 등 신규 도구 설치
  - 실제 provisioning, migration, deletion, DNS/network 변경
  - runtime scheduler 또는 장시간 daemon 구현

## 성공 기준

- agent spec이 기존 agent registry에서 inspection/list 대상이 된다.
- agent spec이 orchestration registry의 필수 metadata 계약을 따른다.
- 문서가 한국어/영어로 제공된다.
- 인프라 결정을 기억 기반으로 확정하지 않고 공식 문서, SRE 근거, local config, risk/rollback으로 분리한다.
- 운영 위험이 큰 작업은 human checkpoint와 resource/CLI 검증 게이트로 이어진다.

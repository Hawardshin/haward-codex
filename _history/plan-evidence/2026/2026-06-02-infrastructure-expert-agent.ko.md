# Plan Evidence: Infrastructure Expert Agent

## 결정

- reusable domain agent로 구현한다.
- agent owner는 `agent-platform/`이다.
- 실제 인프라 실행, CLI 설치, cloud provisioning은 하지 않는다.
- agent contract에 공식 출처, risk register, rollback, human checkpoint, resource/CLI 정책 연결을 포함한다.

## 근거

- 사용자 요청은 짧지만 “인프라 전문가”라는 역할 추가이므로 이전에 구축한 agent creation/orchestration registry를 적용하는 것이 맞다.
- 인프라 결정은 비용, 보안, 신뢰성, 운영 리스크가 높으므로 기억 기반 답변이 아니라 출처 lane을 분리해야 한다.
- SRE와 cloud well-architected 문서는 운영 우수성, 신뢰성, 보안, 비용, trade-off를 분리해 판단하는 구조와 잘 맞는다.
- Terraform/Kubernetes 작업은 공식 문서를 다시 확인해야 하는 기술별 영역이므로 agent source requirements에 포함한다.

## 대안

- 새 root project 생성: 특정 인프라 제품이나 provider가 정해진 것이 아니므로 보류했다.
- 실제 CLI/도구 설치: 이번 요청은 전문가 agent 생성이므로 범위에서 제외했다.
- 런타임 scheduler 구현: agent spec이 먼저 필요하므로 후속 개선으로 남겼다.

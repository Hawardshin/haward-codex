# 요구사항 변경: Infrastructure Expert Agent

- 날짜: 2026-06-02
- 변경 ID: `REQ-WS-063`
- 요청 ID: `UR-2026-06-02-021`
- 작업 모드: `governance`

## 변경 내용

인프라, 배포, 클라우드 아키텍처, SRE, IaC, Kubernetes, 네트워크, 보안, 비용, 관측성, 백업/재해복구, 운영 준비성 판단을 담당하는 `infrastructure-expert-agent`를 플랫폼 공통 요구사항으로 추가했다.

## 이유

인프라 결정은 비용, 보안, 신뢰성, 데이터, 운영 사고의 위험이 크다. 따라서 전문가 agent는 기억 기반 조언자가 아니라 공식 출처, local evidence, risk/rollback/human checkpoint를 분리하는 검토/계획 agent여야 한다.

## 영향

- 새 agent spec과 한/영 문서를 추가한다.
- 실제 cloud provisioning이나 CLI 설치는 이번 변경에 포함하지 않는다.
- 향후 인프라 작업은 provider별 공식 문서와 local config를 다시 확인해야 한다.

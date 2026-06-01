# 요구사항 검토: Infrastructure Expert Agent

- 날짜: 2026-06-02
- 검토 대상: `REQ-WS-063`
- 상태: 승인

## 검토

- 사용자 요청 `인프라 전문가`는 새 reusable agent 역할로 해석하는 것이 기존 agent orchestration 구조와 맞다.
- 새 root project를 만들 근거는 부족하다. 특정 인프라 제품, cloud provider, 또는 배포 대상이 생기면 그때 별도 프로젝트로 분리한다.
- 인프라 agent는 실제 실행보다 출처 기반 계획, 위험 분리, 검증, rollback, human checkpoint를 우선해야 한다.

## 수용 기준

- agent spec이 inspect/list 가능해야 한다.
- 한/영 문서가 있어야 한다.
- 공식 출처, SRE/IaC/Kubernetes 근거, local evidence, human checkpoint, rollback, resource/CLI 안전 규칙이 명시되어야 한다.

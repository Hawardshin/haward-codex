# 계획: Human Arbitration Agent

## 목적

여러 옵션이나 에이전트 판단이 모두 합리적일 때 AI가 임의로 최종 결정을 꾸미지 않고 사람이 판단하도록 만드는 구조를 추가한다.

## 작업 모드

- `governance`

## 범위

- `REQ-WS-068` 추가
- `human-arbitration-agent` 설정과 한영 문서 추가
- 영속 지시와 `agent-platform/README.md` 갱신
- memory bootstrap anchor 추가
- 히스토리, provenance, plan evidence, 평가 기록 저장

## 비범위

- 실제 런타임 arbitration engine 구현
- 알림 전송 토큰 설정
- UI 카드 구현

## 구현 순서

1. 공식 출처 기반으로 human oversight, accountability, management system 근거를 기록한다.
2. 기존 `human-decision-inbox`, `principle-guardian-agent`, `spec-reconciliation-agent`와 중복되지 않는 역할을 정의한다.
3. agent config와 docs를 추가한다.
4. 요구사항 기준선과 persistent instructions를 갱신한다.
5. 검증, omission, grounding, evaluator를 실행하고 커밋/push한다.

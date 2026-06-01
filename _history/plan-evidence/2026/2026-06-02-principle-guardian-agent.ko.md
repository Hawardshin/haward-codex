# Plan Evidence: Principle Guardian Agent

## 요구 해석

사용자는 “다들 강력하게 원칙을 고수한다”고 말했다. 이는 모든 에이전트가 속도, 돈, 낙관, 편의 때문에 운영 원칙을 우회하지 않도록 공통 가드를 추가하라는 durable instruction으로 해석했다.

## 결정

- agent name: `principle-guardian-agent`
- boundary: `agent-platform` 공통 governance agent
- work mode: `governance`
- output: principle adherence brief

## 근거 기반 설계

- NIST AI RMF → governance, risk management, measurement
- ISO/IEC 42001 → AI management system, policies, objectives, processes, continual improvement
- OECD AI Principles → transparency, robustness, safety, accountability
- HRO 원칙 → failure sensitivity, reluctance to simplify, sensitivity to operations

## 다른 선택지

- `principle-enforcer-agent`: 강제성은 좋지만 너무 명령형으로 보이고 human decision routing 뉘앙스가 약해 제외했다.
- `ethics-agent`: 윤리만으로 좁아져 repository 운영 원칙, spec, evidence, validation까지 포괄하지 못해 제외했다.
- `principle-guardian-agent`: 원칙 보호, 충돌 노출, human checkpoint까지 포괄해 선택했다.

## 예상 검증

- agent spec이 `inspect-agent`로 읽혀야 한다.
- `list-agents`에 포함되어야 한다.
- orchestration registry check가 깨지지 않아야 한다.
- durable instructions와 history가 연결되어야 한다.

# Human Arbitration Agent 조사 요약

## 핵심 인사이트

AI workflow에서 “둘 다 맞다”는 상황은 두 종류로 나눠야 한다.

1. 아직 사실이 불확실한 상태
2. 사실은 충분히 확인됐지만 선택 기준이 가치, 전략, 위험감수성, 책임소재에 달린 상태

첫 번째는 사람에게 묻기 전에 검색, 검증, evaluator, 지식 검토로 해결해야 한다. 두 번째는 AI가 최종 권한을 흉내내면 안 되며, 사람이 판단할 수 있는 작고 명확한 decision packet으로 전환해야 한다.

## 근거 역할

- NIST AI RMF: risk governance와 accountability를 AI 운영 구조에 포함한다.
- OECD AI Principles: human agency, oversight, accountability를 trustworthy AI의 일부로 본다.
- ISO/IEC 42001: AI 사용과 제공을 정책, 목표, 프로세스가 있는 management system으로 다룬다.
- EU AI Act: high-risk AI 맥락에서 human oversight가 별도 요구사항으로 다뤄진다.

## 플랫폼 적용

- `human-arbitration-agent`는 사실 검증이 부족한 문제를 바로 사람 취향으로 넘기지 않는다.
- 중재 패킷은 `_ops/coordination/human-decision-inbox.json`에 들어가야 한다.
- 답변 대기 중에는 해당 branch만 멈추고, 안전한 `unblocked_work`는 계속한다.

## 재사용 가치

앞으로 디자인 취향, 프로젝트 전략, 비용/품질 trade-off, 원칙 충돌, 위험감수성 판단이 필요한 작업에서 이 구조를 재사용한다.

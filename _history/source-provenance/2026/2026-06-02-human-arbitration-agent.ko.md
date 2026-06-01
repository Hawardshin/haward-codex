# Source Provenance: Human Arbitration Agent

| 값/주장 | 출처 | 접근일 | 사용 방식 |
| --- | --- | --- | --- |
| AI governance에는 risk management와 accountability가 필요하다. | NIST AI Risk Management Framework, NIST AI RMF 1.0 | 2026-06-02 | 중재 에이전트가 판단/위험/책임을 분리해야 한다는 근거 |
| trustworthy AI에는 human agency, oversight, accountability가 포함된다. | OECD AI Principles | 2026-06-02 | 사람이 판단해야 하는 영역을 명시하는 근거 |
| AI 운영은 정책, 목표, 프로세스를 갖춘 management system으로 다룰 수 있다. | ISO/IEC 42001 | 2026-06-02 | 중재를 ad hoc 질문이 아니라 프로세스화하는 근거 |
| high-risk AI에서 human oversight가 별도 요구사항으로 다뤄진다. | EUR-Lex Regulation (EU) 2024/1689 | 2026-06-02 | human checkpoint를 decision gate로 두는 근거 |
| 기존 플랫폼은 pending human decision을 한 곳에 모은다. | `_ops/coordination/human-decision-inbox.json` | 2026-06-02 | 중재 패킷 저장소로 재사용 |

## 한계

외부 자료는 일반 AI governance 근거이고, 이 저장소의 구체 agent 구조는 로컬 요구사항과 기존 운영 파일에 맞춰 설계했다.

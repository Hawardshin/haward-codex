# Source Provenance: Human Process Capability Promotion

## Source Values

| 값/주장 | 출처 | 사용 위치 | 신뢰도 | 한계 |
| --- | --- | --- | --- | --- |
| 사람 중심 설계는 사용자, 작업, 환경, 요구사항, 설계, 평가를 다룬다. | NIST Human Centered Design | `human_process_model` 설계 | 높음 | 해당 페이지는 일부 오래된 내용일 수 있다고 표시하지만 2026-05-27 갱신됨 |
| 인간-AI task는 인간 목표와 결과 중심으로 분해해야 한다. | NIST AI Use Taxonomy | generated idea가 human process step에서 나오도록 하는 규칙 | 높음 | 분류 체계라서 구체 구현 방식은 로컬 검증 필요 |
| 좋은 문제 해결은 질문 framing, 자료 수집, 합성, 아이디어, 테스트, 스토리 공유를 오간다. | IDEO Design Thinking Process | human-like sequence 구성 | 중간 | 디자인 방법론 자료이며 소프트웨어 운영 계약으로는 로컬 조정 필요 |
| 위험이 큰 자동화 결정은 review gate와 사람이 승인/수정할 지점을 명시해야 한다. | Open Practice Library Human-in-the-Loop | human checkpoint 보강 | 중간 | 커뮤니티 실무 레퍼런스이므로 공식 규제 근거 자체로 쓰지 않음 |
| 기존 `REQ-WS-070`은 bounded black-box capability promotion과 idea evaluation gate를 요구한다. | `_requirements/baselines/2026-05-31-workspace-platform.ko.md` | 요구사항 보강 | 높음 | 내부 기준선이므로 최신 변경 후 검증 필요 |

## Decision

이번 변경은 새 에이전트를 추가하지 않고, 기존 `capability-promotion-agent`와 registry에 `human_process_model`을 추가하는 방식으로 처리했다. 이유는 사용자의 말이 새로운 독립 기능보다 기존 자동 개선 흐름의 전제 조건을 보강하는 내용이기 때문이다.


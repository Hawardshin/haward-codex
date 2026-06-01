# Plan Evidence: Human Arbitration Agent

| 계획 단계 | 근거 |
| --- | --- |
| 새 agent로 분리 | 기존 `human-decision-inbox`는 저장소이고 `principle-guardian-agent`는 원칙 감시라서 판단 패킷 생성 역할이 비어 있었다. |
| 사실 불확실성과 가치판단 분리 | NIST/OECD/ISO/EU 자료는 책임, 감독, 프로세스가 필요하다는 방향을 뒷받침한다. |
| human decision inbox에 연결 | 기존 interrupt/resume 구조를 재사용하면 사람이 답할 때 현재 작업을 checkpoint하고 affected work만 재개할 수 있다. |
| governance 모드 선택 | 영속 지시, 요구사항 기준선, agent spec, memory anchor가 바뀌는 플랫폼 규칙 변경이다. |
| 런타임 엔진은 만들지 않음 | 현재 요청은 구조와 규칙 추가가 목적이고, 실행 엔진은 실제 반복 사용 패턴이 쌓인 뒤 설계하는 것이 낫다. |

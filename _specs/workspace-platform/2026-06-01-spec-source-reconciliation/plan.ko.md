# 구현 계획

## 작업 모드

- 선택 모드: `standard`
- 이유: durable workflow, CLI, 알림 이벤트, 메모리 anchor, 요구사항 기준선을 바꾸는 작업이다.

## 근거

- ISO/IEC/IEEE 29148은 요구사항 정보 항목과 요구사항 프로세스를 생명주기 전반에서 관리하는 기준을 제공한다.
- IBM traceability 문서는 요구사항과 개발/테스트 artifact 연결 및 변경 영향 분석을 요구사항 관리의 핵심 활동으로 설명한다.
- 기존 저장소 정책은 의미 있는 구현 작업을 spec-driven 산출물과 traceability로 관리하도록 요구한다.

## 단계

1. 기존 spec-driven workflow, prompt router, notification config, CLI 구조를 확인한다.
2. 스펙/소스 조정 입력 템플릿과 deterministic checker를 만든다.
3. CLI subcommand와 agent config를 연결한다.
4. `clarification_needed` 이벤트를 notification routing에 추가한다.
5. 워크플로, 프롬프트, 문서, 메모리 anchor에 규칙을 반영한다.
6. 요구사항, 스펙 산출물, 히스토리, 평가 보고서를 작성한다.
7. 단위 테스트와 config/memory/workspace 검증을 실행한다.
8. 변경을 커밋하고 push한다.

## 리스크와 대응

- 리스크: 모든 작업에 추가 루프가 생겨 느려질 수 있다.
- 대응: 스펙이 애매하거나 소스/테스트/산출물과 다를 때만 workflow를 사용한다.

- 리스크: 사용자가 답하기 어려운 추상 질문이 생길 수 있다.
- 대응: 안정적 질문 ID, 선택지, 답변 형식, 결정 영향을 필수 필드로 둔다.

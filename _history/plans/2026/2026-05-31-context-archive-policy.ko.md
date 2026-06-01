# 계획 기록: 컨텍스트 아카이브 정책

## 초기 요청

사용자는 에이전트가 스스로 컨텍스트가 많이 찼다고 판단하면 요약하고 아카이빙을 잘하며, 이후에는 문서를 기반으로 동작하도록 구조를 만들라고 지시했다.

## 검색 질문

- 긴 LLM/에이전트 대화에서 컨텍스트 압축은 어떤 위험이 있는가?
- 요약과 원문 근거/검색 가능한 아카이브를 어떻게 나누는가?
- 다음 세션이 모든 히스토리를 읽지 않고 이어가려면 어떤 resume packet이 필요한가?

## 확인한 출처

- ReadAgent: gist memory와 원문 lookup 구조
- Evaluating Very Long-Term Conversational Memory of LLM Agents: 장기 대화 기억 평가
- Active Context Compression: 에이전트의 능동적 context bloat 관리
- Microsoft Agent Framework Memory and Persistence: memory/history/session state 분리
- 기존 내부 문서: `_docs/operating-models/context-management.md`, `_docs/policies/memory-bootstrap-policy.ko.md`, `_ops/prompts/50-compress-context.md`

## 도출한 인사이트

- 아카이브는 원문 대체물이 아니라 재개 색인이어야 한다.
- 반드시 읽을 파일, 남은 작업, 검증 상태, 링크를 분리하면 다음 세션이 필요한 문서만 읽을 수 있다.
- 오래된 archive packet은 지식 베이스처럼 틀릴 수 있으므로 skeptic 검증을 연결한다.
- 컨텍스트 아카이빙이 발생한 작업은 평가 입력에서 archive target을 확인해야 한다.

## 선택한 계획

1. `_history/context-archives/` README와 한영 템플릿을 추가한다.
2. `_docs/context-archive-policy.*`와 `_ops/workflows/45-context-archive.md`를 추가한다.
3. 기존 context management 문서와 compress prompt를 강화한다.
4. `work-evaluator-agent`에 `context_archiving_occurred`, `context_archive_targets`를 추가한다.
5. persistent rules, README, AGENTS, ops index, memory bootstrap manifest를 갱신한다.
6. 이번 작업 자체의 context archive packet을 만든다.
7. 검증, 평가, 커밋, push를 수행한다.

## 보류한 선택지

- 전체 채팅 원문 저장: 민감 정보와 내부 추론, 불필요한 로그를 보존할 위험이 있어 채택하지 않았다.
- 고정 토큰 임계값 사용: 모델과 작업마다 다르므로 “다음 세션이 문서만 보고 이어갈 수 있는가”를 기준으로 삼았다.

## 위험과 불확실성

- 요약은 항상 손실 가능성이 있다.
- 오래된 archive packet은 현재 저장소와 충돌할 수 있다.
- 따라서 packet은 must-read 파일과 검증 경로를 포함하고, 오래된 내용을 재사용할 때 skeptic 검증을 요구한다.

## 검증 방법

- work evaluator 단위 테스트
- JSON 형식 검증
- memory bootstrap 검증
- config contract 검증
- workspace map/task board 재생성 및 check
- knowledge/grounding/evaluation CLI 확인

## 계획 변경 이력

- 2026-05-31: 최초 작성.

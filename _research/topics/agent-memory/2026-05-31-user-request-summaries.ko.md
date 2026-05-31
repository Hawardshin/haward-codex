# 사용자 요청 요약 저장 레퍼런스

## 질문

사용자의 다양한 지시와 프롬프트를 원문 전체 없이도 나중에 재사용할 수 있게 저장하려면 어떤 구조가 좋은가?

## 확인한 출처

| 출처 | 유형 | 확인일 | 활용 |
| --- | --- | --- | --- |
| [Memory Matters](https://ojs.aaai.org/index.php/AAAI-SS/article/view/27688) | 논문 | 2026-05-31 | 장기 에이전트 메모리에서 memory type separation이 필요하다는 관점을 참고했다. |
| [Microsoft Agent Framework Memory & Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory) | 공식 문서 | 2026-05-31 | session state, context provider, history provider로 장기 컨텍스트를 주입/저장하는 패턴을 참고했다. |
| [agentmemory.md](https://agentmemory.md/) | 오픈소스 도구 문서 | 2026-05-31 | 결정, 목표, 선호, 작업을 구조화된 메모리 타입으로 관리하는 관점을 참고했다. |
| [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | 문서화 관행 | 2026-05-31 | 오래 읽히는 기록은 사람이 이해할 수 있어야 한다는 관점을 참고했다. |

## 인사이트

- 사용자 요청 요약은 작업 결과 요약과 다르다. 작업 요약은 "무엇을 했는가"이고 요청 요약은 "사용자가 무엇을 원했는가"다.
- 원문 보존은 비용과 민감 정보 위험이 있으므로 기본값은 의미 요약이다.
- 요약에는 요청 순서, 의도 유형, 지속 규칙 여부, 반영 위치, 관련 링크가 있어야 한다.
- 평가 에이전트가 `user_request_summary_targets`를 확인하면 요청 요약 누락을 줄일 수 있다.
- 요청 요약은 flat file로 시작하되, 프로젝트와 요청 수가 커지면 그래프/검색 기반 메모리 도구로 승격할 수 있어야 한다.

## 적용

- `_history/user-requests/`를 사용자 요청 요약 계층으로 추가한다.
- `_templates/user-request-summary/`에 한영 템플릿을 둔다.
- `_docs/user-request-summary-policy.*`를 추가한다.
- `work-evaluator-agent`에 `user_request_summary_targets`를 추가한다.

## 불확실성

요청 요약은 원문보다 압축된 표현이므로 뉘앙스 손실 가능성이 있다. 중요한 판단에는 관련 히스토리, 평가 보고서, 커밋, 또는 현재 사용자 확인을 함께 사용해야 한다.

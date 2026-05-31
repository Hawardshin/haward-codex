# 컨텍스트 아카이브 정책 레퍼런스

## 질문

긴 에이전트 대화에서 컨텍스트가 포화될 때 어떤 정보를 요약하고, 무엇을 아카이브하며, 다음 세션은 어떻게 문서 기반으로 재개해야 하는가?

## 확인한 출처

| 출처 | 유형 | 확인일 | 활용 |
| --- | --- | --- | --- |
| [ReadAgent](https://huggingface.co/papers/2402.09727) | 논문 요약/논문 | 2026-05-31 | 긴 문맥을 episode와 gist memory로 압축하되 필요 시 원문 조회가 가능해야 한다는 구조를 참고했다. |
| [Evaluating Very Long-Term Conversational Memory of LLM Agents](https://arxiv.org/abs/2402.17753) | 논문 | 2026-05-31 | 장기 대화에서 기억, 시간 순서, 세션 일관성 문제가 평가 대상이 된다는 점을 참고했다. |
| [Active Context Compression](https://arxiv.org/abs/2601.07190) | 논문 | 2026-05-31 | 에이전트가 능동적으로 context bloat를 관리해야 한다는 관점을 참고했다. |
| [Microsoft Agent Framework Memory and Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory) | 공식 문서 | 2026-05-31 | 지속 memory, history, session state를 분리하는 구조를 참고했다. |

## 인사이트

- 컨텍스트 압축은 원문 손실을 만들 수 있으므로, 요약만으로 운영 상태를 대체하면 안 된다.
- resume packet은 전체 원문이 아니라 작업 재개를 위한 색인이어야 한다.
- 반드시 읽을 파일과 남은 작업을 분리하면 다음 세션이 모든 히스토리를 읽지 않아도 된다.
- 오래된 packet은 지식 베이스처럼 틀릴 수 있으므로 회의론적 검증 경로가 필요하다.
- 평가 에이전트가 context archive target을 확인하면 아카이브 누락을 줄일 수 있다.

## 적용

- `_history/context-archives/`를 컨텍스트 재개 패킷 저장소로 추가한다.
- `_templates/context-archive/`에 한영 템플릿을 둔다.
- `_docs/context-archive-policy.*`와 `_ops/workflows/45-context-archive.md`를 추가한다.
- `work-evaluator-agent`에 `context_archiving_occurred`와 `context_archive_targets`를 추가한다.

## 불확실성

컨텍스트 포화 기준은 모델, 작업 복잡도, 도구 상태에 따라 달라진다. 이 정책은 정확한 토큰 임계값보다 “다음 세션이 문서만 보고 이어갈 수 있는가”를 판단 기준으로 삼는다.

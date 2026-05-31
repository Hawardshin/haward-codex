# 2026-05-31 웹 검색 기록: 컨텍스트 아카이브 정책

## 사용자 지시 요약

사용자는 에이전트가 스스로 컨텍스트가 많이 찼다고 판단하면 요약과 아카이빙을 잘하고, 이후에는 문서를 기반으로 동작하도록 구조를 만들라고 지시했다.

## 검색 실행

- 검색 시각: 2026-05-31
- 검색어:
  - `AI agent context compression memory summarization archive best practices official docs`
  - `LLM agent memory context management summarization long conversations paper`
  - `OpenAI prompt caching conversation summarization context management agent docs`
- 검색 도구: Codex web search

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| [ReadAgent: A Human-Inspired Reading Agent with Gist Memory of Very Long Contexts](https://huggingface.co/papers/2402.09727) | 논문 요약/논문 | 2026-05-31 | 긴 컨텍스트를 memory episode와 gist memory로 압축하고 필요 시 원문을 다시 조회하는 구조를 참고했다. |
| [Evaluating Very Long-Term Conversational Memory of LLM Agents](https://arxiv.org/abs/2402.17753) | 논문 | 2026-05-31 | 장기 대화에서 시간/인과/세션 일관성 문제가 생길 수 있다는 평가 관점을 참고했다. |
| [Active Context Compression: Autonomous Memory Management in LLM Agents](https://arxiv.org/abs/2601.07190) | 논문 | 2026-05-31 | 에이전트가 능동적으로 컨텍스트를 압축해야 한다는 관점을 참고했다. |
| [Microsoft Agent Framework Memory and Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory) | 공식 문서 | 2026-05-31 | memory provider, history provider, session state처럼 지속 상태를 분리하는 관점을 참고했다. |

## 제외하거나 약한 출처

| 출처 | 이유 |
| --- | --- |
| Reddit/개인 경험 중심 글 | 실무 신호로는 참고 가능하지만, 정책 근거는 공식 문서와 논문을 우선했다. |
| vendor SEO성 context compression 문서 | 특정 제품 구현에 묶여 있어 이 저장소의 일반 운영 규칙으로 직접 채택하지 않았다. |

## 계획에 반영한 인사이트

- 긴 대화 전체를 저장하지 않고, 안정된 상태와 재개 경로만 `context archive packet`으로 남긴다.
- 아카이브 패킷은 원문 대체물이 아니라 must-read 파일, 남은 작업, 검증, 링크를 담은 resume index로 둔다.
- 오래된 패킷은 지식 베이스처럼 틀릴 수 있으므로 `knowledge-skeptic-agent` 검증 경로를 둔다.
- 컨텍스트 아카이빙이 발생하면 평가 입력에서 `context_archive_targets`를 확인한다.

## 공개 판단 요약

컨텍스트 압축은 손실이 생길 수 있으므로 요약만 저장하면 위험하다. 따라서 이 저장소에서는 안정된 요약과 함께 원본 근거 문서, 커밋, 평가 보고서, 검색 기록으로 되돌아갈 수 있는 링크 중심 아카이브 패킷을 표준으로 둔다.

## 연결

- 작업 요약: `_history/work-summaries/2026/2026-05-31.ko.md`
- 계획 기록: `_history/plans/2026/2026-05-31-context-archive-policy.ko.md`
- 컨텍스트 아카이브: `_history/context-archives/2026/2026-05-31-context-archive-policy.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-05-31-context-archive-policy.ko.md`

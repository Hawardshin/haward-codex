# 메모리 부트스트랩 레퍼런스

## 목적

AI가 다음 세션에서 저장소 세팅을 잊지 않도록 hot/warm/cold anchor와 manifest 기반 검증 구조를 만든 근거를 정리한다.

## 접근일

- 2026-05-31

## 확인한 출처

| 출처 | 유형 | 핵심 참고점 | 적용 |
| --- | --- | --- | --- |
| agentmemory.md: https://agentmemory.md/ | 오픈소스/도구 사례 | decisions, context, goals, preferences, workflows를 장기 메모리로 구조화하고 세션 시작 시 자동으로 가져오는 규칙을 둔다. | 이 저장소도 설정과 규칙을 부트스트랩 manifest로 로드한다. |
| Microsoft Learn, Memory & Persistence: https://learn.microsoft.com/en-us/agent-framework/get-started/memory | 공식 문서 | context provider, history provider, session state처럼 실행 전/후에 context를 주입하고 저장하는 구조를 설명한다. | `memory-bootstrap-agent`가 시작 전 context anchor를 검증하도록 했다. |
| Memory Matters: The Need to Improve Long-Term Memory in LLM-Agents: https://ojs.aaai.org/index.php/AAAI-SS/article/view/27688 | 논문 | procedural, episodic, semantic memory 구분과 lifetime memory management 문제를 다룬다. | hot/warm/cold anchor와 metadata 기반 manifest를 사용한다. |
| Memory OS of AI Agent: https://huggingface.co/papers/2506.06326 | 논문/리서치 페이지 | OS식 계층형 memory storage, updating, retrieval, generation 모듈을 제안한다. | 간단한 파일 기반 계층 구조부터 시작하되 향후 검색/색인 구조로 확장 가능하게 했다. |

## 인사이트

- 장기 메모리는 하나의 거대한 문서가 아니라, 항상 읽을 작은 hot context와 필요할 때 검색할 warm/cold context로 나눠야 한다.
- 새 세션에서 AI가 “무엇을 먼저 읽는지”가 manifest로 고정되어야 한다.
- 메모리 구조 자체도 테스트 가능한 CLI로 검증해야 한다.
- 지속 지시나 설정 파일을 추가할 때 manifest를 함께 갱신해야 미래 세션이 놓치지 않는다.

## 적용 결과

- `memory-bootstrap-agent` 추가
- `agent-platform/configs/memory/bootstrap-manifest.json` 추가
- `check-memory-bootstrap` CLI 추가
- `_ops/prompts/01-memory-bootstrap.md`와 `_ops/workflows/01-memory-bootstrap.md` 추가
- start workflow와 persistent instructions에 메모리 부트스트랩 단계 추가

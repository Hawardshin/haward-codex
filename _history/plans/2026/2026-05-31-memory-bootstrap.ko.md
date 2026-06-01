# 계획 히스토리: 메모리 부트스트랩 구조

## 초기 요청

- "이런 모든 세팅을 AI가 나중에 까먹지 않도록 하는 구조적인게 필요해."

## 계획 목적

- AI가 다음 세션에서 저장소 규칙과 설정을 잊지 않도록 hot/warm/cold memory anchor 구조를 만든다.
- 필수 메모리 anchor를 설정 파일로 관리하고 CLI로 검증한다.

## 검색 질문

- AI agent가 세션 간 장기 메모리를 유지하려면 어떤 구조가 필요한가?
- 항상 로드할 context와 필요할 때 찾을 context를 어떻게 나눌 것인가?
- 저장소 기반 메모리 구조를 어떻게 검증 가능하게 만들 것인가?

## 검색 채널

- 웹 검색
- 저장소 검색
- 코드 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| agentmemory.md | https://agentmemory.md/ | decisions, context, goals, preferences, workflows를 persistent memory로 관리하는 사례 |
| Microsoft Learn Memory & Persistence | https://learn.microsoft.com/en-us/agent-framework/get-started/memory | context provider, history provider, session state 구조 |
| Memory Matters | https://ojs.aaai.org/index.php/AAAI-SS/article/view/27688 | long-term memory와 memory type separation |
| Memory OS of AI Agent | https://huggingface.co/papers/2506.06326 | 계층형 memory storage/retrieval 관점 |
| 기존 persistent instructions | `_docs/instructions/persistent-instructions.ko.md` | 현재 durable rule 목록 |
| 기존 ops index | `_ops/index.md` | 운영 탐색 시작점 |

## 지식 베이스 검증

- 내부 정책과 기존 운영 문서를 참고했으므로 최종 검증에서 `knowledge-skeptic-agent`를 실행한다.

## 도출한 인사이트

- 모든 문서를 항상 읽는 방식은 context 비용이 커지고 실제로 누락이 생긴다.
- 항상 읽는 hot anchor, 필요 시 확인하는 warm anchor, 검색용 cold anchor를 분리해야 한다.
- 어떤 파일이 필수인지 manifest로 관리하고, CLI로 존재 여부와 startup sequence를 검증해야 한다.
- durable rule이나 source config가 추가될 때 manifest를 함께 갱신해야 미래 세션이 놓치지 않는다.

## 계획 단계

- `agent-platform/configs/memory/bootstrap-manifest.json` 추가
- `memory-bootstrap-agent` config 추가
- `agent_platform.memory.bootstrap` Python helper와 `check-memory-bootstrap` CLI 추가
- unit test 추가
- `_ops/prompts/01-memory-bootstrap.md`, `_ops/workflows/01-memory-bootstrap.md` 추가
- start workflow, start prompt, router, ops index 갱신
- persistent instructions, AGENTS, README, platform operating model 갱신
- research note, policy docs, evaluation report 작성
- 맵 갱신, 테스트, 평가 후 커밋/push

## 제외하거나 보류한 선택지

- 바로 vector DB나 graph DB를 붙이는 것은 보류했다. 현재 저장소에는 파일 기반 manifest와 CLI 검증이 우선이다.
- 모든 히스토리를 hot context에 넣는 것은 context 비용과 혼선 때문에 보류했다.

## 위험과 불확실성

- manifest가 너무 커지면 hot anchor를 다시 정리해야 한다.
- 현재는 파일 존재와 manifest 구조 검증 중심이다. 내용 freshness와 conflict 검사는 이후 별도 validator로 승격할 수 있다.

## 검증 방법

- `agent-platform` unit test
- `check-memory-bootstrap` CLI
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- workspace index/task board check
- `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | hot/warm/cold manifest와 CLI 검증으로 구현 결정 | AI가 다음 세션에서 읽을 세팅을 구조적으로 고정하기 위해 |

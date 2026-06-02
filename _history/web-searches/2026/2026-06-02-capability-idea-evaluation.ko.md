# 웹 검색 기록: Capability Idea Evaluation

## 요청

- 요청 ID: `UR-2026-06-02-029`
- 요약: 자동 기능 후보는 아이디어를 내고 그 아이디어를 평가받는 구조여야 한다고 요청했다.
- 작업 모드: `governance`

## 검색어

- `idea generation evaluation framework innovation funnel evidence scoring official guide`
- `design thinking ideation evaluation selection criteria official guide`
- `agentic workflows evaluator optimizer idea generation evaluation loop official docs`
- `innovation portfolio idea screening scoring criteria stage gate official`

## 확인한 주요 출처

- AWS Prescriptive Guidance, evaluator and reflect-refine loops: https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/workflow-for-evaluators-and-reflect-refine-loops.html
- Google Cloud Gemini Enterprise Idea Generation agent: https://docs.cloud.google.com/gemini/enterprise/docs/idea-generation
- OpenAI Agents/Evals documentation search result: https://platform.openai.com/docs/guides/agents
- Stage-Gate Innovation Performance Framework: https://www.stage-gate.com/about/stage-gate-innovation-performance-framework/
- Anthropic Building Effective Agents: https://www.anthropic.com/engineering/building-effective-agents

## 계획 반영

- 생성과 평가는 분리했다.
- 기능 후보가 바로 승격되지 않고 여러 아이디어를 만들게 했다.
- 아이디어는 반복 감소, 시간 절감, 유지보수 비용, 근거 강도, 위험 적합성, 가장 작은 자산 적합성으로 평가한다.
- 선택/기각/대기/human review 결과와 이유를 기록하도록 했다.

## 공개 판단 요약

자동 개선 구조는 아이디어를 많이 내는 능력만으로 충분하지 않다. 여러 아이디어를 만들고, 명시적 기준으로 평가하고, 선택하지 않은 아이디어의 이유까지 남겨야 유지보수와 신뢰성이 생긴다.

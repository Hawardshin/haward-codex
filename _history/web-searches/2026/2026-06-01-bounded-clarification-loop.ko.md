# 웹 검색 기록: 제한된 역질문 루프

## 검색 목적

사용자가 “모호한 지시는 AI가 역질문해야 하지만 질문이 계속 이어지면 곤란하다”고 요청했으므로, ambiguous instruction 처리와 clarification question/fallback에 관한 근거를 확인했다.

## 검색 일시

- 날짜: 2026-06-01
- 작업 모드: `governance`

## 검색 쿼리

- `official prompt engineering ask clarifying questions ambiguous user request limit clarification questions AI assistant`
- `conversational AI design ask clarifying questions ambiguity user intent official guidelines`
- `human computer interaction clarification questions ambiguous instructions AI assistant research`
- `prompt engineering clarify ambiguous requirements ask follow up questions best practices`
- `TaskLint Automated Detection of Ambiguities in Task Instructions ambiguity instructions accuracy`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| Microsoft Copilot Studio, “Disambiguate customer intent”, https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/cux-disambiguate-intent | 공식 문서 | 사용자의 의도가 여러 topic으로 해석될 때 clarification question으로 좁히고, 맞는 옵션이 없으면 fallback/handoff 경로를 제공한다. | 역질문과 fallback/convergence를 함께 설계 |
| OpenAI, “Best practices for prompt engineering with the OpenAI API”, https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api | 공식 문서 | 명확하고 구체적인 지시, 원하는 출력 형식과 예시 제공이 중요하다. | 모호한 지시를 task brief로 구체화 |
| Microsoft Azure/OpenAI prompt engineering, https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering | 공식 문서 | 모델이 prompt 맥락에 민감하므로 명확한 지시와 구조가 중요하다고 설명한다. | 질문 품질을 결과 조건 설계로 취급 |
| TaskLint, https://ojs.aaai.org/index.php/HCOMP/article/view/21996 | 연구 | task instruction ambiguity가 작업 정확도에 영향을 주며 ambiguity detection을 다룬다. | 모호성 탐지와 실행 전 구체화 필요성의 근거 |
| CLAM, https://arxiv.org/abs/2212.07769 | 연구 | ambiguous question에 대해 selective clarification을 생성한 뒤 답변으로 이어지는 구조를 제안한다. | 모든 질문이 아니라 필요한 경우에만 선택적 역질문 |

## 약한 출처와 제외

- 일반 블로그의 “AI에게 질문 잘하는 법”은 출처 품질이 낮아 제외했다.
- 챗봇 UX 상용 랜딩 페이지는 표현 참고로만 보고 정책 근거로 사용하지 않았다.

## 계획 영향

- `REQ-WS-046`을 추가했다.
- `ai-usage-gap-profile.json`에 `bounded_clarification_policy`를 추가했다.
- workflow와 prompt에 질문 예산, 최대 질문 수, 수렴 전략을 넣었다.
- persistent instructions와 AGENTS에 “질문하되 무한 루프를 막는다”는 durable rule을 추가했다.

## 불확실성

- 어떤 질문이 “결과를 크게 바꾸는 질문”인지는 작업 맥락에 따라 다르다. 따라서 정책은 고정 질문 목록이 아니라 우선순위와 budget으로 정의했다.

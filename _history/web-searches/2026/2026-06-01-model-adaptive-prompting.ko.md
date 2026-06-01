# 웹 검색 기록: 모델별 프롬프팅 전략

## 검색 목적

사용자의 “안 좋은 모델, 특히 비추론 모델은 두 번 연속 요청하면 성능이 높아진다”는 지시를 durable 운영 규칙으로 반영하기 전에, 다중 시도/반복 개선/모델별 프롬프팅 차이에 대한 근거를 확인했다.

## 검색어

- `Self-Consistency Improves Chain of Thought Reasoning in Language Models arxiv 2203.11171`
- `Self-Refine Iterative Refinement with Self-Feedback arxiv 2303.17651`
- `Reflexion Language Agents with Verbal Reinforcement Learning arxiv 2303.11366`
- `OpenAI reasoning models prompting guide official`
- `site:platform.openai.com/docs/guides reasoning prompting OpenAI official`
- `site:learn.microsoft.com Azure OpenAI prompt engineering techniques not recommended reasoning models o1`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| https://arxiv.org/abs/2203.11171 | 논문 | Self-consistency는 여러 reasoning path를 샘플링하고 일관된 답을 선택해 일부 reasoning benchmark에서 성능 향상을 보고했다. | 2-pass/multi-sample 전략의 근거로 사용하되, 사실 검증과 구분했다. |
| https://arxiv.org/abs/2303.17651 | 논문 | Self-Refine은 초기 출력, 자기 피드백, refinement를 반복해 여러 작업에서 one-step generation보다 나은 결과를 보고했다. | 초안-비평-수정 loop의 근거로 사용했다. |
| https://arxiv.org/abs/2303.11366 | 논문 | Reflexion은 언어적 피드백과 episodic memory를 사용해 subsequent trial의 의사결정을 개선한다고 설명한다. | retry와 feedback memory가 task improvement에 쓰일 수 있다는 근거로 사용했다. |
| https://developers.openai.com/api/docs/guides/reasoning-best-practices | 공식 문서 | OpenAI는 reasoning model과 GPT model family가 다르게 동작하고 서로 다른 prompt가 필요할 수 있다고 설명한다. | 추론/강한 모델은 중복 호출보다 task framing과 verification을 우선하도록 반영했다. |
| https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering | 공식 문서 | Microsoft는 각 모델이 다르게 동작할 수 있고, 일부 prompting technique은 reasoning model에는 권장되지 않는다고 설명한다. | 모델별 prompt strategy 분기와 verification boundary에 반영했다. |

## 제외한 약한 출처

- Reddit/Hacker News/요약 블로그는 adoption/discovery signal로는 볼 수 있지만, 이번 durable 규칙의 근거는 논문과 공식 문서만으로 충분해 본문 근거에서 제외했다.
- “2번 호출이 항상 더 좋다”는 일반화 자료는 확인하지 못했고, 연구도 보통 task/model/decoding 조건에 의존한다.

## 계획 반영

- `2-pass`를 무조건 규칙으로 만들지 않고, `weak_or_uncertain_model` 또는 `general_or_non_reasoning_model`이 고분산 작업을 수행할 때의 기본 후보 전략으로 제한한다.
- 두 결과의 일치는 proof가 아니라 agreement signal로 기록한다.
- 강한 reasoning model은 duplicate call보다 명확한 goal/context/constraints/verification을 우선한다.

## 남은 불확실성

- 특정 벤더/모델별로 2-pass 효과 크기는 달라질 수 있다.
- 실제 플랫폼에서 모델별 정책을 자동 적용하려면 향후 모델 메타데이터, 비용/지연 설정, evaluator 결과를 연결해야 한다.

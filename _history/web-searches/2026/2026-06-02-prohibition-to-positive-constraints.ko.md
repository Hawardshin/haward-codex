# 웹 검색 기록: 금지형 지시 변환

## 검색 목적

사용자의 “AI는 금지를 이해하지 못한다”는 지시를 플랫폼 원칙으로 반영하기 전에, 금지/부정형 지시와 LLM prompt 설계에 대한 공신력 있는 근거를 확인했다.

## 검색어

- `LLM prompt engineering negative instructions positive instructions avoid prohibitions official guidance`
- `language models negation struggle instruction following negative constraints paper`
- `prompt engineering specify what to do instead of what not to do LLM safety guidelines`
- `AI agents guardrails positive constraints allowlist denylist prompt engineering`
- `OpenAI prompt engineering instructions say what to do instead of what not to do`
- `OpenAI prompt engineering clear specific instructions constraints examples official`
- `Anthropic prompt engineering be clear direct examples negative instructions official`
- `Google prompt design best practices clear instructions examples official LLM`
- `LLMs difficulty with negation in prompts negative instructions study`
- `Large language models negation understanding paper`
- `prompt engineering use positive instructions instead of negative constraints LLM official`

## 확인한 주요 출처

| 출처 | URL | 사용 이유 |
| --- | --- | --- |
| OpenAI Help - How to prompt ChatGPT | https://help.openai.com/en/articles/6654000-how-to-prompt-chatgpt | 금지 사항만 쓰지 말고 해야 할 일을 명시하라는 prompt 작성 원칙 확인 |
| OpenAI Academy - Understanding prompt engineering | https://academy.openai.com/public/clubs/work-users-ynjqu/resources/articles/understanding-prompt-engineering | 명확한 지시, 맥락, 예시 중심의 prompt 작성 근거 확인 |
| OpenAI Cookbook - GPT-4.1 prompting guide | https://cookbook.openai.com/examples/gpt4-1_prompting_guide | agentic workflow에서 명시적 instructions와 persistence가 중요하다는 최신 공식 가이드 확인 |
| arXiv - This is not a Dataset: A Large Negation Benchmark to Challenge Large Language Models | https://arxiv.org/abs/2310.15941 | LLM이 부정/negation에서 어려움을 보인다는 연구 근거 확인 |
| ACL Anthology - Language models are not naysayers | https://aclanthology.org/2023.starsem-1.10/ | 언어 모델의 negation benchmark 한계 분석 근거 확인 |

## 약한 출처 처리

- 개인 블로그, 출처가 불명확한 prompt tip 글, 단순 SNS 주장성 글은 이번 정책 근거로 사용하지 않았다.
- 커뮤니티 조언은 발견 신호로만 볼 수 있으나, 이번 작업은 공식 문서와 논문 근거만으로 충분했다.

## 계획 반영

- “AI가 금지를 이해하지 못한다”를 문자 그대로 절대 명제로 두지 않고, “금지/부정형 지시는 fragile control이므로 긍정 행동 계약과 구조적 검증으로 바꾼다”는 운영 원칙으로 정리했다.
- `ai-usage-gap-profile.json`에 `prohibition_rewrite_contract`를 추가했다.
- 철학 원칙에 “금지는 행동 목표가 아니다”를 추가하고, traceability registry에 실행/검증 target을 연결했다.
- workflow와 prompt는 금지형 입력을 positive target behavior, allowed actions, replacement action, examples, verification/enforcement gate로 변환하도록 갱신했다.

## 남은 불확실성

- LLM이 모든 금지를 항상 실패한다는 주장은 과도하다. 정책 문서에서는 “금지형 지시만으로 안정적 제어를 기대하지 않는다”는 신중한 표현을 사용한다.
- 모델별 성능 차이가 있으므로, 고위험 영역은 prompt가 아니라 schema, allowlist, evaluator, test, permission gate 같은 구조적 통제로 보완해야 한다.

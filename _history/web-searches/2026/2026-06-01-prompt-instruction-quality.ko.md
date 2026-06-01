# 웹 검색 기록: 질문/지시 품질 게이트

## 사용자 지시 요약

사용자는 AI를 잘 쓰려면 질문과 지시를 잘해야 하며, 편향적이거나 잘못된 지시는 흔한 실패 원인이라고 했다. LLM은 확률론적 기계일 뿐이므로 제대로 질문해야 제대로 답이 나온다는 원칙을 플랫폼에 반영하라고 요청했다.

## 검색 질문

- `OpenAI prompt engineering best practices clear instructions context examples`
- `Google prompt engineering guide clear specific instructions examples evaluation`
- `Anthropic prompt engineering clear instructions examples context guide`
- `Microsoft Azure OpenAI prompt engineering clear specific instructions official`
- `NIST AI Risk Management Framework Generative AI Profile bias prompt risks`
- `NIST generative AI profile bias prompt risks hallucination`
- `language models predict next token probabilistic machine Stanford CS224N language modeling`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| [OpenAI Help: Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api) | official | 지시와 context를 분리하고 명확한 format을 주는 prompt pattern | `ai-usage-gap-profile.json`의 instruction quality, output contract 기준 |
| [OpenAI Academy: Prompting fundamentals](https://openai.com/academy/prompting/) | official | 좋은 prompt는 task, 목적, 원하는 결과를 명확히 하는 반복 과정 | 운영 모델의 "질문은 답 분포를 바꾸는 입력 설계" 관점 |
| [Anthropic: Prompting best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct) | official | 최소 맥락의 동료도 따라 할 수 있을 정도로 구체적으로 지시해야 한다는 규칙 | task brief 재작성 기준 |
| [Microsoft Learn: Prompt engineering techniques](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering) | official | few-shot, cues, clear syntax, task decomposition, validation, grounding data, recency bias | 출력 계약, 단계 분리, 검증 경로 강화 |
| [NIST AI RMF Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | official | bias, stereotyping, harmful output을 benchmark와 fairness assessment로 측정/문서화 | 편향적 지시 neutralization과 counterevidence 요구 |
| [NIST: Towards a Standard for Identifying and Managing Bias in AI](https://www.nist.gov/publications/towards-standard-identifying-and-managing-bias-artificial-intelligence) | official | AI bias를 식별하고 관리해야 할 risk로 다룸 | bias를 "개인 의견"이 아니라 관리 대상 risk로 기록 |
| [Stanford CS224N Language Modeling lecture](https://cs224n.stanford.edu/slides/cs224n-spr2024-lecture05-rnnlm.pdf) | course | language modeling은 다음 단어의 확률 분포를 예측하는 task | LLM을 prompt-conditioned probabilistic system으로 설명 |

## 약한 출처와 제외

- SEO성 prompt template 모음, 출처 없는 "마법 문구" 글, 단순 Reddit/블로그 팁은 공식/교육/표준 근거보다 낮게 보았다.
- 커뮤니티 글은 실제 사용자 문제 발견에는 유용하지만, 이번 요구사항의 사실 근거로는 사용하지 않았다.

## 계획 반영

- `REQ-WS-043`을 추가해 질문/지시 품질을 독립 요구사항으로 승격한다.
- `ai-usage-gap-profile.json`의 나쁜 지시 패턴과 instruction rewrite contract를 실행 전 게이트로 사용한다.
- 편향/유도형 지시는 중립 task brief로 재작성하고, 반대 근거와 검증 경로를 요구한다.
- LLM의 유창한 답변은 사실 증명이 아니므로 source/test/review grounding을 붙인다.

## 불확실성

- 모델별 prompt sensitivity와 best practice는 계속 변하므로 특정 모델 최적화 문구는 미래 작업에서 최신 공식 문서로 다시 확인해야 한다.
- "LLM은 확률론적"이라는 설명은 운영 모델의 실용적 mental model이며, 구체 모델 구조는 모델/시스템별로 다를 수 있다.

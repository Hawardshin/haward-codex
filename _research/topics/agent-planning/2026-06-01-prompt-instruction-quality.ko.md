# 리서치 노트: 질문/지시 품질과 LLM mental model

## 요약

질문과 지시는 LLM 결과의 품질을 좌우하는 핵심 입력이다. 공식 prompt guidance는 공통적으로 명확한 지시, 맥락, 출력 형식, 예시, 단계 분리, 검증을 강조한다. bias 관련 표준/프로파일은 편향을 관리해야 할 위험으로 다루며, language modeling 교육 자료는 모델을 다음 단어/토큰의 확률 분포를 예측하는 시스템으로 설명한다.

## 재사용 원칙

- 나쁜 지시는 실행 전에 고친다.
- "좋은 질문"은 감성적 표현이 아니라 목표, 맥락, 제약, 출력 계약, 검증 경로를 포함한 입력 설계다.
- 편향적/유도형 지시는 사실과 선호를 분리하고, 대안과 반대 근거를 요구하는 task brief로 바꾼다.
- 유창한 답변은 사실 증명이 아니므로 web/source/test/evaluator/human review를 붙인다.

## 좋은 task brief 최소 필드

- goal
- context
- constraints
- output format
- acceptance criteria
- counterevidence or alternatives
- verification path
- assumptions or questions

## 출처

- OpenAI Help, prompt engineering best practices: https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
- OpenAI Academy, prompting fundamentals: https://openai.com/academy/prompting/
- Anthropic prompting best practices: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct
- Microsoft Learn, prompt engineering techniques: https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering
- NIST AI RMF Generative AI Profile: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- NIST bias guidance: https://www.nist.gov/publications/towards-standard-identifying-and-managing-bias-artificial-intelligence
- Stanford CS224N language modeling: https://cs224n.stanford.edu/slides/cs224n-spr2024-lecture05-rnnlm.pdf

## 적용 위치

- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_docs/operating-models/ai-usage-gap-operating-model.ko.md`

# 모델별 프롬프팅 전략 연구 노트

## 결론

모델이 약하거나 추론에 최적화되어 있지 않을수록 단일 응답을 그대로 신뢰하기보다 두 번의 독립 시도, 다중 샘플 비교, 또는 초안-비평-수정 loop를 쓰는 편이 더 안전한 기본 후보가 된다. 반대로 강한 추론 모델은 중복 호출을 먼저 늘리기보다 task framing, 제약, 성공 기준, 검증 경로를 선명하게 하는 편이 맞다.

## 핵심 근거

- Self-consistency: 여러 reasoning path를 샘플링하고 일관된 답을 선택하는 방식은 일부 reasoning benchmark에서 성능 개선을 보였다. 이는 단일 greedy response가 모델 capability를 과소평가할 수 있음을 시사한다.
- Self-Refine: 초기 출력, 피드백, refinement loop는 여러 작업에서 one-step generation보다 좋은 결과를 낼 수 있다.
- Reflexion: agent가 이전 시도의 피드백을 언어적 메모리로 보존해 이후 시도에서 더 나은 결정을 하도록 설계한다.
- OpenAI reasoning best practices: reasoning model과 GPT model family는 다르게 동작하며 다른 prompt가 필요할 수 있다.
- Microsoft prompt engineering: 모델별 동작 차이와 reasoning model에 적합하지 않은 prompting technique을 명시한다.

## 운영 규칙으로 바꾼 내용

- `weak_or_uncertain_model`: 작업을 작게 나누고, 비용/지연이 허용되면 2-pass 또는 draft-critique-revise를 사용한다.
- `general_or_non_reasoning_model`: 예시, 출력 계약, 제약을 명확히 하고, 고분산 작업에서 비교/병합 loop를 쓴다.
- `reasoning_model`: 단순히 같은 요청을 반복하기보다 명확한 목표, 맥락, 제약, 성공 기준, 검증을 먼저 강화한다.
- 모든 profile: 반복 호출 일치는 proof가 아니다. 출처, 테스트, 도구, evaluator, 인간 판단이 필요하다.

## 적용 위치

- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_docs/operating-models/ai-usage-gap-operating-model.ko.md`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_docs/instructions/persistent-instructions.ko.md`

## 다음 개선 후보

- 모델별 비용/지연 profile을 설정 파일로 분리한다.
- 2-pass 결과를 자동 비교하는 evaluator prompt나 local tool을 만든다.
- 실제 작업 결과에서 2-pass 적용 전후의 품질, 시간, 비용을 work timing과 evaluator에 연결한다.

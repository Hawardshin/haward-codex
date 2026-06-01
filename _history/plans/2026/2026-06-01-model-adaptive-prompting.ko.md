# 계획 기록: 모델별 프롬프팅 전략

## 작업 모드

`governance`

## 계획

1. 웹 검색으로 multi-sample, iterative refinement, reasoning model prompting 자료를 확인한다.
2. 사용자 요청을 `UR-2026-06-01-033`으로 요약하고 `REQ-WS-044` 요구사항으로 기준선화한다.
3. `ai-usage-gap-profile.json`에 모델 capability profile과 2-pass policy를 추가한다.
4. 운영 모델, workflow, prompt, persistent instructions, memory bootstrap이 같은 규칙을 가리키도록 갱신한다.
5. 연구 노트, 웹 검색 기록, spec artifacts, request trace, work summary, timing, evaluation을 남긴다.
6. config/docs/governance/evaluator/grounding 검증 후 commit/push한다.

## 계획 근거

- Self-consistency는 다중 reasoning path 선택의 성능 개선 근거를 제공한다.
- Self-Refine/Reflexion은 초안-피드백-재시도 loop의 근거를 제공한다.
- OpenAI/Microsoft 공식 문서는 model family별 prompting 차이를 근거로 제공한다.

## 결정

2-pass를 보편 규칙으로 만들지 않고, 약한/비추론/불확실 모델과 고분산 작업에서의 기본 후보 전략으로 제한한다. 반복 호출 일치는 사실 증명이 아니므로 별도 검증 경로를 필수로 둔다.

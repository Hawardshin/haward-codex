# 계획: 질문/지시 품질 게이트

## 작업 모드

- `governance`

## 근거

- OpenAI, Anthropic, Microsoft의 prompt guidance는 명확한 지시, 구조, 출력 형식, 검증을 강조한다.
- NIST AI RMF Generative AI Profile과 NIST bias 문서는 bias를 관리하고 평가해야 할 위험으로 다룬다.
- Stanford CS224N language modeling 자료는 language model을 다음 단어/토큰의 확률 분포를 예측하는 시스템으로 설명한다.
- 기존 `REQ-WS-042`와 `ai-usage-gap-profile.json`은 AI 사용 격차를 다루므로, 이번 변경은 그 위에 지시 품질 게이트를 명시적으로 얹는다.

## 단계

1. 웹 검색 기록과 리서치 노트를 남긴다.
2. 요구사항 기준선에 `REQ-WS-043`을 추가하고 변경/검토 기록을 만든다.
3. `ai-usage-gap-profile.json`, 운영 모델, 지속 지시, workflow, prompt, router, index, memory bootstrap을 갱신한다.
4. 스펙, traceability, 히스토리, 요청 요약, 요청-결과 추적, 시간 기록을 만든다.
5. config, memory, docs, naming, structure, map, task-board, health, grounding, evaluator, timing 검증을 실행한다.
6. 커밋하고 `origin/main`에 push한다.

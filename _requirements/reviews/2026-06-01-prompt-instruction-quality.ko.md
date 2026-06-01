# 요구사항 검토: 질문/지시 품질 게이트

## 검토 대상

- `REQ-WS-043`

## 적합성

- 사용자 요청은 일회성 조언이 아니라 앞으로 모든 AI 작업에서 적용할 운영 원칙이다.
- 기존 `REQ-WS-042`는 AI 사용 격차를 줄이는 넓은 구조를 다루지만, 잘못된 질문/지시를 실행 전 재작성하는 명시적 기준은 별도 요구사항으로 분리하는 편이 유지보수에 좋다.
- 기존 web-first, hallucination prevention, knowledge skeptic, spec/source reconciliation 규칙과 충돌하지 않는다. 오히려 실행 전 지시 품질을 높여 검증 가능성을 올린다.

## 결정

`REQ-WS-043`을 공통 workspace 요구사항으로 채택한다.

## 검증 기준

- `ai-usage-gap-profile.json`에 나쁜 지시 패턴, LLM 가정, prompt quality checklist, instruction rewrite contract가 있다.
- workflow/prompt/router/persistent instructions/memory bootstrap에서 질문/지시 품질 규칙을 찾을 수 있다.
- 웹 검색 기록, 리서치 노트, 스펙, 평가에 외부 근거와 내부 변경 근거가 연결된다.

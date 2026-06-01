# 제한된 역질문 루프 요구사항 변경

## 변경 개요

- 날짜: 2026-06-01
- 출처 요청: `UR-2026-06-01-035`
- 추가 요구사항: `REQ-WS-046`
- 작업 모드: `governance`

## 사용자 요청 요약

사용자는 모호한 지시가 나쁜 지시의 대표적 특징이며, 이런 경우 AI가 사람에게 역질문을 해야 한다고 말했다. 다만 역질문이 계속 이어지는 것도 곤란하므로, 질문을 더 잘하도록 구체화하는 과정이 필요하다고 요청했다.

## 변경 내용

`REQ-WS-046`을 추가해 모호한 지시를 처리하는 방식을 다음처럼 기준선화한다.

- 모호한 지시는 AI가 무조건 추측하지 않고 필요한 경우 역질문한다.
- 질문은 목적, 맥락, 제약, 출력 계약, 성공 기준 중 결과를 크게 바꾸는 항목에 한정한다.
- 질문 round는 보통 1회, 많아도 2회 이내로 제한한다.
- 한 round의 질문은 최대 3개까지 우선순위화한다.
- 계속 모호하면 합리적 가정, 선택지 기반 기본값, 선작업 후 확인, 명시적 보류 중 하나로 수렴한다.

## 근거

- Microsoft Copilot Studio의 disambiguation guidance는 사용자 의도를 좁히기 위해 clarification question을 사용하되, 옵션이 맞지 않을 때 fallback/handoff 경로를 제공해야 한다고 설명한다.
- TaskLint 연구는 task instruction의 ambiguity가 작업 결과 정확성에 영향을 줄 수 있고, ambiguity detection이 instruction quality 개선에 도움이 된다고 설명한다.
- CLAM 연구는 ambiguous questions에 대해 selective clarification을 생성하고, clarification 이후 최종 답변으로 이어지는 구조를 제안한다.
- 기존 플랫폼 요구사항 `REQ-WS-043`은 모호한 지시를 task brief로 재작성하도록 하지만, 질문 루프의 예산과 종료 조건은 충분히 명시하지 않았다.

## 영향

- `ai-usage-gap-profile.json`은 clarification budget, 질문 우선순위, 수렴 전략을 포함한다.
- `_ops/workflows/59-bridge-ai-usage-gap.md`와 `_ops/prompts/89-bridge-ai-usage-gap.md`는 질문이 반복되지 않게 예산과 fallback을 사용한다.
- persistent instructions와 AGENTS는 모호한 지시를 다룰 때 역질문과 무한 루프 방지 원칙을 모두 반영한다.

# 계획 기록: 금지형 지시 변환

## 요청

사용자는 “AI는 금지를 이해하지 못한다”고 지적했다.

## 판단

이 문장은 단순 메모가 아니라 플랫폼의 prompt, agent workflow, 철학, 평가 규칙에 반영되어야 하는 운영 원칙이다. 다만 “AI가 금지를 전혀 이해하지 못한다”는 절대 명제로 쓰면 과도하므로, 금지형 지시를 긍정 행동 계약과 구조적 검증으로 변환하는 규칙으로 정리한다.

## 실행 계획

1. 웹 검색으로 공식 prompt guide와 negation 연구를 확인한다.
2. 기존 `ai-usage-gap-profile`, 철학 문서, traceability, workflow, prompt, persistent instructions를 확인한다.
3. `REQ-WS-078`로 요구사항 기준선을 갱신한다.
4. `prohibition_rewrite_contract`를 self-documenting config로 추가한다.
5. 철학 원칙 “금지는 행동 목표가 아니다”를 추가하고 traceability mapping을 연결한다.
6. workflow와 prompt가 금지형 입력을 positive target behavior, allowed actions, replacement action, examples, verification gate로 바꾸도록 갱신한다.
7. memory bootstrap과 persistent instructions를 업데이트한다.
8. 히스토리, 누락 점검, 근거 점검, 평가 기록을 만들고 검증한다.

## 근거

- `_history/web-searches/2026/2026-06-02-prohibition-to-positive-constraints.ko.md`
- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_philosophy/agent-operating-philosophy.ko.md`

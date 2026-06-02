# 구조적 가드레일 구성 계획

## 요청

- `UR-2026-06-02-040`
- “구조적 구성 제작”

## 작업 모드

- `governance`

## 계획

1. 웹 검색으로 guardrail와 risk management 근거를 확인한다.
2. 기존 `REQ-WS-078`, `REQ-WS-079`와 중복을 분리한다.
3. `REQ-WS-080`을 요구사항 변경/검토/기준선에 반영한다.
4. `agent-platform/src/agent_platform/governance/guardrail_composition.py`를 구현한다.
5. `check-guardrail-composition` CLI를 추가한다.
6. 자체 설명형 템플릿과 단위 테스트를 추가한다.
7. 메모리 bootstrap anchor, 히스토리, 요청 추적, 작업 요약, 평가 파일을 작성한다.
8. 검증 후 커밋하고 push한다.

## 근거

- `_history/web-searches/2026/2026-06-02-structural-guardrail-composition.ko.md`
- `_specs/workspace-platform/2026-06-02-structural-guardrail-composition/`
- `agent-platform/configs/governance/structural-guardrail-composition-template.json`

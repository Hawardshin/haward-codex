# Requirements: Subagent Tool Selection

날짜: 2026-06-07

## 배경

이전 bounded fan-out은 저장된 subagent plan의 첫 2개 tool만 실행했다. 다음 단계에서는 manager가 실행할 tool을 명시적으로 고르고, 단일 실행과 fan-out이 같은 선택 상태를 사용해야 한다.

## 요구사항

- 저장된 subagent tool plan이 있으면 tool별 선택 컨트롤을 표시한다.
- plan 생성 직후 기본 선택은 첫 2개 tool로 둔다.
- 사용자는 최대 3개 tool까지 선택할 수 있다.
- 단일 실행은 선택된 첫 번째 tool만 실행한다.
- fan-out 실행은 선택된 2-3개 tool 이름을 `start_subagent_tool_fanout`에 전달한다.
- 선택이 부족하면 실행 버튼은 비활성화되고 native command를 호출하지 않는다.
- 기존 manager-owned merge gate, hard cap 3, adapter/session lifecycle, `_private`/`outputs` 경계는 유지한다.

## 비범위

- 모든 tool 자동 실행.
- lane 결과 자동 병합.
- packaged desktop runtime에서 실제 CLI 프로세스를 시작하는 smoke.

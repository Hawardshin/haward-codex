# Work Summary: Subagent Tool Selection

날짜: 2026-06-07

Desktop Runtime subagent plan 결과에 tool 선택 UI를 추가했다. plan 생성 후 첫 2개가 기본 선택되고, 사용자는 최대 3개까지 체크박스로 고를 수 있다. 단일 실행은 선택된 첫 tool을 사용하고, fan-out은 선택된 2-3개 tool 이름과 선택 수를 native command에 전달한다.

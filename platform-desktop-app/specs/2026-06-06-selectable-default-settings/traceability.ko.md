# 추적성

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-SELECT-DEFAULT-001 | `RuntimeTerminalDrawer` workingDir 선택지, `DesktopRuntimePanel` workingDirOptions | `Runtime text defaults expose selectable choices`, 렌더러 check |
| REQ-SELECT-DEFAULT-002 | `sessionPromptChoices`, 초기 입력 선택 카드 | `Runtime text defaults expose selectable choices` |
| REQ-SELECT-DEFAULT-003 | `taskPipePromptChoices`, 작업 요청 선택 카드 | `Runtime text defaults expose selectable choices` |
| REQ-SELECT-DEFAULT-004 | `agent-provider-choice-grid`, `agent-model-choice-grid`, datalist 제거 | `Search agent provider and model settings use explicit choices` |
| REQ-SELECT-DEFAULT-005 | textarea/input 유지 및 선택 버튼 값 주입 | 렌더러 type check |
| REQ-SELECT-DEFAULT-006 | `.runtime-text-choice-grid`, `.agent-model-choice-grid` 줄바꿈 CSS | `git diff --check`, 렌더러 check |
| REQ-SELECT-DEFAULT-007 | test/check/package 실행 | `validation.ko.md` |

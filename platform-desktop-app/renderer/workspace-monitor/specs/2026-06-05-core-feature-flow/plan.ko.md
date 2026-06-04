# 구현 계획

1. `TaskIntentFlowStep` 타입을 추가한다.
2. `activeTaskFlowStepId`와 Tool Studio mode request state를 추가한다.
3. task flow rail 항목을 버튼으로 바꾸고 `data-task-flow-step`을 부여한다.
4. `ToolStudioPanel`에 `requestedMode` prop을 추가한다.
5. `build-tool` flow step을 build/environment/deploy mode에 연결한다.
6. 정적 테스트와 browser smoke를 실행한다.

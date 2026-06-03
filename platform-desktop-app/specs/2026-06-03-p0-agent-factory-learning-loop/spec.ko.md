# Spec: P0 Agent Factory and Learning Loop

## 목표

남은 P0 제품 갭인 Agent Factory creation wizard와 Learning Feedback automation loop를 실제 desktop app 기능으로 구현한다.

## 구현 범위

- `MonitorShell.tsx`: Agents 화면에 `AgentFactoryWizard`와 `LearningFeedbackLoopPanel` 추가
- `src-tauri/src/lib.rs`: `create_agent_factory_proposal`, `record_learning_improvement_decision` command 추가
- `installer-shell-runtime-contract.json`: 새 data accumulation target과 command surface 등록
- `runtime-data-boundary-registry.json`: platform data store에 agent proposal/learning decision 포함
- `product-gap-registry.json`: P0 gap status와 request coverage 갱신
- `check-runtime-contract.mjs`, `check-readiness.mjs`, `readiness.test.mjs`: 회귀 방지 token과 contract checks 추가

## 수용 기준

- 사용자는 Agents 화면에서 agent proposal을 저장할 수 있다.
- proposal record는 app-data runtime store 경로에 JSON으로 저장된다.
- 사용자는 누적 데이터 기반 improvement candidate를 선택하고 decision을 저장할 수 있다.
- decision record는 app-data runtime store 경로에 JSON으로 저장된다.
- accumulated data overview와 runtime root 목록이 두 새 store를 사용자에게 보여준다.
- product gap registry에서 `agent_factory_creation_wizard`, `learning_feedback_automation_loop`는 `implemented_product_slice`다.
- TypeScript, Rust, platform check/test, customer build가 통과한다.

## 남은 범위

- `componentized_desktop_ui_architecture`는 P1 structural debt로 남는다.
- `native_workspace_git_operations`는 P1 product gap으로 남는다.
- public distribution gates는 external release gate로 남는다.

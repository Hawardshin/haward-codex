# Validation: P0 Agent Factory and Learning Loop

## 실행한 검증

- `cargo check` in `platform-desktop-app/src-tauri`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-gap-registry.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/runtime-data-boundary-registry.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: 통과

## 확인한 회귀 방지

- Runtime contract validator가 `agent_factory_proposals`, `learning_feedback_decisions` accumulation target을 확인한다.
- Readiness script/test가 `create_agent_factory_proposal`, `record_learning_improvement_decision`, `AgentFactoryWizard`, `LearningFeedbackLoopPanel` token을 확인한다.
- Product gap registry에서 P0 gap이 다시 missing/partial로 남으면 readiness가 실패한다.

## 제한

- 현재 세션에서 packaged native app click smoke는 수행하지 못했다.
- Public release readiness는 이 slice 범위가 아니며 signing/notarization/updater/clean-machine smoke가 계속 필요하다.

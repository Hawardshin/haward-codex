# 요구사항: P0 Agent Factory and Learning Loop

- 요청 ID: `UR-2026-06-03-055`
- 소유 프로젝트: `platform-desktop-app/`
- 범위: Agents surface, Tauri app-data runtime commands, accumulated data contract, product gap registry

## 배경

사용자는 “구현 부족한 것을 계속 진행”하라고 요청했다. 이전 제품 갭 레지스트리에서 남아 있던 핵심 P0는 `agent_factory_creation_wizard`와 `learning_feedback_automation_loop`였고, 이 둘은 모니터링이 아니라 플랫폼의 주 기능이다.

## 요구사항

- `PDA-REQ-055-1`: Agents 화면은 goal, role, tools, guardrails, validation, output contract를 받아 agent proposal을 생성할 수 있어야 한다.
- `PDA-REQ-055-2`: Agent proposal은 renderer local state가 아니라 Tauri command를 통해 `app_data/runtime-data/agent-factory/proposals`에 구조화 JSON으로 저장되어야 한다.
- `PDA-REQ-055-3`: Agents 화면은 누적 evidence, blocker, evaluation, work summary, request trace, intent map에서 learning improvement candidate를 만들고 approve/reject/defer/promote 결정을 받을 수 있어야 한다.
- `PDA-REQ-055-4`: Learning decision은 Tauri command를 통해 `app_data/runtime-data/learning-feedback/decisions`에 구조화 JSON으로 저장되어야 한다.
- `PDA-REQ-055-5`: Runtime contract, runtime data boundary, accumulated data overview, readiness tests는 새 저장소와 명령을 검증해야 한다.
- `PDA-REQ-055-6`: Product gap registry는 두 P0 gap을 `implemented_product_slice`로 닫고, 남은 structural/native Git/public release gap과 섞지 않아야 한다.

## 제외

- Full VS Code product embedding.
- PTY/xterm terminal adoption.
- Public release signing/notarization/updater readiness.
- Agent spec을 바로 source repository에 쓰는 자동 승격. 이번 slice는 app-data proposal/decision 기록까지 구현한다.

# 웹 검색 기록: Agent CLI Cockpit 오픈소스 직접 탐구

- 날짜: 2026-06-06
- 작업: 유사 오픈소스 딥 리서치 후 직접 탐구 기반 기능 추가
- 대상 프로젝트: `platform-desktop-app/`

## 검색 질의

- `open source AI agent desktop app Codex Claude OpenCode MCP GitHub 2026`
- `open source coding agent desktop UI CLI orchestration GitHub ClawX Agentify Desktop OpenLoaf`
- `OpenHands Goose Cline open source agent workbench terminal browser diff approval GitHub`
- `open source agent workflow builder Dify Langflow Flowise features GitHub`

## 확인한 주요 소스

- Agentify Desktop: https://github.com/agentify-sh/desktop
- CLI Agent Orchestrator: https://github.com/awslabs/cli-agent-orchestrator
- ClawX: https://github.com/ValueCell-ai/ClawX
- OpenLoaf: https://github.com/OpenLoaf/OpenLoaf
- OpenHands: https://github.com/OpenHands/OpenHands
- Goose: https://github.com/block/goose
- Cline: https://github.com/cline/cline
- Dify: https://github.com/langgenius/dify
- Langflow: https://github.com/langflow-ai/langflow
- Flowise: https://github.com/FlowiseAI/Flowise

## 직접 탐구

임시 경로 `/tmp/agent-platform-os-research.7q12Y4`에 다음 repo를 clone해 README와 source layout을 확인했다. 작업 후 임시 clone은 삭제했다.

- `agentify-sh/desktop`
- `ValueCell-ai/ClawX`
- `awslabs/cli-agent-orchestrator`
- `OpenLoaf/OpenLoaf`

## 약한 소스/주의

- GitHub stars, README marketing copy, community mentions는 adoption/discovery 신호로만 사용했다.
- version-sensitive 구현은 현재 플랫폼의 local source와 tests로 검증했다.
- 공개 배포 readiness는 signing/notarization/updater credentials가 없어 주장하지 않는다.

## 계획 반영

오픈소스에서 반복적으로 보이는 강한 패턴은 "agent/CLI를 단순 실행 버튼이 아니라 session, provider, artifact/log/state, decision, task-run이 결합된 control plane으로 보여준다"는 점이다. 따라서 이번 구현은 새 backend를 크게 만들기보다 기존 Rust/Tauri runtime state를 한 화면에 모으는 Agent CLI Cockpit으로 좁혔다.

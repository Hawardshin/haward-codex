# 스펙: workspace tracker product split

## 목표

데스크톱 앱을 `workspace_tracker`로 재정의한다. 사용자는 여러 Git 작업공간을 가져오고, Codex/Claude Code/Cursor/Antigravity 같은 도구를 선택형 guest adapter로 실행하고, 현재 작업의 요약/계획/보고서/근거/터미널 상태를 순서대로 확인한다.

## 범위

- product feature registry의 primary/supporting/separated 역할 변경
- view mode의 기본 사용자 섹션 변경
- product split self-documenting registry 추가
- snapshot/customer snapshot에 product split 포함
- 홈 화면, navigation, command palette, intent copy 변경
- agent/tool runtime surfaces를 separated/advanced로 표시
- 테스트와 README 업데이트

## 비범위

- 외부 Git 호스팅에 repository 생성
- CLI 자동 설치 또는 provider credential 변경
- Ollama/AWS 리소스 생성
- MonitorShell 전체 파일 분해

## 제품 경계

- `platform-desktop-app/`: Git workspace tracker, terminal/guest AI launch, current work timeline, reports/evidence, requirements/docs, installer shell
- `agent-platform/`: agent factory, tool management, model/runtime adapters, Ollama/model management, AgentCore-style runtime/gateway/identity, reusable governance/evaluation/planning agents

## 수용 기준

- 기본 사용자 view mode에서 `agents`와 `tools`가 빠진다.
- product feature registry에서 `agent_factory`, `root_tool_management`, `ollama_model_management`, `provider_direct_agent_run`, `agentcore_runtime_lifecycle`가 separated로 식별된다.
- home screen에 workspace import/open/clone/create 방향이 드러난다.
- collector와 tests가 `productSplit`을 인식한다.
- workspace monitor check/test/build와 platform desktop test/check가 통과한다.

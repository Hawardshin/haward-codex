# Agent CLI Cockpit 직접 오픈소스 탐구

- 작성일: 2026-06-06
- 작업 모드: `standard` with research
- 대상 프로젝트: `platform-desktop-app/`
- 구현 결과: Desktop Runtime의 Agent CLI Cockpit

## 조사 대상

| 프로젝트 | 확인한 점 | 적용 인사이트 |
| --- | --- | --- |
| [CLI Agent Orchestrator](https://github.com/awslabs/cli-agent-orchestrator) | CLI session 격리, supervisor/worker, handoff/assign/message control plane | 단일 실행 버튼보다 adapter별 session/readiness/decision/run 상태가 중요하다. |
| [Agentify Desktop](https://github.com/agentify-sh/desktop) | desktop control center, MCP/browser session, artifact/log/state 중심 | 데스크톱 앱은 실행 상태와 산출물을 로컬 상태로 묶어야 한다. |
| [ClawX](https://github.com/ValueCell-ai/ClawX) | desktop UI, provider credential, multi-agent/channel | provider 로그인과 agent 실행 준비 상태는 같은 설정 화면에 붙어야 한다. |
| [OpenLoaf](https://github.com/OpenLoaf/OpenLoaf) | local-first workspace, agent/project/terminal/task board | agent workbench는 workspace context와 terminal/task 상태를 동시에 보여줘야 한다. |

## 기술 스택

- Tauri v2 desktop shell
- Rust native runtime and commands
- TypeScript/React/Next workspace monitor renderer
- CSS token-based desktop UI
- Existing CLI adapter/session/provider/task-run/decision stores

## 소스 유형

- 공식/프로젝트 repository: GitHub README와 source layout
- 현재 local source: `MonitorShell.tsx`, `RuntimeTerminalDrawer.tsx`, Tauri command/state
- 테스트 계약: workspace-monitor tests, platform-desktop-app tests, package pipeline
- 커뮤니티/채택 신호: GitHub discovery and public repository visibility

## 언어 옵션

| 옵션 | 장점 | 단점 | 결정 |
| --- | --- | --- | --- |
| TypeScript/React | 기존 UI state와 action을 즉시 결합, 검증 비용 낮음 | deep supervisor 기능은 없음 | 선택 |
| Rust/Tauri | process/session orchestration에 강함 | 이번 slice에는 리스크와 범위가 큼 | 보류 |
| Python/Node sidecar | 별도 orchestrator 구현 가능 | lifecycle/IPC/설치 표면 증가 | 제외 |

선택 언어는 TypeScript/React다. 사용자의 요청은 근본 구조 검토와 기능 추가를 요구했지만, 현재 source에는 이미 native PTY, provider credential, task-run, decision inbox가 존재한다. 따라서 먼저 그 상태를 한 화면에 모아 운영 가능성을 높이는 것이 유지보수성과 검증 측면에서 더 낫다.

## 아키텍처 옵션

| 옵션 | 평가 | 결정 |
| --- | --- | --- |
| 새 Rust supervisor/session orchestrator | CAO 같은 구조로 갈 수 있지만 기존 runtime과 중복되고 process leak 리스크가 생김 | 보류 |
| Desktop Runtime 안의 cockpit UI | 기존 state를 재사용하고 바로 사용성 개선 가능 | 선택 |
| 별도 route/section | 확장성은 있지만 탭 이동 비용과 발견성 문제가 남음 | 제외 |

## 폴더 구조 옵션

| 옵션 | 평가 | 결정 |
| --- | --- | --- |
| 기존 `MonitorShell.tsx`에 좁게 추가 | state 출처가 같은 파일에 있어 중복 prop drilling 없음 | 선택 |
| 새 `AgentCliCockpit.tsx` 분리 | 장기적으로 가능하지만 이번에는 local derived state가 많음 | 보류 |
| Rust module 추가 | backend 기능이 없으므로 불필요 | 제외 |

## 구현 인사이트

1. 현재 플랫폼은 단일 CLI wrapper가 아니라 local host runtime이다. guest CLI를 제품 주인공으로 두지 않고, 플랫폼이 adapter 상태와 작업 기록을 소유해야 한다.
2. 사용자 체감에서는 "어디서 설정하고 어떤 CLI가 준비됐는지"가 느린 탭 이동만큼 큰 마찰이다. cockpit은 이 판단 비용을 줄인다.
3. provider 로그인, CLI 설치, active session, pending decision, task-run은 각각 따로 있으면 관리가 어렵다. adapter card 단위로 합쳐야 한다.
4. 새 backend를 만들기 전에 이미 있는 native state를 운영 표면으로 드러내는 것이 resource leak과 migration risk를 줄인다.

## 선택한 기능 slice

Desktop Runtime에 Agent CLI Cockpit을 추가했다.

- adapter별 install/readiness 상태
- provider login status
- active native sessions
- related task-run records
- related decision inbox items
- direct select/start/settings controls
- open-source control-plane pattern strip

## 후속 후보

- session transcript replay와 artifact/log drawer
- retry/cancel/cleanup lifecycle 상태
- tmux-like detached session supervisor
- adapter별 install doctor and guided setup
- decision inbox와 cockpit card의 양방향 filtering

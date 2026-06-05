# 스펙: Agent CLI Cockpit

## 목표

Desktop Runtime이 Codex, Claude Code, Gemini, OpenCode, Ollama 같은 guest CLI/provider runtime을 별도 카드로 보여주고, 사용자가 현재 실행 준비 상태와 운영 신호를 빠르게 판단할 수 있게 한다.

## 직접 탐구 근거

- [awslabs/cli-agent-orchestrator](https://github.com/awslabs/cli-agent-orchestrator): CLI session을 격리하고 supervisor/worker control plane으로 관리하는 패턴.
- [agentify-sh/desktop](https://github.com/agentify-sh/desktop): local desktop shell에서 여러 AI web/CLI session, MCP, artifact/log/state를 다루는 패턴.
- [ValueCell-ai/ClawX](https://github.com/ValueCell-ai/ClawX): desktop UI가 여러 agent/channel과 provider credential을 다루는 패턴.
- [OpenLoaf/OpenLoaf](https://github.com/OpenLoaf/OpenLoaf): local-first workspace에서 agent, project context, terminal/task surface를 함께 배치하는 패턴.

## 설계 결정

- 새 orchestration backend 대신 기존 `adapters`, `providerCredentialReports`, `taskRunStore`, `decisionInboxItems`, `activeSessions`를 조합해 UI cockpit을 만든다.
- cockpit card는 adapter별로 `available`, `missing`, `selected` 상태를 시각화한다.
- adapter 시작은 기존 `startCliSession(adapter.id)`를 감싼 `startAdapterFromCockpit` 함수를 사용한다.
- 설정이 필요한 adapter는 기존 settings section으로 이동시키는 action을 제공한다.
- cockpit은 `Desktop Runtime`의 핵심 운영 표면이므로 workbench panel보다 앞에 배치한다.

## 언어/런타임 선택

- 옵션 A: TypeScript/React UI 확장. 기존 상태와 action을 바로 재사용하고 추가 process lifecycle 위험이 없어 선택했다.
- 옵션 B: Rust/Tauri native orchestrator 확장. tmux-like supervisor에는 적합하지만 이번 slice는 운영 가시성과 즉시 사용성이 목표라 과하다.
- 옵션 C: 별도 Node service. session/process 관리 책임이 중복되고 resource leak 표면이 커져 제외했다.

## 아키텍처 선택

- 옵션 A: 기존 MonitorShell의 Desktop Runtime section 안에 cockpit을 추가한다. 상태 출처가 이미 이 컴포넌트에 있어 선택했다.
- 옵션 B: 별도 route로 분리한다. 장기적으로 가능하지만 사용자가 탭 이동과 설정 접근 속도를 문제 삼았으므로 현재 runtime context 안에서 바로 보이게 한다.
- 옵션 C: terminal drawer 안에 넣는다. 무거운 terminal surface와 control plane을 섞어 가시성이 떨어져 제외했다.

## 폴더 구조 선택

- 옵션 A: `MonitorShell.tsx`, `globals.css`, `tool-studio.test.mjs`에 좁게 변경한다. 현재 workspace-monitor의 UI/test 구조와 맞아 선택했다.
- 옵션 B: 새 cockpit component를 만든다. 추후 기능이 커질 때 분리할 수 있지만 이번 변경은 existing state와 강하게 결합되어 있다.

## 수용 기준

- Desktop Runtime에 `data-agent-cli-cockpit="open-source-control-plane"` section이 존재한다.
- cockpit은 CAO, Agentify, ClawX/OpenLoaf에서 뽑은 운영 패턴을 표시한다.
- adapter card는 readiness, command/version/error, auth, sessions, task-runs, decisions를 노출한다.
- test가 cockpit row 생성, provider auth mapping, start action, CSS class를 확인한다.
- 내부 패키지 빌드가 `.app`와 `.dmg`를 생성하고 검증한다.

## 제한

- UI는 현재 native session 수와 stored task-run/decision 상태를 보여준다. 장기 session supervisor, retry graph, transcript replay는 다음 slice다.
- provider auth는 redacted status만 사용하고 credential 원문을 노출하지 않는다.

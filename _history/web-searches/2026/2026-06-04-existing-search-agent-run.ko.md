# 웹 검색 기록: 기존 검색 에이전트 실행

## 요청

- `UR-2026-06-04-003`
- 목적: 이미 만들어둔 검색 에이전트를 데스크톱 앱에서 쉽게 실행하게 만들기.

## 검색 쿼리

- `agent platform search agent execution UI command palette run agent workflow best practices`
- `AI agent orchestration UI run existing agents search agent workflow desktop app`
- `OpenHands agent UI task execution search browse agent workflow`
- `VS Code command palette official documentation tasks terminal command palette`
- `Tauri command invoke optional parameters documentation`
- `OpenHands runtime terminal agent tasks official docs`

## 확인한 출처

- GitHub Docs, "Using the Visual Studio Code Command Palette in GitHub Codespaces": command palette는 많은 명령을 빠르게 접근시키는 핵심 표면이라는 점을 확인했다. 계획 영향: 검색 에이전트를 command palette 항목으로 추가했다.
- OpenHands Docs, "Overview" runtime/sandbox documentation: agent 작업은 격리/통제된 실행 환경에서 command/file 작업을 수행한다는 제품 패턴을 확인했다. 계획 영향: 새 런타임을 만들기보다 플랫폼-owned 하단 터미널 lane을 유지했다.
- OpenHands Docs, "Interactive Terminal": agent가 terminal tool과 상호작용하는 패턴을 확인했다. 계획 영향: 실행 결과와 질문을 raw terminal-only가 아니라 task-run store/decision inbox로 축적하는 기존 경로를 사용했다.
- OpenHands CLI Quick Start: CLI에 task를 입력해 agent를 시작하고 상태를 본다는 흐름을 확인했다. 계획 영향: 사용자가 shell 명령을 직접 치지 않아도 앱이 초기 task prompt를 주입하도록 설계했다.

## 약한 출처 및 미사용

- Reddit/비공식 튜토리얼/PDF 검색 결과는 채택하지 않았다.
- Tauri optional parameter 세부 구현은 로컬 컴파일 검증으로 확인했고, 외부 검색 결과를 사실 근거로 사용하지 않았다.

## 계획 영향

- 검색 에이전트를 새 에이전트 생성보다 앞에 두는 Agents 화면 표면으로 만든다.
- command palette와 quick start에서 같은 실행을 호출한다.
- 실행은 guest CLI adapter 세션으로 시작하지만 task state, stdout/stderr, decision prompts, task-run record는 플랫폼이 소유한다.
- 누적 데이터에서 검색 에이전트를 쉽게 찾기 위해 `taskKind=research_insight_agent`를 남긴다.

## 불확실성

- 실제 사용자 환경에서 어떤 guest adapter가 설치되어 있는지는 실행 시점에 달라진다. 기존 `capability_missing` 흐름을 유지한다.

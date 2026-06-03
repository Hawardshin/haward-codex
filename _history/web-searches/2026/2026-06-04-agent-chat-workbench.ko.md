# 웹 검색 기록: 에이전트 작업 채팅

## 요청

- `UR-2026-06-04-004`
- 목적: 검색 에이전트의 채팅 표면이 단순 채팅창이 아니라 실제 작업 시작점이 되게 만들기.

## 검색 쿼리

- `desktop AI agent chat workspace terminal output panel file changes UX command palette official docs`
- `VS Code agent chat terminal output panel command palette user workflow official docs`
- `OpenHands desktop agent chat terminal file editor workflow docs`
- `site:code.visualstudio.com/docs/copilot chat VS Code terminal workspace edit files official`
- `site:docs.openhands.dev OpenHands agent interactive terminal file editor chat workflow`
- `site:docs.github.com Copilot chat edit files terminal agent workspace official docs`

## 확인한 출처

- VS Code Docs, Chat overview: Chat view와 Agents window를 작업 표면으로 제공하고, agent가 workspace 변경과 terminal command 실행을 수행할 수 있음을 확인했다. 계획 영향: 검색 에이전트의 기본 표면을 실행 폼이 아니라 작업 채팅으로 바꿨다.
- VS Code Docs, Chat checkpoints: chat request가 workspace 변경과 연결되고 되돌릴 수 있는 checkpoint 개념이 있음을 확인했다. 계획 영향: 이번 slice에서는 checkpoint를 구현하지 않지만, 채팅 요청과 실행 기록을 같은 작업 단위로 연결했다.
- VS Code Docs, Workspace context: agent가 codebase/context를 검색해 chat에 붙이는 패턴을 확인했다. 계획 영향: 작업 채팅 오른쪽에 검색 질문, 채널, 저장 위치, 파일/근거 컨텍스트를 유지했다.
- OpenHands Docs, Interactive Terminal: agent가 interactive terminal tool을 통해 back-and-forth 작업을 진행하는 패턴을 확인했다. 계획 영향: 긴 출력과 실제 runtime은 하단 터미널 lane으로 연결했다.

## 계획 영향

- command palette와 Desktop quick start는 검색 에이전트를 터미널 직행으로 실행하지 않고 작업 채팅으로 진입한다.
- `SearchAgentWorkChatPanel`은 채팅 thread, composer, 작업 컨텍스트, agent/schema 계약, 터미널 열기 action을 한 화면에 둔다.
- `작업 시작`은 채팅 메시지를 남기고 같은 request id로 `RuntimeLaunchRequest`를 만들어 하단 터미널 lane과 task-run store에 연결한다.

## 무시한 약한 출처

- 비공식 블로그와 일반 소개글은 제품 UX 방향을 정하는 근거로 사용하지 않았다.

## 불확실성

- 실제 실행 성공은 사용자의 선택 guest adapter 설치와 인증 상태에 좌우된다. 이번 변경은 UX 진입점과 런타임 연결 방식을 개선한다.

# Web Search: Core Feature Connections

날짜: 2026-06-07

## 검색

- `VS Code workbench command palette activity bar navigation UX official documentation`
- `Tauri v2 frontend invoke command official documentation`
- `OpenAI Agents SDK manager agents as tools official documentation`
- `Claude Code subagents official documentation`

## 확인한 출처

- VS Code User Interface: https://code.visualstudio.com/docs/editing/userinterface
  - 작업면은 Activity Bar, Primary Side Bar, Panel, editor 영역을 분리하고, 각 영역이 프로젝트 맥락 접근을 돕는다는 기준을 확인했다.
  - 영향: 홈 주요 기능이 단순 섹션명보다 작업 목적과 바로 연결되도록 했다.
- Tauri Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/
  - 프런트엔드는 `invoke`로 Rust command와 연결할 수 있으며 command는 argument/result/error를 다룬다.
  - 영향: 이번 slice는 native command를 새로 만들지 않고 기존 frontend state navigation만 바꾸는 것으로 범위를 제한했다.
- OpenAI Agents SDK Agents: https://openai.github.io/openai-agents-js/guides/agents/
  - agents가 instructions, tools, handoffs와 함께 구성되는 주요 building block임을 확인했다.
  - 영향: 에이전트 기능 연결은 역할, 도구/기억 연결, 검증 제안으로 나누었다.
- OpenAI Agents SDK Tools: https://openai.github.io/openai-agents-js/guides/tools/
  - agent가 task를 처리하기 위해 tool을 사용한다는 연결 기준을 확인했다.
  - 영향: Tool Studio 연결은 소스, 환경, 배포 단계로 명시했다.
- Claude Code Subagents: https://code.claude.com/docs/en/subagents
  - subagent 관리와 tool access 설정이 별도 인터페이스/범위를 가진다는 점을 확인했다.
  - 영향: 에이전트/서브에이전트 연결은 실행 자동화가 아니라 단계 진입 UI로 제한했다.

## 약한 출처

- Reddit, PDF mirror, 비공식 요약은 채택하지 않았다.

## 계획 영향

- 홈 주요 기능에 세부 connection grid를 추가한다.
- connection은 실제 section/intent/flow step을 호출한다.
- native process나 CLI pipeline은 이번 변경 범위에서 제외한다.

## 불확실성

- 공식 문서의 UI 패턴은 참고 기준이며, 현재 제품의 구체 UI는 로컬 코드와 테스트가 최종 기준이다.

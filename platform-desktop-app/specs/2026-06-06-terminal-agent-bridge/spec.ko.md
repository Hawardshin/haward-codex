# Spec: Terminal Agent Bridge

## 목표

Desktop Runtime에서 터미널 연결과 에이전트 실행을 같은 작업 흐름으로 묶는다. 사용자가 별도 drawer, cockpit, 실행 버튼을 추측하지 않아도 PTY 연결 상태와 에이전트 세션 상태를 한 번에 확인하고 시작할 수 있어야 한다.

## 구현 범위

- `MonitorShell.tsx`
  - `createNativePtySession` helper: 기존 native PTY 시작 로직을 반환값 있는 helper로 분리한다.
  - `createCliAdapterSession` helper: 기존 CLI session 시작 로직을 실패 전파 가능한 helper로 분리한다.
  - `startTerminalAgentBridge`: runtime, adapter, prompt를 확인하고 PTY 연결 후 CLI session을 시작한다.
  - `terminal-agent-bridge` UI: PTY, adapter, agent 세 단계 상태와 action buttons를 노출한다.
- `globals.css`
  - bridge layout, state cards, action button 상태, desktop/mobile grid fallback을 추가한다.
- `tool-studio.test.mjs`
  - bridge surface, helper, stable data attributes, failure feedback CSS 계약을 검증한다.

## 언어/런타임 선택

- 옵션 A: TypeScript renderer bridge. 기존 Tauri commands와 terminal drawer 상태를 재사용할 수 있어 선택했다.
- 옵션 B: 새 Rust supervisor command. 실제 process orchestration authority는 강하지만, 현재 요구에는 새 command와 cleanup surface가 과하다.
- 선택: TypeScript renderer bridge + 기존 Rust PTY/CLI commands.

## 아키텍처 선택

- 옵션 A: Desktop Runtime 상단 bridge UI + 실패 전파 helper. 사용자 흐름이 바로 보이고 회귀 범위가 좁다.
- 옵션 B: RuntimeTerminalDrawer 내부에만 연결 버튼 추가. 구현은 작지만 첫 화면에서 기능을 찾기 어렵다.
- 옵션 C: 새 agent terminal supervisor. 장기적으로 가능하지만 이번 slice의 검증/cleanup 비용이 크다.
- 선택: 옵션 A.

## 폴더 구조 선택

- 옵션 A: 기존 `MonitorShell.tsx`, `globals.css`, 테스트 파일에 좁게 추가한다.
- 옵션 B: 새 component 파일로 분리한다.
- 선택: 옵션 A. bridge가 Desktop Runtime local state와 helper를 직접 사용하므로 새 폴더를 만들지 않는다.

## 수용 기준

- Desktop Runtime에 `data-terminal-agent-bridge="pty-to-agent"`가 1개 표시된다.
- 상태 step은 `pty`, `adapter`, `agent` 3개다.
- `data-terminal-agent-action="connect-start"`는 runtime/adapter/prompt 준비 시만 활성화된다.
- `startTerminalAgentBridge`는 PTY가 writable 상태가 아니면 CLI session을 시작하지 않는다.
- check/test/build/browser smoke가 통과한다.

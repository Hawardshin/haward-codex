# Agents 3D Collaboration Characters 스펙

## 요구사항

- REQ-WM-038: Agents 기본 화면은 중앙 채팅과 하단 composer를 주 작업면으로 유지한다.
- REQ-WM-039: 닫힌 Agents 세부 기능은 React 트리에 붙지 않아야 한다.
- REQ-WM-060: Agents 세부 Collaboration 작업면은 React Three Fiber/Drei 기반 3D 캐릭터 협업 장면을 lazy mount하고, 390px 모바일에서도 nonblank canvas와 수평 overflow 0을 유지한다.

## 사용자 결과

- 사용자는 Agents 탭에 들어오면 기존처럼 에이전트 코어 채팅을 먼저 본다.
- 사용자가 `에이전트 세부 기능 열기`를 연 뒤 Collaboration 영역으로 내려가면 에이전트들이 캐릭터로 작업 lane과 연결선을 중심으로 협업하는 3D 장면을 본다.
- 3D 장면은 summary HUD, 작업 lane 카드, 기존 collaboration board를 함께 제공해 시각적 이해와 상세 데이터 확인을 분리한다.
- 고객/공개 snapshot처럼 에이전트 데이터가 없으면 빈 상태를 표시하고 canvas를 강제로 만들지 않는다.

## 설계

- 새 컴포넌트: `components/workbench/AgentCollaborationScene.tsx`
- 오픈소스 의존성:
  - `@react-three/fiber@9.6.1`
  - `@react-three/drei@10.7.7`
- mount 경계:
  - `MonitorShell.tsx`에서 `next/dynamic(..., { ssr: false })`로 불러온다.
  - `agentDetailsOpen`이 true일 때만 Collaboration panel 안에 렌더링한다.
- 렌더링:
  - `collaborationBoard.agents` 상위 8개를 3D character로 배치한다.
  - `collaborationBoard.lanes` 상위 5개를 task lane node로 배치한다.
  - `collaborationBoard.flows` 상위 16개를 line connection으로 표시한다.
  - WebGL `preserveDrawingBuffer: true`로 smoke test pixel sampling을 가능하게 한다.
- 반응형:
  - desktop scene 높이는 `clamp(280px, 42vh, 520px)`를 사용한다.
  - 720px 이하에서는 scene 높이를 300px로 고정하고 HUD를 하단에 둔다.

## 비목표

- 실시간 multi-agent runtime streaming
- 새 에이전트 데이터 모델 수집 로직 변경
- 3D avatar asset 파일 다운로드
- 기본 Agents 채팅 화면 위로 3D 장면을 올리는 것

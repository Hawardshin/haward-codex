# Tool Studio UI Spec

## 목적

Workspace Monitor에 툴 제작, 배포, Python 실행환경, venv, 툴 전용 관리를 한 곳에서 시작할 수 있는 독립 Tool Studio 화면을 추가한다. 이 화면은 Agent Core류 제품처럼 여러 능력을 한 번에 다루되, 사용자가 보는 현재 작업은 하나의 명확한 단계로 제한한다.

## 요구사항

- REQ-WM-014: 단정하고 세련된 운영 UI 색상과 visual tone을 유지한다.
- REQ-WM-021: 탭 이동과 버튼 클릭은 heavy work를 즉시 실행하지 않고 빠르게 반응해야 한다.
- REQ-WM-035: 텍스트는 self-hosted Pretendard stack과 안정적 줄바꿈 규칙을 따른다.
- REQ-WM-042: 툴 제작/배포/Python 환경/venv/툴 전용 관리는 Source/Agents와 분리된 독립 화면으로 제공한다.

## 설계

- 새 section id: `tools`
- 새 컴포넌트: `components/workbench/ToolStudioPanel.tsx`
- 오픈소스 UI:
  - Radix Dropdown Menu: primary action과 depth 메뉴
  - Radix Context Menu: tool card 우클릭 작업
  - Three.js: lazy dynamic import 3D collaboration canvas
- 성능:
  - Three.js는 top-level import 금지
  - canvas scene은 `tools` section에서만 mount
  - unmount 시 animation frame cancel, renderer dispose, geometry/material dispose
- UX:
  - Tool flow: Build, Python Env, Deploy, Registry
  - 단축키: `⌘/Ctrl+B`, `⌘/Ctrl+Enter`, `⌘/Ctrl+Shift+E`, `⌘/Ctrl+Alt+T`
  - split scroll: tool list, detail panel, environment rail을 독립 scroll 영역으로 둔다.

## 비범위

- 실제 Python subprocess 실행
- 실제 package upload/deployment
- 전체 앱 navigation redesign

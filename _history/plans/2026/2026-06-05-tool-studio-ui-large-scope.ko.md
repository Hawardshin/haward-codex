# 대범위 요청 분해: Tool Studio UI 혁신

- 날짜: 2026-06-05
- 분해 방식: large-scope-decomposer-agent 시뮬레이션

## 원 요청 범위

- 속도 개선, 직관성/UI/UX 개선, flow 단순화
- Agent Core 유사 기능 강화
- 툴 만드는 화면, 툴 배포 화면, Python 실행환경, venv
- 툴만 관리하는 화면
- 탭/버튼 클릭 지연 제거
- 3D 캐릭터 기반 에이전트 협업 UI
- 드롭다운/우클릭/좌클릭/단축키/스크롤 범위 개선
- 텍스트 깨짐 및 이상한 줄바꿈 방지

## 이번 구현 slice

- `tools` section: Tool Studio
- 포함:
  - Tool build/deploy/environment/registry 4단 플로우
  - Python source and venv management summary
  - Radix dropdown primary action
  - Radix context menu for tool cards
  - keyboard shortcuts: `⌘/Ctrl+B`, `⌘/Ctrl+Enter`, `⌘/Ctrl+Shift+E`, `⌘/Ctrl+Alt+T`
  - Three.js lazy 3D collaboration canvas
  - split scroll columns and stable button sizes
  - regression tests for no heavy static imports and menu/shortcut contracts
- 제외:
  - 실제 Python process 실행과 배포 API 호출
  - 전체 MonitorShell 구조 분해
  - production 3D model asset pipeline

## 언어/런타임 선택

- 옵션 A: React/TypeScript 컴포넌트 안에 Tool Studio UI를 추가한다.
- 옵션 B: Python/Tauri native 화면으로 별도 구현한다.
- 선택: 옵션 A. 현재 Workspace Monitor가 Next/React 기반이고 기존 nav, snapshot, validation 흐름과 즉시 통합 가능하다. Python runtime은 UI에서 명확히 모델링하되 실제 실행기는 후속 Tauri command 작업으로 분리한다.

## 아키텍처 선택

- 옵션 A: `MonitorShell.tsx` 내부에 모든 UI를 직접 추가한다.
- 옵션 B: `components/workbench/ToolStudioPanel.tsx`로 분리하고 shell은 section routing만 담당한다.
- 선택: 옵션 B. 기존 shell이 이미 크기 때문에 새 기능을 분리해야 탭 전환과 유지보수 리스크를 낮춘다.

## 폴더 구조 선택

- 옵션 A: 기존 `components/workbench/` 아래 기능 컴포넌트로 둔다.
- 옵션 B: 새 `components/tools/` 폴더를 만든다.
- 선택: 옵션 A. 현재 workbench surface 컴포넌트들이 같은 위치에 있고, 신규 root folder 생성보다 기존 소유 경계에 맞다.

## 검증

- Node tests: section registration, dependency, static import, shortcut/menu contract
- Build/check/perf/customer audit
- Static export Playwright smoke: section transition latency, menu/context, shortcut, canvas nonblank, overflow

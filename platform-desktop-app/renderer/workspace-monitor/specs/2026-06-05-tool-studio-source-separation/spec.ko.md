# Tool Studio Source Separation 스펙

## 요구사항

- REQ-WM-071: Tool Studio public 타입과 정적 catalog data는 oversized component 밖의 전용 모듈로 분리해야 한다.

## 설계

- `components/workbench/tool-studio/types.ts`: `ToolStudioMode`, `ToolStudioModeRequest`, catalog item 타입을 소유한다.
- `components/workbench/tool-studio/data.ts`: Tool Studio stage, mode, tool card, builder blueprint, deploy target, Python environment catalog를 소유한다.
- `ToolStudioPanel.tsx`: UI state, event handlers, rendering, 3D effect를 유지하되 public 타입은 새 type module에서 re-export한다.

## 비목표

- UI 변경
- 새 dependency 설치
- `MonitorShell.tsx` 분해
- dynamic import/lazy loading 적용

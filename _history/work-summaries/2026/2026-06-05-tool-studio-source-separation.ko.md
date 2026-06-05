# 작업 요약: Tool Studio Source Separation

- Tool Studio의 public 타입을 `components/workbench/tool-studio/types.ts`로 분리했다.
- Tool Studio의 stage/mode/tool/blueprint/deploy/environment catalog를 `components/workbench/tool-studio/data.ts`로 분리했다.
- `ToolStudioPanel.tsx`는 기존 public type export를 유지하면서 UI state/rendering 중심으로 줄였다.
- 전체 검증과 성능 예산을 통과했다.

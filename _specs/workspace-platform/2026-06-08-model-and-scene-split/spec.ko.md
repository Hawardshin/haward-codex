# Spec: model and scene split

## 목적

남은 deferred 구조 압력 중 로컬에서 안전하게 줄일 수 있는 type model 파일과 ToolStudio 3D scene side-effect를 분리한다.

## 결정

- `snapshot.ts`는 public import path를 유지하고, 타입 정의는 `snapshotTypes.ts`로 이동한다.
- `desktop.ts`는 public import path를 유지하고, 타입 정의는 `desktopTypes.ts`로 이동한다.
- `ToolStudioPanel.tsx`의 WebGL scene effect는 `tool-studio/useToolAgentScene.ts` hook으로 이동한다.
- 기존 UI state와 selection state는 `ToolStudioPanel`에 남겨 React state ownership을 유지한다.

## Acceptance

- `snapshot.ts`와 `desktop.ts`가 500줄 이하가 된다.
- ToolStudio scene cleanup/dispose 테스트가 새 hook source를 포함해 통과한다.
- 기존 imports를 바꾸지 않아도 TypeScript check가 통과한다.

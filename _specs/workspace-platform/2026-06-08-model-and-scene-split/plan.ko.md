# Plan: model and scene split

1. `snapshot.ts` 타입 정의를 `snapshotTypes.ts`로 이동하고 shell re-export를 유지한다.
2. `desktop.ts` 타입 정의를 `desktopTypes.ts`로 이동하고 shell re-export를 유지한다.
3. `ToolStudioPanel.tsx`의 Three.js scene effect를 hook으로 분리한다.
4. 테스트 기대값을 새 module 경계에 맞게 갱신한다.
5. test/check/build/renderer build를 실행한다.
6. deferred/history 기록, evaluation, commit, push를 완료한다.

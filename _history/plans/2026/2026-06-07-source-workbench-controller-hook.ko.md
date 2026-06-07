# 2026-06-07 source workbench controller hook 계획

## 배경

- 직전 slice에서 source editor 세션 ref/timer는 `useSourceEditorSession`으로 이동했다.
- 남은 큰 중복 영역은 native invoke와 editor command handler가 `MonitorShell.tsx`에 남아 있는 부분이었다.

## 실행 계획

1. `MonitorShell.tsx`에서 source editor native invoke handler 후보를 확인한다.
2. `useSourceWorkbenchController.ts`를 만들고 기존 pure helper와 session hook API를 조합한다.
3. load/save/save-all/close/revert/template/copy/AGENTS.md 준비 handler를 hook으로 옮긴다.
4. `MonitorShell.tsx`는 hook 호출과 UI 연결만 남긴다.
5. source editor 구조 테스트, Tool Studio 광역 테스트, readiness source map을 새 경계로 갱신한다.
6. 좁은 테스트, workspace-monitor check, 전체 테스트, 내부 패키징을 순서대로 수행한다.

## 제외

- `_private/` 직접 검사 없음.
- 공개 macOS 배포 준비 선언 없음. Developer ID signing, notarization, updater endpoint는 별도 게이트다.

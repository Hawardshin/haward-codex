# Plan: Theme, Terminal Overlay, Code Folding UX

## 단계

1. 웹 근거와 현재 CSS/컴포넌트 구조를 확인한다.
2. 라이트 전용 background 값을 theme token으로 치환하고 다크 soft accent 변수를 추가한다.
3. `RuntimeTerminalDrawer`에 backdrop을 추가하고 open 상태를 작업영역 overlay로 바꾼다.
4. Monaco source toolbar에 fold/unfold command를 추가한다.
5. `WorkspaceExplorerPane` directory row에 local expanded state와 chevron/folder icon을 추가한다.
6. TypeScript, tests, customer build, Browser smoke, CSS scan으로 검증한다.

## 선택한 접근

- 새 UI library나 editor library를 추가하지 않는다.
- 기존 Monaco/Tauri/React 구조를 유지하면서 사용자 불편이 드러난 surface만 좁게 고친다.
- 다크모드 수정은 개별 selector override보다 token migration을 우선한다.

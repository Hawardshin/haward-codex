# Validation: Split Scroll Usability

## 예정 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- Browser smoke: settings/source/terminal scroll pane overflow, tabIndex, console errors

## 결과

- 상태: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과, 17개 테스트 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과, 17개 테스트 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과

## Browser Smoke

- 대상: customer preview 정적 빌드, `http://127.0.0.1:3242`
- 설정 dialog: `.settings-tab-panel` 존재, `overflow-y: auto`, `tabIndex=0`, dialog/body overflow hidden, console error 0
- 파일 시스템 화면: `.filesystem-workbench-shell`, `.workspace-explorer-tree`, `.filesystem-editor-pane`, `.native-source-workbench`, `.native-source-grid` 존재. Explorer tree는 독립 스크롤과 `tabIndex=0` 확인
- 터미널 drawer: `.terminal-drawer` 존재, drawer overflow hidden 확인
- 한계: 정적 preview에는 실제 런타임 source file open 상태와 CLI session이 없어 `.source-editor-frame`, `.session-grid`, `.session-list`, `.session-terminal pre`, `.terminal-event-rail`의 화면상 렌더링은 source/readiness 검사로 대체했다. 실제 패키지 앱에서 workspace와 CLI session을 연 상태의 추가 smoke가 다음 회귀 검증에 필요하다.

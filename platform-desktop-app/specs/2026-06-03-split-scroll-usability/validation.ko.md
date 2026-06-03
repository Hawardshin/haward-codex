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

## 2026-06-03 Scroll Access Regression

- 상태: 통과
- 원인: 최상위 `.desktop-app-shell`의 `min-height: 720px`와 중첩 `100vh`가 작은 창에서 내부 스크롤 pane 접근을 막을 수 있었고, 모바일 media query가 terminal/source pane 일부를 다시 visible overflow로 풀고 있었다.
- `corepack pnpm --filter workspace-monitor run check`: 통과, `check-scroll-containers.mjs` 포함
- `corepack pnpm --filter workspace-monitor run test`: 통과, 17개 테스트 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과, 21개 테스트 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: 통과
- `git diff --check`: 통과
- Browser smoke: `desktop 1366x900`, `compact 900x620`, `mobile 390x844`에서 base/source/settings/terminal 상태 모두 horizontal overflow 0, settings panel `overflow-y:auto`, terminal sidebar/main `overflow-y:auto`와 `tabIndex=0`, workspace explorer tree `overflow-y:auto` 확인

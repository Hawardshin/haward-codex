# Evaluation: Scroll Access Regression

## 요청 대응

- 사용자 요청: 스크롤이 되지 않아 원하는 내용이 보이지 않는 곳이 있다는 피드백.
- 대응: 최상위 desktop app shell의 고정 높이 잠금을 제거하고, desktop viewport, terminal drawer, settings dialog, filesystem/source workbench의 scroll container 책임을 재정리했다.
- 추가 대응: 모바일 terminal drawer와 Source workbench media query가 scroll/width 계약을 깨는 문제를 Browser smoke에서 발견하고 함께 수정했다.

## 구현 결과

- `.desktop-app-shell`: `100dvh`, `min-height: 0` 기반으로 변경하고 `min-height: 720px` 제거.
- `.desktop-viewport`: 내부 스크롤 host로 고정하고 keyboard focus 가능하게 설정.
- `.settings-dialog`: dynamic viewport height 기반의 definite height로 설정해 settings tab panel scroll이 안정적으로 동작하게 수정.
- `.terminal-drawer`: desktop/mobile 모두 sidebar/main pane이 독립 스크롤되고 keyboard focus 가능하게 수정.
- `.filesystem-workbench-shell`, `.monaco-editor-shell`: 작은 창에서 과도한 fixed minimum height가 접근을 막지 않게 조정.
- 모바일 Source workbench: header/stat/control/toolbar/switcher가 1열 폭 안에 머물게 수정.
- `check-scroll-containers.mjs`: scroll-safe CSS/JSX 계약과 모바일 override 계약을 자동 검사하도록 추가.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run test`: 통과, 17개
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과, 21개
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: 통과
- `git diff --check`: 통과
- Browser smoke: desktop, compact, mobile에서 base/source/settings/terminal 상태 horizontal overflow 0 및 주요 scroll pane overflow/focus 계약 통과.

## 남은 위험

- 정적 customer preview는 Tauri native workspace와 실제 장시간 CLI session output을 완전히 재현하지 않는다.
- public release readiness는 기존과 동일하게 Developer ID signing, notarization, signed updater, clean-machine smoke gate가 남아 있다.

## 최종 판단

- 상태: 통과
- 누락 점검: 사용자의 직접 불편 사항인 “스크롤 불가로 원하는 내용이 보이지 않음”을 최상위 shell, settings, terminal, source/mobile까지 재검사했고, 자동 회귀 검사와 Browser smoke evidence를 남겼다.

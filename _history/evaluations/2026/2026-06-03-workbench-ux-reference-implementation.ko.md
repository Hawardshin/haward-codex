# 작업 평가: 레퍼런스 기반 데스크톱 Workbench UX

## 판정

- 상태: `passed`
- 요청 ID: `UR-2026-06-03-042`
- 범위: 공식 레퍼런스 확인, 단일 sidebar, 하단 CLI terminal drawer, theme/language settings, 쉬운 초기 사용 flow

## 수용 기준

| 기준 | 상태 | 근거 |
| --- | --- | --- |
| Discord/VS Code/IntelliJ 레퍼런스를 확인한다 | 통과 | `_history/web-searches/2026/2026-06-03-workbench-ux-reference-implementation.ko.md`에 공식 문서와 계획 영향을 기록 |
| 좌측 navigation은 하나만 남긴다 | 통과 | Browser smoke에서 `.desktop-sidebar` 0개, `.activity-rail` 1개 확인 |
| 다중 CLI는 아래에서 올라오는 terminal surface로 제공한다 | 통과 | `하단 다중 CLI 터미널`, `terminal-drawer`, `terminal-drawer-launcher`, titlebar terminal action 구현 및 Browser smoke 확인 |
| 설정 dialog가 또 다른 sidebar처럼 보이지 않는다 | 통과 | `.settings-tab-list`를 horizontal segmented tab으로 바꾸고 `display:flex` 확인 |
| 다크모드/라이트모드를 제공한다 | 통과 | `THEME_MODE_STORAGE_KEY`, root `theme-system/light/dark`, `시스템`, `라이트`, `다크` controls 구현 및 Browser smoke 확인 |
| 언어 모드가 `전체` 하나에 묶이지 않는다 | 통과 | fallback language modes로 `전체`, `한국어만`, `English Only`, `미분류`를 항상 제공 |
| 초기 설정이 바로 쓸 수 있어야 한다 | 통과 | `바로 쓰기` quick start flow, `추천 기본값 적용`, 기본 `codex-cli` adapter, `터미널로 바로 가기` 구현 |
| readiness가 핵심 UX token을 강제한다 | 통과 | `check-readiness.mjs`와 `readiness.test.mjs`에 bottom terminal/theme/quick start/language token checks 추가 |

## 검증

- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `git diff --check`: passed before records
- Browser static-build smoke: passed
- Screenshot: `platform-desktop-app/artifacts/2026-06-03-workbench-ux-reference-implementation/bottom-terminal-dark-settings.png`

## 리소스 정리

- 정적 서버 `python3 -m http.server 3215`는 검증 후 종료했다.
- Browser automation은 screenshot 저장 후 추가 loop 없이 종료했다.
- Customer static build output은 tracked snapshot regeneration 범위만 포함했다.

## 잔여 위험

- 실제 packaged Tauri app smoke와 public release gate는 기존 release pipeline의 signing, notarization, updater, clean-machine 검증에서 계속 확인해야 한다.
- 완전한 native PTY emulator 자체 구현은 이번 slice 범위가 아니며, 기존 multi-CLI session surface를 데스크톱 workbench에 맞게 하단 terminal drawer로 재배치했다.

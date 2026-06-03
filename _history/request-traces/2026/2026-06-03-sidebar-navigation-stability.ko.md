# 요청-결과 추적: 좌측 내비게이션 안정화

- 날짜: 2026-06-03
- 요청 ID: `UR-2026-06-03-040`
- 소유 프로젝트: `platform-desktop-app/`
- 렌더러: `platform-desktop-app/renderer/workspace-monitor/`
- 작업 모드: `quick`

## 요청 요약

사용자는 좌측 사이드바가 화면 이동 시 왔다갔다하고, 클릭 이동이 두 군데로 중복되는 것 같다고 지적했다.

## 결과

- 좁은 `activity-rail`만 주요 섹션 전환을 맡기도록 정리했다.
- 넓은 `desktop-sidebar`의 중복 섹션 목록을 제거하고, 현재 화면 설명과 기능군 맥락을 보여주는 `sidebar-context-panel`로 바꿨다.
- sidebar 안의 중복 `operator-center-trigger`를 제거했다. 운영 센터는 activity rail의 shield icon과 command palette에서 열 수 있다.
- activity rail의 grid row를 실제 버튼 구조에 맞게 고정하고 hover translate를 제거해 좌측 내비게이션의 시각적 흔들림을 줄였다.
- 브라우저 검증 중 발견한 `파일/코드` hero 제목 세로 줄바꿈을 함께 수정했다.

## 주요 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/artifacts/2026-06-03-sidebar-navigation-stability/sidebar-context-after-file-click.png`
- `_history/web-searches/2026/2026-06-03-sidebar-navigation-stability.ko.md`
- `_history/evaluations/2026/2026-06-03-sidebar-navigation-stability.ko.md`

## 검증

- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- Browser static-build smoke: `파일/코드` activity rail click 후 중복 sidebar navigation DOM 0개, context panel 1개, hero title 정상 height 확인

## 잔여 위험

- 이 변경은 정적 renderer smoke 기준이다. 실제 Tauri packaged app에서도 같은 static renderer를 사용하므로 UI 구조 위험은 낮지만, OS window chrome과 packaged viewport는 별도 내부 패키징 smoke에서 계속 확인한다.

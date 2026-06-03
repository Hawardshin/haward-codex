# 2026-06-03 데스크톱 앱 셸 UI 요청 추적

## 요청

설치형 플랫폼 UI가 웹 대시보드처럼 보이는 문제를 줄이고, 설정과 컨피그는 팝업에서 처리하며, 화면과 단계가 데스크톱 앱답게 보이도록 재설계한다.

## 결과

- Workspace Monitor를 titlebar, activity rail, sidebar, content viewport 구조로 재배치했다.
- view mode, language mode, pinned sections, reset controls를 settings dialog로 이동했다.
- Overview를 workspace, task timeline, decision inbox, recent artifacts, capability dock 중심으로 줄였다.
- SnapshotLoader에 generated snapshot fallback을 추가해 static preview 로딩 실패를 줄였다.
- 데스크톱, settings dialog, 모바일 폭을 in-app Browser로 확인했다.

## 산출물

- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/components/SnapshotLoader.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/docs/requirements/2026-06-03-desktop-app-shell-ui.ko.md`
- `platform-desktop-app/specs/2026-06-03-desktop-app-shell-ui/`
- `_history/evaluations/2026/2026-06-03-desktop-app-shell-ui-evaluation-input.json`

## 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-desktop-app-shell-ui-resource-input.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-desktop-app-shell-ui-omission-input.json`
- static preview: `http://127.0.0.1:3018/`

## 남은 개선

`MonitorShell.tsx`가 계속 커지고 있으므로, 다음 구조 개선에서는 `DesktopShell`, `SettingsDialog`, `OverviewHome`, `SidebarNavigation` 단위로 분리하는 것이 좋다.

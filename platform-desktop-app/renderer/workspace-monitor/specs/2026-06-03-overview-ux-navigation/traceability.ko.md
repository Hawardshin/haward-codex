# 추적: Overview UX 내비게이션 개선

## 요청

- 사용자 요청: `UR-2026-06-03-011`
- 요구사항: `REQ-WM-020`

## 산출물

| 항목 | 경로 |
| --- | --- |
| UI 구현 | `workspace-monitor/components/MonitorShell.tsx` |
| 스타일 | `workspace-monitor/app/globals.css` |
| 요구사항 | `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md` |
| 스펙 | `workspace-monitor/specs/2026-06-03-overview-ux-navigation/` |
| 웹 검색 기록 | `_history/web-searches/2026/2026-06-03-overview-ux-navigation.ko.md` |

## 검증 연결

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix platform-desktop-app run build:customer`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- Rust/Tauri local build smoke

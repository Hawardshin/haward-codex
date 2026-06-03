# 작업 평가: Theme, Terminal Overlay, Code Folding UX

## 판정

- 상태: `passed`
- 요청 ID: `UR-2026-06-03-050`
- 범위: dark/light theme cleanup, terminal overlay, Monaco folding controls, Explorer folder collapse

## 수용 기준

| 기준 | 상태 | 근거 |
| --- | --- | --- |
| 다크모드 흰 배경 제거 | 통과 | CSS scan 통과, Browser dark smoke bright visible count `0` |
| 라이트모드 유지 | 통과 | 기존 surface token 유지, customer build/check 통과 |
| 터미널 화면 덮기 | 통과 | backdrop/open drawer 확인, `1280x720`에서 drawer `1218x656` |
| 코드 접기 기능 | 통과 | Browser source toolbar에 `코드 접기`, `코드 펼치기` 노출 |
| Explorer 폴더 접기 | 통과 | `WorkspaceExplorerPane` local state/`aria-expanded` 구현, type/readiness 통과 |

## 검증

- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- CSS hard-coded light background scan: passed
- Browser smoke: dark mode, terminal overlay, source folding toolbar, console error `0`

## 잔여 위험

- Customer static preview has no runtime workspace files, so Explorer folder collapse was covered by source/type/readiness checks. Real-folder packaged runtime smoke should re-check it after selecting a workspace.

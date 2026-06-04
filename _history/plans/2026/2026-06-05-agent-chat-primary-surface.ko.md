# 계획: Agent Chat Primary Surface

- work_mode: `standard`
- view_mode: `superadmin_developer`
- target surface: `platform-desktop-app/renderer/workspace-monitor`
- implementation slice:
  - Agents 탭 기본 화면에서 metrics를 접힘 disclosure로 이동한다.
  - context/contract drawer는 열기 전까지 렌더하지 않는다.
  - Agents 전용 primary work surface에서 공통 status strip, document filter, titlebar search를 숨긴다.
  - 모바일 composer controls를 compact하게 줄이고 390px first viewport에서 composer가 보이게 한다.
- verification:
  - `corepack pnpm --filter workspace-monitor run check`
  - `corepack pnpm --filter workspace-monitor test`
  - `corepack pnpm --filter workspace-monitor run build:customer`
  - in-app Browser static export audit at `390x844`
  - `corepack pnpm --filter workspace-monitor run perf:budget`
  - `corepack pnpm --filter platform-desktop-app run check`
- resource risk: static HTTP server and in-app Browser verification; close by killing the local port.

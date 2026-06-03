# Validation: Workbench Split Density

## 예정 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `git diff --check`

## 현재 결과

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과, 17개 테스트 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- 최종 `corepack pnpm --filter platform-desktop-app run check`: 통과
- `git diff --check`: 통과

## 한계

- 현재 세션에서는 packaged native app 클릭 smoke를 수행하지 못했다. 다음 native smoke에서 terminal drawer open/close, view switcher, Explorer first-screen file tree visibility를 실제 화면에서 확인해야 한다.

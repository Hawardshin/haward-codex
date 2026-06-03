# Validation: Native Permission & Quiet UI

## 예정 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `git diff --check`

## 결과

- 상태: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과, 17개 테스트 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과, 17개 테스트 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- Bundle/source token smoke: `작업공간 접근 권한 요청`, `workspace-permission-hint`, `SF Pro Text`, `Apple SD Gothic Neo`, `transform: none` 확인
- `git diff --check`: 통과

## 한계

- 현재 실행 환경에는 클릭 기반 browser automation tool이 없어 실제 native folder picker 클릭 smoke는 수행하지 못했다. Tauri command는 기존 `choose_desktop_workspace_folder`를 사용하며, 다음 packaged app smoke에서 권한 요청 버튼과 working directory 자동 반영을 실제 클릭으로 재확인해야 한다.

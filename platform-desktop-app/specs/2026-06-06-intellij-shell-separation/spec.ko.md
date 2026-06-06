# Spec: IntelliJ Shell Separation

## 결정

현재 `workspace-monitor` shell을 `intellij-tool-window-editor` layout model로 태깅하고, CSS에서 side tool-window stripe와 main editor plane을 명시적으로 분리한다.

## 구현 기준

- `desktop-app-shell`에 layout model data attribute를 둔다.
- `activity-rail`에 tool-window zone data attribute를 둔다.
- `desktop-viewport`에 editor zone data attribute를 둔다.
- CSS에 IntelliJ-style separation tokens를 추가한다.
- `activity-rail`은 dark side chrome, 강한 우측 경계, inset/highlight shadow, active rail indicator를 유지한다.
- `desktop-viewport`는 editor plane 배경과 좌측 separator shadow를 갖는다.
- `desktop-titlebar`는 viewport padding 바깥까지 full-bleed로 확장해 메인 상단 chrome 경계를 만든다.
- 테스트는 이 계약이 사라지지 않도록 shell data attribute와 CSS token/rule을 확인한다.

## 검증 기준

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --dir platform-desktop-app run package:internal`

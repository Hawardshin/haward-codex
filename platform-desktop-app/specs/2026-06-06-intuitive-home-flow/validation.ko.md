# Validation: Intuitive Home Flow

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 90 tests
- `corepack pnpm run desktop:renderer:build`: 통과
- `corepack pnpm --dir platform-desktop-app run check`: 통과
- Browser smoke:
  - URL: `http://127.0.0.1:3215/#section-overview`
  - `data-home-start-flow`: 1개
  - `data-home-flow-step`: 4개
  - 1280x720 layout: horizontal overflow 없음, 단계 버튼 overlap 없음
  - `run` step click: `desktop` section 활성화, `data-task-handoff="run-work"` 표시

## 참고

- `platform-desktop-app run check`는 developer snapshot 복구 상태에서 customer bundle stale warning을 허용하는 기존 내부 check 정책을 따른다.

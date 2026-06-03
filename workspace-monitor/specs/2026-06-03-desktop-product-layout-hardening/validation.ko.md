# 검증

## 통과한 검증

- `git diff --check`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: `within_budget`, largest chunk `227542` bytes
- `corepack pnpm --filter workspace-monitor test`: 16 tests 통과
- `corepack pnpm --filter workspace-monitor run check:intent-map:customer`: 통과
- `corepack pnpm --filter platform-desktop-app run check`: `desktop_product_structure_ready_public_release_gated`, customer bundle warnings 없음
- `corepack pnpm --filter platform-desktop-app test`: 13 tests 통과
- Browser smoke: `.desktop-app-shell` 렌더링, body overflow `0`, desktop viewport overflow `0`, runtime/source panel full-width 확인

## 남은 공개 출시 blocker

- Runtime workspace chooser enforcement
- Public signing/notarization
- Signed updater channel
- Clean-machine smoke

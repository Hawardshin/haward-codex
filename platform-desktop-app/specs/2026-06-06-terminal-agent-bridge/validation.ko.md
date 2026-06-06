# Validation: Terminal Agent Bridge

## 실행 완료

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 90 tests
- `corepack pnpm -w run desktop:renderer:build`: 통과, customer bundle audit 통과
- Browser smoke:
  - `http://127.0.0.1:3216/#section-desktop`
  - desktop 1280x720에서 bridge 1개, step 3개, bridge viewport 내 표시 확인
  - Browser preview에서 Tauri runtime 없음으로 connect-start 버튼 비활성 확인
  - `data-terminal-agent-action="open-terminal"` 클릭 후 `.terminal-drawer.open` 1개 확인
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과, developer public snapshot 갱신
- `corepack pnpm --dir platform-desktop-app run check`: 통과
  - 기존 public release signing/updater/clean-machine smoke 경고는 유지
  - developer collect 후 `public/workspace-snapshot.json`은 developer snapshot이고 customer-safe fallback은 `src/generated/customer-workspace-snapshot.json`로 확인됨
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-06-terminal-agent-bridge-input.json`: `ready_to_close`
- `git diff --check`: 통과

## 알려진 경계

- 모바일 390px viewport에서는 기존 `--desktop-app-min-width: 1280px` desktop shell 정책 때문에 전체 앱이 1280px 폭을 유지한다. 이번 slice는 bridge 자체의 responsive grid를 추가했지만 desktop shell 최소 폭 정책은 변경하지 않았다.
- Browser preview에는 Tauri runtime이 없어 실제 native PTY spawn은 packaged desktop runtime에서 별도 smoke가 필요하다.

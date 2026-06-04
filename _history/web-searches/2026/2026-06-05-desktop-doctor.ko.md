# 2026-06-05 Desktop Doctor Web Search

## Trigger

- 사용자 지시: 기능 개선.
- 목적: desktop install/build 진입 전 환경, 브라우저 캐시, workspace filter, subprocess 검증 방식을 공식 문서 기준으로 확인한다.

## Queries

- `Tauri v2 prerequisites Rust Cargo official docs`
- `Playwright browsers install Chromium official docs`
- `pnpm filtering workspace official docs`
- `Node.js child_process spawnSync official docs`

## Checked Sources

- Tauri prerequisites: https://v2.tauri.app/start/prerequisites/
- Playwright browsers: https://playwright.dev/docs/browsers
- pnpm filtering: https://pnpm.io/filtering
- Node.js child_process: https://nodejs.org/api/child_process.html

## Decision Impact

- Tauri desktop readiness는 Node/pnpm만 보지 않고 Cargo/Rust/Tauri CLI 상태까지 한 번에 확인한다.
- Playwright browser cache는 CLI 존재뿐 아니라 `playwright install --list` 결과에서 Chromium headless shell 존재까지 확인한다.
- monorepo 명령은 pnpm `--filter` 경계를 유지해 `platform-desktop-app`와 `workspace-monitor` 작업만 검사한다.
- doctor command는 Node `spawnSync` 기반의 짧은 subprocess 점검으로 만들고, 실패가 있을 때만 non-zero exit code를 낸다.

## Weak Or Unused Sources

- Reddit, 일반 블로그, 오래된 비공식 pnpm mirror는 공식 문서보다 신뢰도가 낮아 의사결정 근거로 쓰지 않았다.

## Public Summary

- 설치/빌드 전체를 무작정 돌리기 전에 현재 desktop 개발 환경과 release gate 상태를 빠르게 확인하는 `desktop:doctor` 기능을 추가한다.

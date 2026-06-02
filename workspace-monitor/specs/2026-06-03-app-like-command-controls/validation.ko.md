# 검증: 앱형 Command Controls

## 명령

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix workspace-monitor run check:intent-map`
- `npm --prefix platform-desktop-app run monitor:build`
- `npm --prefix workspace-monitor run check:intent-map:customer`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app test`
- static export smoke
- `git diff --check`

## 결과

- `npm --prefix workspace-monitor test`: 통과, 16개 테스트 pass.
- `npm --prefix workspace-monitor run check`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-app-like-command-controls-resource-input.json`: `resource_ready`.
- `npm --prefix platform-desktop-app test`: 통과, 13개 테스트 pass.
- `npm --prefix workspace-monitor run build`: 통과, developer snapshot 1200 documents.
- `npm --prefix workspace-monitor run perf:budget`: 통과, largest initial chunk 227537 bytes.
- `npm --prefix workspace-monitor run check:intent-map`: 통과, developer intent map 155 intents / 12 themes.
- static export smoke: `app-control-bar`, `command-palette`, `workspace-monitor:pinned-sections`가 build JS/CSS에 포함됨.
- Playwright availability check: 현재 workspace에 Playwright는 설치되어 있지 않음.
- `npm --prefix platform-desktop-app run monitor:build`: 통과, customer bundle audit ready.
- `npm --prefix workspace-monitor run check:intent-map:customer`: 통과, customer intent map redacted to 0.
- `npm --prefix platform-desktop-app run check`: 통과, internal service ready and existing public blockers retained.
- `npm --prefix workspace-monitor run collect`: 통과, 추적 snapshot을 developer public snapshot으로 복원.
- `git diff --check`: 통과.
- `check-omissions`: `coverage_ready`.
- `evaluate-work`: `ready_to_close`.

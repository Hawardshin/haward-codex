# 검증: 핵심 기능 탭 구조

## 명령

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix workspace-monitor run check:intent-map`
- `npm --prefix workspace-monitor run check:intent-map:customer`
- `npm --prefix platform-desktop-app run monitor:build`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app test`

## 결과

- `npm --prefix workspace-monitor test`: 통과, 16개 테스트 pass.
- `npm --prefix workspace-monitor run check`: 통과.
- `npm --prefix workspace-monitor run build`: 통과, developer snapshot 1200 documents.
- `npm --prefix workspace-monitor run perf:budget`: 통과, largest initial chunk 227537 bytes.
- `npm --prefix workspace-monitor run check:intent-map`: 통과, developer intent map 155 intents / 12 themes.
- `npm --prefix platform-desktop-app run monitor:build`: 통과, customer bundle audit ready.
- `npm --prefix workspace-monitor run check:intent-map:customer`: 통과, customer intent map redacted to 0.
- `npm --prefix platform-desktop-app run check`: 통과, internal service ready and existing public blockers retained.
- `npm --prefix platform-desktop-app test`: 통과, 13개 테스트 pass.
- `npm --prefix workspace-monitor run collect`: 통과, 추적 snapshot을 developer public snapshot으로 복원.
- static export DOM/CSS smoke: `core-feature-rail`, `section-tab-groups`, `Core Functions`, responsive core feature CSS가 build output에 포함됨.
- Playwright availability check: 현재 workspace에 Playwright는 설치되어 있지 않음.
- `git diff --check`: 통과.
- `check-omissions`: `coverage_ready`.
- `evaluate-work`: `ready_to_close`.

## 수동 확인 포인트

- 상단 `core-feature-rail`에서 핵심 기능 위치가 먼저 보인다.
- `section-tab-groups`가 기능군별로 섹션을 묶는다.
- 모바일 CSS는 탭 label을 숨기지 않고 1열 layout으로 전환한다.

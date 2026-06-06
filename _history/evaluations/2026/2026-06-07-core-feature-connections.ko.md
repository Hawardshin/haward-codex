# 최종 평가: Core Feature Connections

날짜: 2026-06-07

## 평가

홈의 주요 기능 상세가 실제 작업 흐름으로 이어지도록 connection 버튼을 추가했다. 각 버튼은 단순 섹션 이동이 아니라 intent와 flow step 또는 Tool Studio mode request를 함께 설정한다.

## 충족

- 핵심 기능 상세에 세부 연결 버튼이 추가됐다.
- 에이전트, 툴, 실행, 평가, 파일, 실행/결정 가시성 경로가 연결됐다.
- Tool Studio 연결은 mode request를 갱신한다.
- DOM/CSS contract가 static test로 보호된다.

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 90 tests.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과.
- `corepack pnpm -w run desktop:renderer:build`: 통과.
- `corepack pnpm --dir platform-desktop-app run check`: 통과. 기존 public release gate와 developer snapshot stale warning은 유지된다.
- Browser smoke: connection 그룹 6개, action 18개를 확인했고 `tool-source` 대표 클릭이 `#section-tools`와 Tool Studio source step으로 이어졌다.
- dev server cleanup: `lsof -nP -iTCP:3224 -sTCP:LISTEN`에서 listener 없음.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-07-core-feature-connections.json`: `resource_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-07-core-feature-connections.json`: `coverage_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-07-core-feature-connections-input.json`: `ready_to_close`.

## 남은 경계

- 이번 변경은 navigation/UI 연결이며 새 native command나 CLI pipeline을 추가하지 않았다.

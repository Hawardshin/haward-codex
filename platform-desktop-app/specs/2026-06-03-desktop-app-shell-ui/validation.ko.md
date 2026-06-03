# 데스크톱 앱 셸 UI 검증 계획

## 자동 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`

## 수동/시각 검증

- 데스크톱 폭에서 titlebar, activity rail, sidebar, content viewport가 동시에 보이는지 확인한다.
- 설정 버튼이 modal dialog를 열고 view/language/pinned 설정이 그 안에 있는지 확인한다.
- 모바일 폭에서 activity rail/sidebar/content가 세로로 재배치되고 텍스트가 겹치지 않는지 확인한다.

## 검증 결과

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과, 16개 테스트
- `corepack pnpm --filter workspace-monitor run build`: 통과
- 정적 미리보기 `http://127.0.0.1:3018/`: 데스크톱 1280x720에서 body 가로 오버플로 없음, shell은 viewport 고정, content viewport만 내부 스크롤
- 설정 대화상자: settings 버튼으로 열림, view mode 3개와 pinned section 설정이 모달 안에 표시됨
- 모바일 390px 폭: activity rail/sidebar/content가 세로 재배치되고 가로 오버플로 없음
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-desktop-app-shell-ui-resource-input.json`: `resource_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-desktop-app-shell-ui-omission-input.json`: `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-03-desktop-app-shell-ui-evaluation-input.json`: `ready_to_close`
- `corepack pnpm --filter workspace-monitor run check:intent-map:customer`: 통과, public snapshot의 intent map 내부 데이터 0건

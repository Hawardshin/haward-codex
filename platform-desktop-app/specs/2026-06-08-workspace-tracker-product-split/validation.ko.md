# 검증 계획: workspace tracker product split

## 필수 검증

- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research ../_history/coding-research/2026/2026-06-08-workspace-tracker-product-split.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/workspace-tracker-product-split-registry.json ../platform-desktop-app/configs/product-feature-registry.json configs/access/view-mode-registry.json`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect --best-effort`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`
- `corepack pnpm --dir platform-desktop-app run test`
- `corepack pnpm --dir platform-desktop-app run check`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-08-workspace-tracker-product-split.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-08-workspace-tracker-product-split.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-08-workspace-tracker-product-split.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-08-workspace-tracker-product-split-evaluation-input.json`
- `git diff --check`

## 시각 검증

Browser plugin으로 `http://localhost:3050` local renderer를 열고 home/product split panel, Git 작업공간, 터미널/AI 실행, 보고서/근거, 연결 상태 표시를 확인한다.

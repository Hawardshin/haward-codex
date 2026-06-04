# 검증 계획

## 명령

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run test`
- `corepack pnpm --dir platform-desktop-app run test`
- `corepack pnpm --dir platform-desktop-app run check`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-gap-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/service-readiness-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/reference-platform-advantage-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m unittest tests.test_view_modes`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-04-core-feature-priority.json`
- `git diff --check`

## 브라우저 스모크

- 로컬 dev server를 열고 Home 첫 화면을 확인한다.
- desktop과 mobile viewport에서 `Agent Core`, `CLI Orchestration`, `Root Tools`, `Work Visibility`, `Setup` 관련 표면이 보이는지 확인한다.
- 텍스트 겹침, 빈 화면, 가로 overflow, 핵심 CTA 누락을 확인한다.

## 결과

- in-app Browser desktop DOM smoke: 통과, core panel/setup/root tool panel 렌더, 가로 overflow 없음.
- in-app Browser mobile DOM smoke: 통과, core panel/setup/root tool panel 렌더, 가로 overflow 없음.
- Playwright desktop capture: 통과, `_history/evaluations/2026/2026-06-04-core-feature-priority-desktop.png`
- Playwright mobile capture: 통과, `_history/evaluations/2026/2026-06-04-core-feature-priority-mobile.png`

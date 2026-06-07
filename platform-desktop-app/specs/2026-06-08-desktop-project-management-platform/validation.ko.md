# 검증 계획: desktop project management platform

## 실행 검증

- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/workspace-tracker-product-split-registry.json`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect --best-effort`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`
- `corepack pnpm --dir platform-desktop-app run test`
- `corepack pnpm --dir platform-desktop-app run check`
- Browser smoke: `http://127.0.0.1:3068/#projects`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-08-desktop-project-management-platform.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-08-desktop-project-management-platform.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-08-desktop-project-management-platform.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-08-desktop-project-management-platform-evaluation-input.json`
- `git diff --check`

## 통과 기준

- 모든 필수 명령이 exit code 0으로 끝난다.
- Browser smoke는 프로젝트 패널, primary import action, 4개 workflow lane, 프로젝트 카드, 모바일 overflow 없음까지 확인한다.
- 통합 check의 public release warning은 기존 signing/updater/clean-machine gate로만 남아야 한다.

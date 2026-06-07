# 요청-결과 추적: project repository submodule visibility

- 날짜: 2026-06-08
- 요청: Git 분리 이후 구현을 계속 진행.

## 결과

- 분리된 repository metadata가 desktop project management snapshot과 UI에 표시된다.
- `awp doctor --json`이 submodule readiness와 초기화 명령을 보고한다.
- 실제 generated snapshot에서 6개 root project가 `git_submodule`로 확인된다.
- Browser smoke에서 developer snapshot 기준 6개 repository strip과 detail strip이 표시되는 것을 확인했다.
- 기본 customer snapshot에서는 내부 프로젝트 목록은 비우고 사용자용 Git 작업공간 import/create 액션을 유지한다.

## 검증

- `corepack pnpm --dir renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir renderer/workspace-monitor test -- --test-name-pattern ...`: 통과
- `corepack pnpm --dir renderer/workspace-monitor test`: 통과
- `corepack pnpm test -- --test-name-pattern "awp CLI exposes"`: 통과
- `corepack pnpm run test`: 통과
- `corepack pnpm run renderer:build`: 통과
- `corepack pnpm run check`: 통과
- `python3 platform-desktop-app/tools/awp/awp.py doctor --json`: 통과
- Browser smoke: 통과
- `git diff --check`: 통과

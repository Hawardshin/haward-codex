# 제품 Workbench 대공사 작업 목록

## 완료

- [x] `slice-01-home-workbench-shell`: Overview 핵심 기능 탭과 path disclosure를 component/config로 분리한다.
- [x] `slice-02-workspace-explorer-module`: Explorer tree/dropzone/editor launcher를 workbench component로 분리한다.

## 다음 작업

- [ ] `slice-03-runtime-terminal-module`: 하단 다중 CLI 터미널과 session/task pipe UI를 runtime module로 분리한다.
- [ ] `slice-04-agent-factory-module`: agent factory와 creation candidate surface를 dedicated module로 만든다.
- [ ] `slice-05-learning-loop-module`: accumulated data/evaluation/capability promotion을 learning loop로 재배치한다.
- [ ] `slice-06-operator-center-hard-separation`: operator/admin/path/audit details를 Operator Center로 더 강하게 분리한다.

## 검증

- [x] `corepack pnpm --filter workspace-monitor run check`
- [x] `corepack pnpm --filter workspace-monitor test`
- [x] `corepack pnpm --filter workspace-monitor run build:customer`
- [x] `corepack pnpm --filter platform-desktop-app test`
- [x] `corepack pnpm --filter platform-desktop-app run check`
- [x] Browser smoke
- [x] `git diff --check`

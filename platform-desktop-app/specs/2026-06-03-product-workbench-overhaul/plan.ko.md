# 제품 Workbench 대공사 계획

## 레퍼런스 결정

- VS Code: Activity Bar, Side Bar, Panel, editor workbench는 확장 가능한 view container로 분리된다.
- Eclipse Theia: frontend/backend와 workbench contribution을 모듈식으로 분리한다.
- Tauri: frontend는 UI shell을 맡고 OS/runtime 기능은 Rust command/state를 통해 호출한다.
- Fluent navigation: main sections와 category disclosure를 구분하고, 탭 기반 navigation은 사용자의 현재 목적을 유지한다.

## 폴더 구조 옵션

- 옵션 A: `MonitorShell.tsx` 안에 계속 기능을 추가한다. 기각. 이미 8천 줄을 넘어 유지보수와 사용자 흐름 판단이 어려워졌다.
- 옵션 B: `components/workbench/` 아래에 feature surface component를 만들고 `MonitorShell.tsx`는 shell state/router만 맡긴다. 선택.
- 옵션 C: Theia/VS Code OSS 기반으로 renderer를 전면 교체한다. 보류. 장기 후보지만 설치/라이선스/보안/번들 검토가 선행되어야 한다.

## Slice 전략

1. `slice-01-home-workbench-shell`
   - 범위: Overview 핵심 기능 탭과 path disclosure를 component/config로 분리한다.
   - touch paths: `MonitorShell.tsx`, `components/workbench/*`, readiness/test, history.
   - 검증: TypeScript, tests, customer build, Browser smoke.

2. `slice-02-workspace-explorer-module`
   - 범위: workspace Explorer tree/dropzone/editor launcher를 별도 component와 adapter hook으로 이동한다.
   - touch paths: `MonitorShell.tsx`, `components/workbench/workspace-explorer/*`, Tauri invoke adapter.
   - 검증: Browser smoke에서 Explorer pane, tree, empty state, editor launch 확인.

3. `slice-03-runtime-terminal-module`
   - 범위: bottom terminal drawer와 CLI session/task pipe controls를 runtime workbench module로 이동한다.
   - touch paths: runtime panel sections, CLI adapter types, readiness.
   - 검증: terminal drawer open/collapse, task pipe init, session state smoke.

4. `slice-04-agent-factory-module`
   - 범위: agent catalog, creation candidates, role/tool/skill mapping을 dedicated surface로 정리한다.
   - touch paths: agent feature component, product feature registry, readiness.
   - 검증: agent factory tab, candidate list, action routing.

5. `slice-05-learning-loop-module`
   - 범위: accumulated data, evaluations, capability promotion candidates를 user-visible learning loop로 재배치한다.
   - touch paths: accumulated data UI, history/evaluation summaries, path disclosure.
   - 검증: user-facing data map, disclosure-only raw path.

6. `slice-06-operator-center-hard-separation`
   - 범위: release/service/runtime audit/path/payload details를 Operator Center로 이동하거나 default-hidden으로 만든다.
   - touch paths: OperatorCenterDialog, runtime data panels, settings.
   - 검증: user overview에 raw path/payload audit noise 없음.

## Merge Gates

- 각 slice는 readiness token, Browser smoke screenshot, evaluation record를 남긴다.
- `MonitorShell.tsx` line count가 줄거나 책임 수가 감소해야 한다.
- 사용자-facing wording은 한국어 우선으로 검증하고 영어 mode를 깨지 않는다.
- public release blockers는 별도 service readiness gate로 유지한다.

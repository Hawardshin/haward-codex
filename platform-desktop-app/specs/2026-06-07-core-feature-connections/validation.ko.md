# Validation: Core Feature Connections

날짜: 2026-06-07

## 정적 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
  - 상태: 통과
  - 결과: 90 tests pass
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
  - 상태: 통과
  - 결과: `lazy_boundary_contract_ok`, `scroll_contract_ok`, `source_control_design_ok`, `comprehensive_improvement_contract_ok`, `history_payload_ok`

## 빌드/스냅샷 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`
  - 상태: 통과
  - 결과: 650 inline documents, 2830 admin history records
- `corepack pnpm -w run desktop:renderer:build`
  - 상태: 통과
  - 결과: Next.js production build, customer bundle audit ready
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`
  - 상태: 통과
  - 결과: developer public snapshot restored
- `corepack pnpm --dir platform-desktop-app run check`
  - 상태: 통과
  - 결과: internal checks passed; 기존 public release gate 경고와 developer snapshot stale warning은 유지

## Browser Smoke

- 대상: `http://127.0.0.1:3224/#section-overview`
- 상태: 통과
- 결과:
  - `data-home-focus-command`: 1
  - `data-core-feature-connections`: 6
  - `data-core-feature-action`: 18
  - 확인한 action: `agent-role`, `tool-source`, `run-lane`, `eval-current`, `files-file`, `visibility-decisions`
  - `tool-source` 대표 클릭 후 `#section-tools`, visible mounted section `tools`, Tool Studio/source step text 확인
  - dev server 종료 후 `lsof -nP -iTCP:3224 -sTCP:LISTEN` no listener

## 예정 검증

- `git diff --check`

## Guard

- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-07-core-feature-connections.json`
  - 상태: 통과
  - 결과: `resource_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-07-core-feature-connections.json`
  - 상태: 통과
  - 결과: `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-07-core-feature-connections-input.json`
  - 상태: 통과
  - 결과: `ready_to_close`

## 수동 확인 포인트

- 홈 주요 기능 상세에서 `data-core-feature-connections`가 렌더링된다.
- `agent-role`, `tool-source`, `run-lane`, `eval-current`, `files-file`, `visibility-decisions` 액션이 존재한다.
- Tool Studio 연결은 mode request를 발생시키고 `build-tool` intent step을 연다.

## 남은 경계

- Browser preview는 native command 실행이 아니라 화면/DOM 연결만 확인한다.
- 이번 slice는 navigation connection이며 새 CLI process lifecycle을 추가하지 않는다.

# Request Trace: Button Interaction Latency

## 요청

- ID: `UR-2026-06-05-button-interaction-latency`
- 요약: 버튼 클릭 후 느려지는 현상을 전반적으로 줄인다.

## 근거

- Web-first intake: `_history/web-searches/2026/2026-06-05-button-interaction-latency.ko.md`
- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md` `REQ-WM-041`
- Spec: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-button-interaction-latency/`

## 구현

- `MonitorShell.tsx`
  - `scheduleAfterFirstPaint` helper 추가.
  - Desktop Runtime과 Source 진입 시 staged shell을 먼저 렌더하고 heavy workbench를 뒤로 미룸.
  - runtime surface에서 Source 전용 JSX를 만들지 않도록 조기 반환으로 분리.
  - Source filtering, decision grouping, evidence assembly, source diff 계산을 실제 surface/disclosure가 열릴 때만 수행.
  - mount 직후 Tauri/native refresh를 첫 paint 뒤로 지연.
- `globals.css`
  - Desktop/Source staged shell skeleton layout과 reduced-motion 대응 추가.

## 검증

- baseline worst case: Agents → CLI rail button `177.4ms`, long task `122ms`.
- final 67-button audit: average `27.9ms`, p95 `45.4ms`, max `47.8ms`, long task count `0`.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 17 tests.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk `331633` bytes.
- `corepack pnpm --filter platform-desktop-app run check`: 통과, 기존 public release gate 경고만 유지.
- in-app Browser settled smoke: `#section-desktop`, workbench visible, staged shell removed, overflow `0`.

## 결과

- 느린 버튼군의 공통 병목이 첫 paint의 heavy mount임을 확인하고 분리했다.
- 67개 버튼 표본에서 long task가 사라지고 p95가 60ms 기준 아래로 내려갔다.
- Tauri native command 자체 지연은 별도 profiling 범위로 남긴다.

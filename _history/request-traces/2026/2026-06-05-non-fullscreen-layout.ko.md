# 요청 추적: Non-fullscreen layout

- 날짜: 2026-06-05
- 요청 요약: Workspace Monitor의 여러 화면이 전체화면이 아닐 때 깨진다는 피드백.
- 소유 프로젝트: `platform-desktop-app/renderer/workspace-monitor/`

## 결과

- 초기 loader가 대형 snapshot과 MonitorShell을 동기 import하지 않고 public JSON fetch 후 lazy import하도록 변경했다.
- 주요 섹션 버튼에 `data-section-id`와 명시적 label을 추가해 navigation과 검증 선택자를 안정화했다.
- 960px 이하에서 복합 grid/workbench/titlebar/toolbar가 1열로 reflow되게 했다.
- 420px 이하 activity rail은 두 줄 구조로 바꿔 주요 섹션 버튼이 가로 스크롤에 숨지 않게 했다.
- 반복 버튼, Explorer, source toolbar, titlebar/search/select 입력을 44px 이상 target 기준으로 맞췄다.
- `globals.css`에 typography scale token을 추가하고, 모든 직접 숫자 기반 `font-size` 선언을 token 참조로 바꿨다.
- 앱 내부 `<small>` 기본값을 11px small token으로 고정해 브라우저 기본 축소로 11px 미만 텍스트가 생기지 않게 했다.
- `Pretendard GOV`/`Pretendard`/`Noto Sans KR` 우선 fallback stack을 적용하고, 기본 `<small>`은 12px caption이 아니라 11px small token으로 낮췄다.

## 산출물

- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- 스펙: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-responsive-workflow-layout/`
- 구현: `app/globals.css`, `components/MonitorShell.tsx`, `components/SnapshotLoader.tsx`
- 검증: `_history/evaluations/2026/2026-06-05-non-fullscreen-layout-evaluation-input.json`
- Typography 검증: `_history/evaluations/2026/2026-06-05-typography-scale-evaluation-input.json`

## 검증 요약

- `workspace-monitor check/test/build/build:customer/perf:budget`: 통과
- `platform-desktop-app test/check`: 통과
- 정적 export Playwright audit: 5개 섹션 x 5개 viewport, failures 없음
- 정적 export Playwright typography audit: 5개 섹션 x 5개 viewport, failures 없음
- in-app Browser readable font smoke: 390x844에서 새 font stack 적용, small sample 11px, overflow 0

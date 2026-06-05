# 스펙: MonitorShell 근본 boundary 재검토

## 목표

Workspace Monitor의 남은 근본 병목을 “큰 Shell client module”로 식별하고, 첫 구조 개선으로 Tool Studio를 실제 dynamic chunk boundary로 분리한다.

## 언어/런타임 선택

- 옵션 A: React/Next dynamic boundary. 현재 병목은 renderer JS 평가와 React tree 경계가 탭 구조와 맞지 않는 것이므로 선택.
- 옵션 B: Rust/Tauri cache 추가. OS resource 활용은 유지하지만 Shell JS bundle 평가 비용을 줄이지 못해 이번 slice의 주 수단으로는 부족하다.
- 옵션 C: 전체 Shell route split. 가장 근본적이지만 한 번에 14k line을 분해해야 해 회귀 범위가 크므로 후속으로 둔다.

## 아키텍처 선택

- 옵션 A: 이미 별도 파일인 `ToolStudioPanel.tsx`부터 dynamic import로 분리한다. 변경 범위가 작고 chunk split 검증이 쉬워 선택.
- 옵션 B: `DesktopRuntimePanel`을 즉시 별도 파일로 추출한다. 영향 범위가 크고 native/runtime state가 많아 다음 slice로 둔다.
- 옵션 C: snapshot/data store를 별도 worker/SQLite로 옮긴다. 장기 후보지만 현재 탭 코드 평가 문제를 바로 줄이지 못한다.

## 설계

- `ToolStudioPanelProps`를 export한다.
- `MonitorShell.tsx`는 `ToolStudioPanel` runtime import를 제거하고 type-only import만 남긴다.
- `const ToolStudioPanel = dynamic<ToolStudioPanelProps>(...)`를 top-level에 둔다.
- 기존 `MemoizedToolStudioPanel = memo(ToolStudioPanel)` 경계는 유지한다.
- `preloadToolStudioPanel()`을 만들고 기존 idle work-surface prewarm에 연결한다.
- 테스트는 정적 import 금지가 아니라 dynamic boundary 존재와 props type export를 검증한다.

## 수용 기준

- `workspace-monitor test/check/build`가 통과한다.
- Tool Studio 문자열이 별도 chunk에 나타난다.
- `perf:sections`가 통과하고 resident/mounted panel count가 5 이하여야 한다.
- `perf:budget`이 통과한다.
- desktop app test/check와 `package:internal`이 통과한다.

## 근거

- React `memo`: https://react.dev/reference/react/memo
- React `<Profiler>`: https://react.dev/reference/react/Profiler
- Next.js Lazy Loading: https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading
- Next.js Bundle Analyzer: https://nextjs.org/docs/app/building-your-application/optimizing/bundle-analyzer
- web.dev Optimize INP: https://web.dev/articles/optimize-inp

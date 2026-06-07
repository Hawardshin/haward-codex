# 구현 계획

- 날짜: 2026-06-07
- 목표: `MonitorShell`에 남은 공통 로직과 표시 위젯을 별도 모듈로 이동해 큰 파일 부담과 중복을 줄인다.

## 단계

1. `MonitorShell`, `RuntimeTerminalDrawer`, `WorkspaceExplorerPane`의 중복 포맷/세션 판정 로직 확인.
2. `lib/runtimeDisplay.ts`에 런타임 표시, 세션 merge, 출력 이벤트, decision grouping 로직을 모은다.
3. `components/features/MonitorSummaryWidgets.tsx`에 메트릭, 히스토리 차트, 문서 목록, 에이전트 흐름 위젯을 옮긴다.
4. readiness source map과 구조 테스트를 새 모듈 경계 기준으로 갱신한다.
5. TypeScript, 단위 테스트, readiness, 패키징으로 검증한다.

## 결정

- `DesktopRuntimePanel` 전체 이동은 이번 슬라이스에서 보류했다. 의존 타입과 로컬 상태가 커서 먼저 순수 로직을 공통화하는 편이 더 안전하다.
- `formatBytes`, `formatDuration`, `isActiveSessionStatus`는 터미널 드로어와 탐색기도 같은 파일에서 가져오도록 했다.


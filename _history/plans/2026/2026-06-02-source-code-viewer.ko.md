# Source Code Viewer 계획

## 요청 요약

설치형/모니터링 프로그램에서 소스 코드도 볼 수 있게 해 달라는 요청.

## 작업 모드

- `governance`

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-source-code-viewer.ko.md`
- 조사 메모: `_research/topics/workspace-monitor/2026-06-02-source-code-viewer.ko.md`
- 내부 기준:
  - `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
  - `agent-platform/configs/access/view-mode-registry.json`
  - `platform-desktop-app/configs/user-flow-registry.json`

## 계획

1. source viewer 구현 옵션을 비교한다.
2. dependency 없는 읽기 전용 viewer를 선택한다.
3. source root allowlist 기반 `sourceFiles` snapshot을 만든다.
4. Developer/Superadmin view mode에 `source` 섹션을 추가한다.
5. Workspace Monitor에 Source 탭과 필터/코드 뷰어를 추가한다.
6. 요구사항, 스펙, 히스토리, 평가를 갱신한다.
7. 테스트, 타입 검사, 빌드, workspace health, evaluator로 검증한다.

## 결정

- 소스 코드는 읽기 전용으로만 표시한다.
- public 배포 전 `sourceFiles` snapshot 범위를 검토해야 한다.
- Monaco/Shiki는 편집/고급 하이라이팅 요구가 생길 때 후속으로 검토한다.

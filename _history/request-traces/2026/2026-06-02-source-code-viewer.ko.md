# 요청-결과 추적: Source Code Viewer

## 요청

- 설치형/모니터링 프로그램에서 소스 코드도 볼 수 있게 해 달라고 요청했다.

## 결과

- Workspace Monitor snapshot에 `sourceFiles` catalog를 추가했다.
- Developer/Superadmin view mode에서만 `Source` 탭을 볼 수 있게 했다.
- Source 탭에서 프로젝트, 언어, 검색 필터와 읽기 전용 코드 뷰어를 제공했다.
- public 배포 전 `sourceFiles`를 검토해야 한다는 안내를 README에 추가했다.

## 산출물

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `agent-platform/configs/access/view-mode-registry.json`
- `workspace-monitor/specs/2026-06-02-source-code-viewer/`
- `_history/web-searches/2026/2026-06-02-source-code-viewer.ko.md`

## 검증

- 검증 결과는 `_history/evaluations/2026/2026-06-02-source-code-viewer.ko.md`에 기록한다.

## 커밋

- close-out 후 final response에 기록한다.

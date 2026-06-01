# 평가: Source Code Viewer

## 결과

- 상태: `ready_to_close`
- 재작업 필요: 없음
- 작업 모드: `governance`

## 요청 대비 결과

- 요청: 설치형/모니터링 플랫폼에서 소스 코드도 볼 수 있게 한다.
- 결과: Workspace Monitor에 읽기 전용 `Source` 섹션을 추가했다.
- `sourceFiles` snapshot을 생성하고 프로젝트/언어 필터, 파일 목록, 코드 본문 뷰어를 제공한다.
- `user` view에는 Source 섹션이 없고, `developer`와 `superadmin_developer` view에서만 보이도록 view mode registry를 갱신했다.
- platform desktop user flow 문서와 설정에도 개발자/슈퍼어드민용 소스 코드 탐색 흐름을 반영했다.

## 검증

- `check-omissions`: `coverage_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`
- `check-view-modes`: 통과
- `workspace-monitor` 테스트/수집/타입 검사/빌드: 통과
- `agent-platform` 단위 테스트: 통과
- snapshot smoke check: `sourceFiles`와 view mode별 Source 섹션 노출 확인

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-source-code-viewer.ko.md`
- 조사 메모: `_research/topics/workspace-monitor/2026-06-02-source-code-viewer.ko.md`
- 스펙: `workspace-monitor/specs/2026-06-02-source-code-viewer/`
- 요청 추적: `_history/request-traces/2026/2026-06-02-source-code-viewer.ko.md`
- 작업 시간 기록: `_history/work-timings/2026/2026-06-02-source-code-viewer.json`

## 한계와 후속

- Source 섹션은 편집, 저장, diff, 실행 기능이 없는 읽기 전용 뷰어다.
- public 배포 전에는 `sourceFiles`를 제외하거나 제한하는 public/private snapshot profile을 추가해야 한다.
- 현재는 Shiki/Monaco를 설치하지 않았다. 코드 탐색이 핵심 기능으로 커지면 syntax highlighting 또는 read-only editor 도입을 다시 검토한다.
- Browser/Playwright 화면 검증은 이번 세션에서 사용 가능한 도구/프로젝트 의존성이 없어 실행하지 않았고, 정적 빌드와 데이터 smoke check로 대체했다.

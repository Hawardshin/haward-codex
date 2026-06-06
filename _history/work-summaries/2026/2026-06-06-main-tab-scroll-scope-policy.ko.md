# 작업 요약: Main Tab Scroll Scope Policy

날짜: 2026-06-06

## 완료

- main tab/page 전체를 기본 scroll owner로 두지 않는 지속 UI 원칙을 추가했다.
- code, terminal/log, 긴 목록, popup/dialog/flyout, inspector 같은 bounded child surface는 허용 scroll 영역으로 명명했다.
- UI tone policy와 memory bootstrap anchor를 갱신했다.
- `workspace-monitor` scroll contract checker에 `.desktop-viewport`와 `.mounted-section-panel` 회귀 방지 패턴을 추가했다.

## 검증

- docs audit 통과.
- memory bootstrap과 config contract 통과.
- workspace-monitor check 통과, `checkedMainTabScrollOwners: 2`.
- workspace-monitor test 78개 통과.
- workspace-monitor collect 통과, 650 inline documents와 2632 admin history records snapshot 생성.
- workspace-monitor build 통과.
- `git diff --check` 통과.

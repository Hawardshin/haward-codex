# 계획: Workspace Monitor 앱형 Command Controls

## 요청 요약

사용자는 실제 앱처럼 다양한 기능을 써서 만들라고 요청했다.

## 선택한 범위

- `workspace-monitor/` UI 상호작용을 소유 범위로 둔다.
- 전역 command palette, pinned sections, recent sections를 추가한다.
- 새 패키지 설치, 서버 저장소, 원격 사용자 설정 저장은 하지 않는다.

## 결정

- command palette는 section/view/language/category/quick action을 하나의 검색 실행면으로 묶는다.
- pinned sections는 localStorage에 저장하고, recent sections는 session state로 유지한다.
- keyboard listener는 cleanup을 명확히 한다.
- 고객 snapshot 경계는 기존 build/customer 검증으로 다시 확인한다.

## 검증 계획

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app run monitor:build`
- resource guard equivalent check for keyboard listener/localStorage lifecycle

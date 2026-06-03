# 작업 요약: IntelliJ식 실행 작업대

## 변경

- Desktop Runtime 상단에 IDE식 Run Configuration, Services, Problems, status bar 패널을 추가했다.
- 검색 에이전트 채팅, CLI 세션, task pipe, readiness 점검을 실행 구성 카드로 연결했다.
- Services는 runtime/workspace/adapters/providers/sessions를 보여준다.
- Problems는 오류, 누락 CLI, provider 미설정, decision inbox, dirty drafts, release blockers를 조치 가능한 행으로 보여준다.
- 제품/사용자 흐름/레퍼런스 레지스트리와 readiness script를 업데이트했다.

## 의도

긴 웹 대시보드를 먼저 보여주는 구조에서 벗어나, 사용자가 “무엇을 실행할 수 있고 무엇이 막고 있는지”를 데스크톱 IDE처럼 즉시 알 수 있게 한다.

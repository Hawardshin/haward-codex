# Spec: Nested Pane Navigation Usability

## 목표

긴 탭 하나가 다시 긴 scroll 목록이 되는 문제를 줄이기 위해, 탭 내부에 secondary navigation과 view switcher를 추가한다.

## 범위

- Settings dialog: `settings-subsection-rail`
- Source workbench: `source-workbench-switcher`
- Runtime terminal drawer: `terminal-view-switcher`
- Readiness guard: source token과 CSS token 검사

## 수용 기준

- 설정 대분류 탭 아래에 하위 섹션 버튼이 표시된다.
- 설정의 `초기화` 탭은 한 번에 하나의 하위 섹션만 보여준다.
- 소스 workbench는 `파일`, `편집`, `저장 결과` view를 전환한다.
- 파일을 열면 자동으로 `편집` view가 활성화된다.
- 저장하면 자동으로 `저장 결과` view가 활성화된다.
- 터미널 drawer는 `시작`, `세션`, `출력`, `이벤트` view를 전환한다.
- 세션 Inspect는 출력 view로 이동한다.
- TypeScript, readiness, test, customer build가 통과한다.

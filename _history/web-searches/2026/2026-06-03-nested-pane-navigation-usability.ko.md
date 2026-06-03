# Web Search: Nested Pane Navigation Usability

- 날짜: 2026-06-03
- 요청 ID: `UR-2026-06-03-052`
- 작업: 긴 탭 내부를 다시 클릭 가능한 하위 섹션/view로 분할해 scroll 부담을 줄이는 desktop UX 개선

## Queries

- `desktop app settings long page navigation sections tabs sidebar UX Microsoft Fluent settings navigation`
- `Apple Human Interface Guidelines macOS settings navigation sidebar tabs disclosure groups`
- `MDN details summary disclosure element accessibility long content`

## Sources Checked

- Apple Developer Documentation, Tab bars: 복잡한 앱에서는 탭 내부 hierarchy가 깊을 때 sidebar 같은 secondary navigation을 고려할 수 있다는 점을 확인했다.
- Microsoft Learn, Guidelines for app settings: desktop 설정 surface에서 설정 항목을 적절한 page/section으로 나누는 기준을 확인했다.
- Microsoft Learn, NavigationView: hierarchical navigation에서 선택 항목이 details section을 바꾸는 구조를 확인했다.
- MDN, `<details>` element: 긴 content를 disclosure widget으로 접고 펼치는 기본 semantic pattern을 확인했다.

## Plan Impact

- 설정 dialog 대분류 탭 안에 `settings-subsection-rail`을 추가해 한 탭 안에서 다시 하위 섹션을 클릭 전환한다.
- 파일/코드 workbench는 `파일`, `편집`, `저장 결과` view switcher를 둔다.
- 터미널 drawer는 `시작`, `세션`, `출력`, `이벤트` view switcher를 둔다.
- 긴 scroll을 완전히 없애기보다는 사용자의 현재 목적에 맞게 view를 좁히고, 필요한 pane만 독립 스크롤되게 한다.

## Uncertainty

- 실제 runtime session과 source file open 상태는 정적 preview만으로 완전히 재현하기 어렵다. source/readiness 검사와 browser smoke를 함께 사용한다.

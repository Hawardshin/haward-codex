# 웹 검색 기록: responsive workflow layout

- 날짜: 2026-06-05
- 요청: 전체 화면에서만 버튼 위치가 맞고, 모든 것을 한 화면에 담으려 해 사용자가 힘든 UI 개선
- 쿼리:
  - `responsive dashboard design avoid cramming everything into one screen progressive disclosure usability official`
  - `Nielsen Norman Group progressive disclosure complex interface usability dashboard`
  - `WCAG reflow responsive layout horizontal scrolling controls official`

## 확인한 기준

- W3C WCAG Reflow 이해 문서는 작은 viewport나 확대 환경에서 일반 콘텐츠가 재배치되어야 하며, 특정 2차원 작업 영역만 독립 스크롤 예외가 될 수 있다고 설명한다. <https://www.w3.org/WAI/WCAG22/Understanding/reflow>
- web.dev responsive UI patterns는 화면 크기에 맞게 유연하게 적응하고, 복잡한 UI는 progressive disclosure로 단계적으로 노출하는 방식을 설명한다. <https://web.dev/learn/design/ui-patterns/>
- WCAG 1.4.10 관련 접근성 자료들은 양방향 스크롤을 일반 레이아웃에 강요하지 않는 reflow를 강조한다. <https://appt.org/en/guidelines/wcag/success-criterion-1-4-10>

## 계획 반영

- app shell의 고정 `100dvh` 내부 스크롤 계약을 자연스러운 페이지 reflow로 바꾼다.
- 홈 화면의 secondary 정보는 기본 접힘으로 이동한다.
- 핵심 작업 버튼과 상태만 첫 화면에 남긴다.

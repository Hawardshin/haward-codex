# Web Search: Provider 버튼 오류 상태

- 날짜: 2026-06-06
- 작업: Provider 설정 오류를 레이아웃을 밀지 않는 버튼 내부 상태로 표시

## 질의

- `button error state avoid layout shift UX guidance`
- `WCAG error identification button status aria live avoid layout shift`
- `MDN aria-live status button error message`

## 확인한 출처

- WCAG 2.2 Understanding Success Criterion 3.3.1 Error Identification: https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html
- MDN ARIA `aria-live`: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live
- MDN ARIA `status` role: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role

## 구현 영향

- 오류는 사용자가 누른 control에 직접 연결되는 시각 상태로 표시한다.
- 보이는 문단형 오류가 레이아웃을 밀지 않도록 hidden live region을 사용하되, 상태 변경은 `role=status` 또는 오류 시 `role=alert`로 전달한다.
- 버튼 badge는 절대 위치로 올리고, 공간은 평상시부터 예약해 오류 발생 시 버튼 크기가 변하지 않게 한다.

## 불확실성

- 전체 앱의 모든 오류 표시 패턴은 이번 scope가 아니다. 이번 기록은 provider account 설정 패널의 action feedback에 한정한다.

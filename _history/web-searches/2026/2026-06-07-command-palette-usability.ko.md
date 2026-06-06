# Web Search: Command Palette Usability

날짜: 2026-06-07

## 검색

- `WCAG 2.2 official target size focus visible user interface components usability`
- `Microsoft Fluent UI official command palette search empty state usability`
- `VS Code official docs chat extensions followup buttons user experience`
- `Apple Human Interface Guidelines official buttons feedback progressive disclosure macOS app`

## 확인한 출처

- W3C WCAG 2.2 Understanding, Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- W3C WCAG 2.2 Understanding, Focus Visible: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
- Microsoft Fluent 2 Searchbox usage: https://fluent2.microsoft.design/components/web/react/core/searchbox/usage
- Microsoft Fluent 2 Wait UX: https://fluent2.microsoft.design/wait-ux
- VS Code Chat Participant API: https://code.visualstudio.com/api/extension-guides/ai/chat

## 적용 판단

- W3C Target Size는 추천 명령 버튼을 작은 텍스트 링크가 아니라 조작 가능한 버튼으로 유지하는 근거가 됐다.
- W3C Focus Visible은 기존 `Button` primitive와 포커스 가능한 button 요소를 유지하는 근거가 됐다.
- Fluent Searchbox는 검색 입력이 habitual topics와 unfamiliar topics 양쪽을 빠르게 접근하게 해야 한다는 판단에 사용했다.
- Fluent Wait UX의 `role="status"` 권고는 결과 수 변경을 보조기기에 알리는 방향에 사용했다.
- VS Code Chat Participant API는 follow-up과 command-driven agent flow를 참고했지만, 이번 slice에는 새 chat API를 추가하지 않았다.

## 약한 출처/미사용

- Apple HIG buttons 페이지는 이 환경에서 충분한 본문을 확보하지 못해 구현 근거로 사용하지 않았다.

## 불확실성

- Browser smoke는 renderer fallback DOM과 interaction만 검증한다. packaged Tauri의 native permission, secret store, 배포 artifact는 이번 범위가 아니다.

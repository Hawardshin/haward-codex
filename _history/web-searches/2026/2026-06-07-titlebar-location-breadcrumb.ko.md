# Web Search: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 검색

- `Nielsen Norman Group usability heuristics visibility system status recognition rather than recall breadcrumbs official`
- `W3C WAI breadcrumb navigation pattern current page aria-current official`
- `Microsoft Fluent 2 navigation breadcrumb command design guidance official`
- `Apple Human Interface Guidelines feedback navigation user orientation official`

## 확인한 출처

- W3C WAI-ARIA APG Breadcrumb Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
- W3C Technique G65, Providing a breadcrumb trail: https://www.w3.org/WAI/WCAG22/Techniques/general/G65
- Microsoft Learn BreadcrumbBar guidance: https://learn.microsoft.com/en-us/windows/apps/design/controls/breadcrumbbar
- Microsoft Fluent 2 Accessibility: https://fluent2.microsoft.design/accessibility
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines

## 적용 판단

- WAI-ARIA APG는 breadcrumb를 navigation landmark와 current page state로 표현하는 근거가 됐다.
- W3C G65는 사용자가 구조와 현재 위치를 시각화하도록 breadcrumb를 쓰는 근거가 됐다.
- Microsoft BreadcrumbBar guidance는 너무 얕은 구조에는 breadcrumb를 과용하지 말라는 주의를 남겼다. 이번 앱은 홈, 기능 그룹, 섹션의 3단계 맥락이 있어 적용했다.
- Fluent Accessibility는 heading/navigation이 스캔 효율을 높여야 한다는 판단에 참고했다.
- Apple HIG는 포괄 페이지만 확인했고, 구체 구현 근거로는 W3C와 Microsoft 자료를 우선했다.

## 불확실성

- Browser smoke는 renderer fallback에서 DOM/interaction을 확인한다. packaged Tauri titlebar drag behavior는 정적 CSS contract와 renderer interaction으로 간접 검증한다.

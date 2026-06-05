# 웹 검색 기록: Operator Surface Scroll QA

## 질의

- `WCAG 2.2 target size minimum official 2.5.8`
- `web.dev Interaction to Next Paint optimize long tasks official`
- `Radix UI Dropdown Menu accessibility official documentation`
- `Apple Human Interface Guidelines text buttons menus macOS official`

## 확인한 출처

- web.dev, Optimize INP: https://web.dev/articles/optimize-inp
- web.dev, Optimize long tasks: https://web.dev/articles/optimize-long-tasks
- W3C/WCAG 2.2, Target Size Minimum: https://www.w3.org/TR/WCAG22/#target-size-minimum
- Radix UI Dropdown Menu: https://www.radix-ui.com/primitives/docs/components/dropdown-menu
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/

## 계획 영향

- 버튼뿐 아니라 `summary` 같은 disclosure도 클릭 타깃으로 보고 최소 높이를 검증한다.
- interaction audit는 primary tab만이 아니라 Operator Center 내부 섹션까지 포함한다.
- 긴 history 목록은 페이지 전체를 길게 만드는 대신 bounded scroll pane으로 분리한다.

## 불확실성

- 공식 기준은 최소 타깃과 반응성 원칙을 제공한다. 실제 화면별 합격 여부는 Playwright surface audit로 확인했다.

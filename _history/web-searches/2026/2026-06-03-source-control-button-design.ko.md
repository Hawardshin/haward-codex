# Web Search: Source Control Button Design

## Queries

- `Fluent 2 toolbar button design compact command bar desktop app icons labels`
- `Carbon Design System toolbar button icon button desktop UI guidance`
- `Atlassian design system buttons icon buttons toolbar usage guidance`
- `site:atlassian.design components button usage icon button Atlassian Design System`

## Checked Sources

- Microsoft Fluent 2 Toolbar usage: https://fluent2.microsoft.design/components/web/react/core/toolbar/usage
- IBM Carbon Button usage/style: https://carbondesignsystem.com/components/button/usage/
- IBM Carbon Text toolbar pattern: https://carbondesignsystem.com/patterns/text-toolbar-pattern/
- Atlassian Design System Button: https://atlassian.design/components/button/
- Atlassian Design System Icon button: https://atlassian.design/components/button/icon-button/

## Plan Impact

- 파일 열기, 저장, 복사처럼 결과가 큰 액션은 primary/secondary action button으로 분리했다.
- Undo, Find, Diff, Fold처럼 반복되는 편집 명령은 compact toolbar button으로 묶었다.
- 파일 목록은 일반 버튼이 아니라 selectable file row처럼 보이게 했다.
- 좁은 desktop 폭에서는 버튼을 억지로 한 줄에 유지하지 않고 workbench 자체를 stack으로 전환했다.

## Weak Sources Ignored

- Reddit, 블로그, 비공식 디자인 팁은 discovery signal로만 보고 구현 근거에는 포함하지 않았다.

## Uncertainty

- 현재 구현은 CSS token/class 기반 polish이며, 전체 버튼 컴포넌트 추출은 별도 구조 리팩터링 범위로 남긴다.

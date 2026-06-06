# Web Search: Main Tab Scroll Scope Policy

날짜: 2026-06-06

## Queries

- `Apple Human Interface Guidelines Scrolling macOS scroll views`
- `Microsoft Fluent UI scroll controls guidance scroll containers`
- `Baymard nested scrolling usability issue`

## 확인한 출처

- Apple Human Interface Guidelines, Scroll Views: https://developer.apple.com/design/human-interface-guidelines/scroll-views
- Microsoft Learn, Scroll viewer controls: https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/scroll-controls
- Baymard, Avoid Inline Scroll Areas: https://baymard.com/blog/inline-scroll-areas

## 판단

- Apple HIG는 같은 방향 scroll view 중첩이 예측하기 어렵고 조작하기 어려운 interface를 만들 수 있다고 설명한다.
- Microsoft 문서는 scroll viewer를 넘치는 content를 담는 control로 다루므로, 전체 tab보다 특정 child pane에 scroll ownership을 두는 쪽이 명확하다.
- Baymard는 inline/nested scroll area가 사용자가 인지하고 조작하기 어려운 pattern이 될 수 있다고 경고한다.

## 구현 영향

- main tab/page 전체를 기본 scroll owner로 두지 않는 durable UI rule을 추가했다.
- scroll이 필요한 code, terminal/log, 긴 목록, popup/dialog/flyout, inspector는 bounded child surface로 허용했다.
- `workspace-monitor`의 scroll contract checker에 `.desktop-viewport`와 `.mounted-section-panel` 금지 패턴을 추가했다.

## 불확실성

- 이번 작업은 새 화면을 렌더링하지 않는 정책/검증기 변경이다. 시각 smoke보다 문서 audit, config contract, renderer static checks를 우선한다.

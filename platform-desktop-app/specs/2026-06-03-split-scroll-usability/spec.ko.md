# Spec: Split Scroll Usability

## 목표

Workspace Monitor renderer의 주요 데스크톱 workbench surface를 긴 웹 페이지가 아니라 독립 스크롤 pane을 가진 desktop split layout으로 개선한다.

## 구현 원칙

- CSS Grid/Flex scroll container는 `min-height: 0`과 `minmax(0, 1fr)`를 명시한다.
- 실제 스크롤되는 pane에만 `overflow: auto`를 둔다.
- scroll pane에는 `overscroll-behavior: contain`과 `scrollbar-gutter: stable`을 적용해 중첩 스크롤 흔들림을 줄인다.
- 키보드 사용자를 위해 주요 scroll pane에 `tabIndex={0}`와 aria label을 둔다.
- 최상위 앱 shell은 내부 viewport가 스크롤 책임을 가질 수 있게 `min-height: 0`과 dynamic viewport height를 사용하고, 작은 창에서 고정 `min-height`로 콘텐츠를 숨기지 않는다.
- 모바일에서는 고정 split height를 해제해 자연스러운 page scroll로 전환한다.

## 수용 기준

- 파일/코드 shell은 `height: calc(100vh - 148px)` 안에서 Explorer tree와 editor frame이 각각 스크롤된다.
- 터미널 drawer는 `overflow: hidden`이고 session list/output/event rail이 각각 스크롤된다.
- settings dialog는 dialog body를 grid로 나누고 settings tab panel만 스크롤한다.
- desktop app shell과 desktop viewport에는 중첩 `100vh`, `min-height: 720px`, scroll-host 없는 `overflow: hidden`이 재도입되지 않는다.
- Browser smoke에서 settings/source/terminal scroll containers가 존재하고 `overflowY`가 `auto` 또는 `scroll`이다.

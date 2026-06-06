# Spec: Popup Scroll Clipping

## 목표
스크롤 pane 안쪽이나 화면 하단 근처에서 열린 메뉴가 잘리거나 화면 밖으로 사라지는 현상을 줄인다.

## 설계
- 기존 Radix `DropdownMenu.Portal` / `ContextMenu.Portal`을 유지한다.
- `--popup-layer-z`, `--popup-viewport-gap`, `--popup-max-block-size`, `--popup-shadow` 토큰을 추가한다.
- `app-choice-menu`, `source-file-picker-menu`, `tool-menu-content`, `tool-context-content`는 Radix available-height CSS 변수를 통해 최대 높이를 viewport 안쪽으로 제한한다.
- 팝업 content는 `overflow:auto`, `overscroll-behavior: contain`, `scrollbar-gutter: stable`을 갖는다.
- 관련 `DropdownMenu.Content`와 `ContextMenu.Content`는 `collisionPadding={16}`을 명시한다.

## 비목표
- 전체 데스크톱 레이아웃 재편.
- 새 floating UI dependency 추가.
- native select 복귀.

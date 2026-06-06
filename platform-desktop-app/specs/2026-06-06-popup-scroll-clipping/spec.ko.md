# Spec: Popup Scroll Clipping

## 목표
스크롤 pane 안쪽이나 화면 하단 근처에서 열린 메뉴가 잘리거나 화면 밖으로 사라지는 현상을 줄인다.

## 설계
- 기존 Radix `DropdownMenu.Portal` / `ContextMenu.Portal`을 유지한다.
- `--popup-layer-z`, `--popup-viewport-gap`, `--popup-max-block-size`, `--popup-shadow` 토큰을 추가한다.
- `app-choice-menu`, `source-file-picker-menu`, `tool-menu-content`, `tool-context-content`는 Radix available-height CSS 변수를 통해 최대 높이를 viewport 안쪽으로 제한한다.
- 팝업 content는 `overflow:auto`, `overscroll-behavior: contain`, `scrollbar-gutter: stable`을 갖는다.
- 관련 `DropdownMenu.Content`와 `ContextMenu.Content`는 `collisionPadding={16}`을 명시한다.

## 2026-06-06 후속 오버레이 설계
- `ViewportOverlayPortal`은 명령 팔레트, 설정 모달, 운영 센터를 `.desktop-app-root` 아래로 portal 처리한다. `body`가 아니라 앱 root를 대상으로 삼아 theme token 상속은 유지하고, `desktop-viewport`의 animation/containing block에서는 벗어난다.
- `RuntimeTerminalDrawer`도 같은 root portal을 사용한다. 닫힌 상태는 `visibility:hidden`, `pointer-events:none`, `aria-hidden=true`로 남기고, 열린 상태는 `role="dialog"`, `aria-modal=true`, `tabIndex=-1`을 가진다.
- `useOverlayFocus`는 공통 focus containment hook이다. 열릴 때 initial focus를 적용하고, `Tab` 순환, `Escape` 닫기, 닫힌 뒤 focus restore를 담당한다.
- z-index는 `--overlay-dialog-z`, `--overlay-drawer-backdrop-z`, `--overlay-drawer-z`, `--overlay-command-palette-z`, `--popup-layer-z` 순서로 명시한다.
- 터미널 drawer는 portal 이동 뒤 CSS transition 시작값이 남는 브라우저 상태를 피하기 위해 open 상태에서 위치/가시성 style을 명시하고 transition을 끈다.

## 비목표
- 전체 데스크톱 레이아웃 재편.
- 새 floating UI dependency 추가.
- native select 복귀.

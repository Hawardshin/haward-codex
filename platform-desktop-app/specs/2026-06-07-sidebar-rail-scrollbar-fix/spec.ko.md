# Spec: Sidebar Rail Scrollbar Fix

날짜: 2026-06-07

## 문제

기본 1280x720 viewport에서 `.activity-rail nav`가 `scrollbar-gutter: stable`을 상속받아 nav `clientWidth`가 48px로 줄고, 58px nav button이 가용 폭을 넘어 가로 스크롤 조건이 생겼다.

## 설계

- `.activity-rail nav`는 `width: 100%`, `min-width: 0`, `overflow-x: hidden`, `overflow-y: auto`, `scrollbar-gutter: auto`를 가진다.
- collapsed nav button은 `box-sizing: border-box`와 `width: min(100%, 58px)`로 컨테이너 폭 안에 들어간다.
- expanded nav button은 `width: 100%`로 expanded rail 트랙 안에서 라벨 폭을 유지한다.
- 테스트는 CSS contract를 고정한다.

## 수용 기준

- 기본 1280x720에서 `navScrollWidth <= navClientWidth`.
- 짧은 1280x520에서 세로 overflow는 허용하지만 `navScrollWidth <= navClientWidth`.
- `documentElement.scrollWidth`가 viewport width를 넘지 않는다.
- renderer check/test/build와 platform check가 통과한다.

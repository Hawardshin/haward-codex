# 데스크톱 크롬 디자인 개선 스펙

## 목표

workspace-monitor의 핵심 데스크톱 표면을 더 제품적인 UI로 보이게 만든다. 핵심은 새 화면을 추가하는 것이 아니라 기존 공통 CSS 계약을 강화해 레일, 상단바, 섹션 탭, 패널, 버튼이 같은 디자인 언어를 갖게 하는 것이다.

## 변경 대상

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 구현 계약

- 새 토큰:
  - `--chrome-shadow`
  - `--rail-shadow`
  - `--control-press-shadow`
  - `--section-tab-shadow`
  - `--section-tab-active-shadow`
  - `--surface-edge-highlight`
- 레일:
  - active와 `aria-current="page"` 상태는 같은 selected 스타일을 공유한다.
  - nav button은 pseudo indicator를 통해 현재 위치를 표시한다.
- 상단바:
  - sticky titlebar는 chrome shadow를 사용해 작업면과 분리된다.
- 섹션 탭:
  - tab group active 상태는 상단 accent indicator를 가진다.
  - tab과 panel heading button은 `--choice-bg`와 section tab shadow를 사용한다.
  - active tab은 `--choice-selected-bg`와 active shadow를 사용한다.
- 패널:
  - 기본 `.panel`은 hierarchy border, depth surface, edge highlight를 사용한다.
- 테마:
  - dark와 system-dark 경로 모두에서 새 토큰과 choice/search 토큰이 정의된다.

## 수용 기준

- 정적 테스트가 새 토큰과 주요 selector 계약을 검증한다.
- 빌드 결과에서 hydration/build 오류가 없어야 한다.
- Browser smoke에서 기본 화면, 레일, 탭 표면이 렌더되어야 한다.

# Spec: Button Text Wrapping

## 목표
버튼 텍스트가 줄바꿈되면서 버튼 높이와 레이아웃이 흔들리는 문제를 줄이고, 데스크톱 앱답게 액션 버튼은 한 줄로 예측 가능하게 유지한다.

## 설계
- CSS token:
  - `--button-label-max-inline-size`
  - `--button-compact-label-max-inline-size`
- 공용 버튼 라벨 계약:
  - `overflow: hidden`
  - `text-overflow: ellipsis`
  - `white-space: nowrap`
  - `overflow-wrap: normal`
- 적용 대상:
  - 공용 `ui-button`
  - 런타임 빠른 명령/프리셋 버튼
  - CLI 명령 복사 버튼
  - provider model chip
  - source command toolbar/settings/editor action buttons
  - command palette result text
  - 주요 action row/tool action buttons
- 본문과 긴 경로/코드는 기존 wrap 정책을 유지한다.

## 비목표
- 모든 설명 카드의 본문 텍스트를 한 줄로 강제하지 않는다.
- 버튼 copy나 정보 구조를 대규모로 바꾸지 않는다.
- 새 UI dependency를 도입하지 않는다.

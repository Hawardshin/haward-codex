# 2026-06-05 Overview Task-First UI 계획

## 목표

Overview 첫 화면에서 사용자가 할 일을 먼저 고르고, 상태 숫자와 운영 보조는 뒤로 물러나게 한다.

## 작업

- Overview에서는 `titlebar-context-strip`, `operator-strip`, `desktop-toolbar`를 렌더하지 않는다.
- 홈 패널 내부 순서를 `taskIntentItems` 카드, `core-home-status-row` 순서로 바꾼다.
- 정적 테스트로 render order와 Overview 보조 strip 제거 계약을 고정한다.
- 1280px/390px screenshot smoke로 수평 overflow와 첫 목표 카드 위치를 확인한다.

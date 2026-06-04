# 2026-06-05 Easy Flow UX 계획

## 목표

Overview 목표 카드 선택 후 대상 화면에서 사용자가 현재 목표의 진행 순서를 바로 이해하게 한다.

## 작업

- `TaskIntentItem`에 목표별 짧은 단계 목록을 추가한다.
- 대상 화면 handoff strip 안에 순서형 task flow rail을 표시한다.
- desktop은 3열, mobile은 1열로 흐름을 배치한다.
- 정적 테스트와 click-through smoke로 overflow와 표시 상태를 검증한다.

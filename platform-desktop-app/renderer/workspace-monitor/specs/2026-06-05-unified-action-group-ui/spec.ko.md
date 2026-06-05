# Unified Action Group UI 스펙

## 요구사항

- REQ-WM-067: 반복 액션 묶음은 화면마다 임의 flex/div 구조를 새로 만들지 않고 공통 ActionGroup primitive로 정렬, 간격, wrap, role, density를 통일해야 한다.

## 사용자 결과

- 사용자는 상단바, 작업 handoff, command palette, Tool Studio에서 같은 버튼 크기와 간격, 같은 정렬 규칙을 경험한다.
- 좁은 화면에서는 액션 묶음이 부모 폭을 채우고 버튼이 줄바꿈으로 깨지지 않는다.
- 보조 액션과 primary action은 Button primitive 위에서 같은 hover/focus/pressed 상태를 공유한다.

## 설계 결정

- 새 패키지를 설치하지 않고 기존 `class-variance-authority` 기반으로 `ActionGroup` primitive를 만든다.
- `ActionGroup`은 align, density, direction, wrap variant와 `group`/`toolbar` role 선택을 제공한다.
- 대표 migration 범위는 titlebar, task handoff, command palette, Tool Studio action cluster로 제한한다.

## 비목표

- 모든 섹션의 모든 버튼 묶음을 한 번에 전면 migration
- 새 디자인 시스템 패키지 도입
- 기능 실행 로직 또는 snapshot 생성 로직 변경
- 기존 생성 snapshot 파일 정리

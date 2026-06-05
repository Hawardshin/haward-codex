# Spec: Native Select 교체

## 목표

Workspace Monitor에서 OS 기본 드롭다운처럼 보이는 선택 UI를 앱 고유 스타일의 선택 컨트롤로 바꾼다.

## 범위

- `MonitorShell.tsx`의 문서 필터, 기록 필터, Learning Loop 결정 컨트롤, Decision Inbox 답변 유형.
- 공통 CSS 선택 메뉴/버튼 그룹 스타일.
- 재발 방지 테스트.

## 비범위

- 공개 릴리스 signing/notarization 개선.
- 새로운 UI 라이브러리 추가.
- Provider 실행 로직 변경.

## 설계

- 짧은 선택지는 `AppChoiceButtonGroup`으로 표시한다.
- 긴 선택지는 기존 Radix dependency를 활용한 `AppChoiceMenu`로 표시한다.
- 선택 버튼은 `role="listbox"`와 `role="option"`을 사용하고, 현재 선택은 `aria-selected`로 노출한다.
- hover/open/active 상태는 `--choice-bg`, `--choice-bg-hover`, `--choice-active-shadow` 토큰을 사용한다.

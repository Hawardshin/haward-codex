# Spec: Sidebar Navigation Componentization

## 목표

`MonitorShell.tsx`의 좌측 활동 레일 렌더링을 `components/shell/DesktopActivityRail.tsx`로 분리해 `componentized_desktop_ui_architecture`의 첫 실행 가능한 조각을 구현한다.

## 설계

- 새 컴포넌트는 `"use client"` React 컴포넌트다.
- `DesktopActivityRail` props:
  - `language`
  - `activeSectionId`
  - `sections`
  - `onPrimeSection`
  - `onOpenSection`
  - `onOpenOperatorCenter`
  - `onOpenSettings`
- 섹션 item은 `id`, `label`, `shortLabel`, `icon`만 요구한다.
- 기존 `.activity-rail`, `.activity-brand`, `.activity-settings`, `data-section-id`, `aria-current` 계약을 유지한다.

## 수용 기준

- `MonitorShell`은 `<DesktopActivityRail ... />`을 사용한다.
- 새 컴포넌트 파일에 activity rail markup과 section button loop가 있다.
- 테스트/readiness가 새 파일을 읽어 componentization 토큰을 검증한다.
- renderer check/test/build와 desktop app check가 통과한다.

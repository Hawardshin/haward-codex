# 요구사항: Sidebar Navigation Componentization

- 날짜: 2026-06-07
- 상태: draft
- 소유 프로젝트: `platform-desktop-app`

## 배경

사용자는 미뤘던 구현을 계속 진행하라고 요청했다. 제품 gap 레지스트리에서 지금 로컬 구현으로 닫을 수 있는 남은 항목은 `componentized_desktop_ui_architecture` 구조 부채다.

## 요구사항

- `MonitorShell` 안에 직접 있던 좌측 활동 레일/사이드바 네비게이션 렌더링을 별도 컴포넌트로 분리한다.
- 분리된 컴포넌트는 현재 섹션, 고정 섹션 목록, 홈/섹션/운영센터/설정 액션을 props로 받아야 한다.
- UI 동작, 즉시 섹션 활성화, 접근성 label, 기존 CSS 클래스는 유지한다.
- 테스트와 readiness 검사에서 새 componentization 경계를 직접 확인한다.

## 비범위

- 공개 배포 signing/notarization/updater/clean-machine smoke는 외부 자산이 필요하므로 이번 작업에서 닫지 않는다.
- Settings dialog, DesktopRuntimePanel, SourceWorkbench 전체 분리는 후속 구조화 조각으로 남긴다.

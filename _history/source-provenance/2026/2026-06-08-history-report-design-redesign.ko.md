# 소스 근거 기록: 히스토리 보고 재디자인

## 외부 근거

- GitHub Desktop documentation: 데스크톱 Git 작업 흐름에서 변경 확인, 히스토리, 브랜치, PR 흐름을 사용자에게 시각적으로 연결하는 참고.
- Visual Studio Code UX Guidelines: 활동, 사이드바, 에디터, 패널 같은 워크벤치 영역 분리 참고.
- Apple Human Interface Guidelines: 데스크톱 앱의 예측 가능한 내비게이션과 리스트/상세 구조 참고.
- Microsoft Fluent 2 Design System: 조밀한 업무 UI에서 상태, 계층, 컴포넌트 일관성 참고.

## 내부 근거

- `platform-desktop-app/configs/product-domain-ownership-registry.json`
- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/features/MonitorSummaryWidgets.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/history/useAdminHistoryIndex.ts`
- `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`

## 구현 결정

- 날짜별 기록 목록은 삭제하지 않고 보고서 아래 근거 영역으로 유지했다.
- 새 화면 기준은 `history-report-design-registry.json`에 고정했다.
- 계산과 표시 로직은 `HistoryReportDesignPanel.tsx`로 분리하고 `MonitorShell.tsx`는 연결만 담당하게 했다.
- 테스트는 UI 토큰뿐 아니라 레지스트리의 구조 규칙과 보고 레인도 검증하게 했다.

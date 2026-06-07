# 소스 출처 기록: 섹션 딥링크 UX

## 로컬 소스

- `platform-desktop-app/renderer/workspace-monitor/components/SnapshotLoader.tsx`: URL에서 초기 섹션을 읽는 기존 진입점.
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`: 섹션 상태, view mode, 섹션 전환 실행 경로.
- `platform-desktop-app/renderer/workspace-monitor/lib/section-location.mjs`: 섹션 위치 파싱 유틸리티.
- `platform-desktop-app/renderer/workspace-monitor/tests/section-location.test.mjs`: 섹션 위치 유틸리티 회귀 테스트.

## 외부 참조

- Visual Studio Code UX Guidelines: 워크벤치 컨테이너와 활성 작업 맥락 구조.
- Microsoft Fluent Nav: 주요 앱 섹션 이동은 명확한 nav 링크로 제공해야 한다는 기준.
- WAI-ARIA APG: 탭/섹션 선택 상태 일관성 기준.

## 적용 방식

외부 참조는 구현 API가 아니라 제품 UX 원칙으로 사용했다. 실제 구현은 기존 로컬 구조를 유지하면서 섹션 주소와 화면 상태의 불일치를 줄이는 방향으로 제한했다.

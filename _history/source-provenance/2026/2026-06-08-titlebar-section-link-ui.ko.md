# 소스 출처 기록: 타이틀바 섹션 링크 UI

## 로컬 소스

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`: 공통 titlebar와 섹션 상태.
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`: titlebar, action, responsive layout 스타일.
- `platform-desktop-app/renderer/workspace-monitor/components/ui/Button.tsx`: 기존 버튼 primitive.
- `platform-desktop-app/renderer/workspace-monitor/components/ui/ActionGroup.tsx`: 기존 액션 그룹 primitive.
- `platform-desktop-app/renderer/workspace-monitor/lib/section-location.mjs`: 복구 가능한 섹션 href builder.
- `platform-desktop-app/renderer/workspace-monitor/lib/clipboard.mjs`: 클립보드 쓰기 유틸리티.

## 외부 참조

- Apple HIG Toolbars: toolbar는 현재 view의 command와 orientation을 제공한다.
- VS Code UX Guidelines: panel/editor toolbar action은 현재 view에 scoped된다.
- Microsoft desktop UX checklist: command labels, tooltip, clear action affordance는 UI 이해도를 높인다.

## 적용 방식

외부 참조는 세부 구현 API가 아니라 titlebar action placement 판단에 사용했다. 실제 구현은 기존 로컬 primitive와 section deep link 유틸리티를 재사용했다.

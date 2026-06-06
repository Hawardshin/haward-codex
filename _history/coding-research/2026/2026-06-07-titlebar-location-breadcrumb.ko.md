# Coding Research: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 기술 스택

- React + TypeScript renderer
- Next.js workspace-monitor
- CSS 전역 스타일
- Node test runner 기반 구조 테스트

## source_types

- official_accessibility_docs: WAI-ARIA APG Breadcrumb, W3C G65
- official_platform_docs: Microsoft BreadcrumbBar, Fluent Accessibility
- local_source: `MonitorShell.tsx`, `globals.css`, `tool-studio.test.mjs`

## language_options

- TypeScript/React: 현재 titlebar state와 UI 구현 언어이며 가장 작은 변경이다.
- Rust/Tauri: native chrome 제어에는 맞지만 현재 문제는 renderer 안의 위치 인식 UI라 과하다.

## selected_language

TypeScript/React + CSS.

## language_decision_notes

기존 `section`, `currentFeatureGroup`, `currentViewMode`, `openSection` state를 재사용할 수 있고 새 native 권한이 필요 없다.

## architecture_options

- Inline titlebar enhancement: 기존 titlebar 위치에 breadcrumb를 추가한다.
- New navigation component extraction: breadcrumb를 별도 component로 분리한다.

## architecture_decision_notes

이번 slice는 titlebar 전용이며 `MonitorShell` 내부 state에 의존한다. 별도 component는 같은 breadcrumb가 여러 표면에서 반복될 때 검토한다.

## folder_structure_options

- 기존 파일 수정만 수행.
- `components/ui/Breadcrumb.tsx` 같은 새 primitive 추가.

## folder_structure_decision_notes

새 shared primitive는 아직 재사용 근거가 부족하다. 기존 titlebar에 국한해 유지보수 표면을 줄인다.

## code_reference_sources

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## code_reference_notes

`primeSectionActivation("overview")`와 `openSection("overview")`는 활동 레일의 홈 버튼과 같은 lifecycle이다. breadcrumb home도 같은 경로를 사용해 이동 동작을 일관시켰다.

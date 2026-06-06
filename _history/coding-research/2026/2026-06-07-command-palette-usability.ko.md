# Coding Research: Command Palette Usability

날짜: 2026-06-07

## 기술 스택

- React + TypeScript renderer
- Next.js workspace-monitor
- CSS 전역 스타일
- Node test runner 기반 구조 테스트

## source_types

- official_accessibility_docs: W3C WCAG 2.2 Target Size, Focus Visible
- official_design_docs: Microsoft Fluent 2 Searchbox, Wait UX
- local_source: `MonitorShell.tsx`, `globals.css`, `tool-studio.test.mjs`

## language_options

- TypeScript/React: 기존 renderer와 같은 언어이며 상태/렌더링 변경에 가장 작다.
- Rust/Tauri: native 명령 추가에는 적합하지만 이번 문제는 command palette renderer UX라 과하다.

## selected_language

TypeScript/React + CSS.

## language_decision_notes

기존 command item과 `Button` primitive를 재사용할 수 있고, 새 native permission이나 process lifecycle을 만들지 않아 유지보수 부담이 작다.

## architecture_options

- Inline enhancement: `MonitorShell.tsx`의 기존 command palette 상태와 렌더링에 추천/상태 피드백을 추가한다.
- Shared command registry extraction: command item을 별도 registry로 분리하고 팔레트와 다른 표면이 공유하게 한다.

## architecture_decision_notes

이번 slice는 기능을 즉시 연결하는 것이 목표라 inline enhancement를 선택했다. registry 분리는 더 넓은 command-routing 작업 때 검토한다.

## folder_structure_options

- 기존 파일 수정만 수행: UI, CSS, 테스트의 소유권이 명확하다.
- 새 component 폴더 추가: 재사용 여지는 있지만 현재 command palette가 `MonitorShell` state에 강하게 묶여 있다.

## folder_structure_decision_notes

새 폴더를 만들지 않고 기존 파일만 수정한다. 추천 명령은 기존 command item id를 참조하므로 별도 durable path가 필요 없다.

## code_reference_sources

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/ui/Button.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## code_reference_notes

`Button`은 default `type="button"`과 variant/size contract를 제공하므로 추천 명령도 같은 primitive로 구현했다. 기존 결과 목록은 `runCommandItem`으로 실행 후 닫기/검색어 초기화를 처리하므로 추천 버튼도 같은 lifecycle을 사용했다.

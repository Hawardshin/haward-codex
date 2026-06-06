# Request Trace: Editable Runtime Prompts

날짜: 2026-06-07

## 요청

- 사용자 요청: 각 프롬프트를 변경 가능하게.

## 산출물

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-07-editable-runtime-prompts.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-07-editable-runtime-prompts/`
- 웹 검색 기록: `_history/web-searches/2026/2026-06-07-editable-runtime-prompts.ko.md`
- 검증 기록: `platform-desktop-app/specs/2026-06-07-editable-runtime-prompts/validation.ko.md`
- 누락 점검: `_history/omission-checks/2026/2026-06-07-editable-runtime-prompts.json`
- 리소스 점검: `_history/resource-checks/2026/2026-06-07-editable-runtime-prompts.json`
- 평가 입력: `_history/evaluations/2026/2026-06-07-editable-runtime-prompts-input.json`

## 구현 연결

- 세션 프롬프트 편집: `RuntimeTerminalDrawer`, `MonitorShell`
- 작업 파이프라인 프롬프트 편집: `MonitorShell`
- UI 상태/CSS: `globals.css`
- 네이티브 preferences 정규화: `src-tauri/src/lib.rs`
- 테스트 계약: `tests/tool-studio.test.mjs`

## 검증 결과

- TypeScript/check 통과.
- renderer tests 90개 통과.
- Rust prompt normalization test 통과.
- production renderer build 통과.
- Browser smoke 통과.

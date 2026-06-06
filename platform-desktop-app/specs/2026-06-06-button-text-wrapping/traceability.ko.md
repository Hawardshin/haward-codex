# Traceability: Button Text Wrapping

## 요구사항 연결
- REQ-BTW-001, REQ-BTW-002 -> `renderer/workspace-monitor/app/globals.css` 버튼 라벨 token과 action button nowrap/ellipsis 계약.
- REQ-BTW-003 -> 본문/코드 wrap selector는 유지하고 버튼 라벨 selector만 별도 강화.
- REQ-BTW-004 -> `tests/tool-studio.test.mjs`, `tests/font-loading.test.mjs`.
- REQ-BTW-005 -> React markup 텍스트는 제거하지 않고 CSS 표시 방식만 변경.

## 구현 파일
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/font-loading.test.mjs`

## 검증 파일
- `platform-desktop-app/specs/2026-06-06-button-text-wrapping/validation.ko.md`
- `_history/evaluations/2026/2026-06-06-button-text-wrapping.ko.md`
- `_history/request-traces/2026/2026-06-06-button-text-wrapping.ko.md`

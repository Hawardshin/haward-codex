# 2026-06-06 종합 개선 source provenance

## 로컬 출처

- `platform-desktop-app/renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx`
  - 기존 current work score, evidence coverage, token/tool, open-source EVAL 후보 패턴을 재사용했다.
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
  - 기존 EVAL panel visual token, panel grid, button shadow, surface style을 유지했다.
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-*.mjs`
  - 기존 정적 계약 검사 패턴을 따라 새 종합 개선 계약 검사를 추가했다.
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
  - EVAL cockpit 회귀 테스트 블록을 확장했다.

## 외부 출처

- Tauri Process Model: https://tauri.app/concept/process-model/
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Google Engineering Practices Small CLs: https://google.github.io/eng-practices/review/developer/small-cls.html

## 사용하지 않은 출처

- `_private/`는 탐색하지 않았다.
- 소셜/커뮤니티 자료는 구현 근거로 쓰지 않았다.

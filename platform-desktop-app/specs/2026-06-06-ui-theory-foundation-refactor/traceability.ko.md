# UI 이론 기반 디자인 파운데이션 리팩토링 추적

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-UI-THEORY-001 | `globals.css` spacing/depth/state/focus token | `Workspace monitor encodes theory-backed desktop visual hierarchy tokens` |
| REQ-UI-THEORY-002 | `settings-*`, `workspace-home-*`, `adapter-card` token 연결 | 브라우저 렌더 검증, CSS 정적 테스트 |
| REQ-UI-THEORY-003 | `.desktop-app-root :where(...):focus-visible` halo | CSS 정적 테스트 |
| REQ-UI-THEORY-004 | dark/system `--surface-depth-0/1` 재정의 | 브라우저 settings 재검증 |
| REQ-UI-THEORY-005 | visible explanatory text 미추가, CSS/속성 중심 | 코드 리뷰 |
| REQ-UI-THEORY-006 | 테스트/check/browser/package 절차 | `validation.ko.md` |

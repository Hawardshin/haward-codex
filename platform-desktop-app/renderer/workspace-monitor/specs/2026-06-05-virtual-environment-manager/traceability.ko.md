# 추적성

| 항목 | 연결 |
| --- | --- |
| 요구사항 | REQ-WM-053 |
| 사용자 요청 | `가상 환경` |
| 구현 파일 | `components/workbench/ToolStudioPanel.tsx` |
| 스타일 파일 | `app/globals.css` |
| 테스트 파일 | `tests/tool-studio.test.mjs` |
| 검증 파일 | `validation.ko.md` |
| 이력 | `_history/request-traces/2026/2026-06-05-virtual-environment-manager.ko.md` |

## 수락 기준

- `data-tool-venv-manager`가 `environment` 모드에서 표시된다.
- lifecycle step 5개와 action 3개가 marker로 검증된다.
- 선택 step command와 evidence가 표시된다.
- 390px 모바일에서도 수평 overflow가 없다.

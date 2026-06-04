# 추적성

| 항목 | 연결 |
| --- | --- |
| 요구사항 | REQ-WM-052 |
| 사용자 요청 | `파이썬 실행환경` |
| 구현 파일 | `components/workbench/ToolStudioPanel.tsx` |
| 스타일 파일 | `app/globals.css` |
| 테스트 파일 | `tests/tool-studio.test.mjs` |
| 검증 파일 | `validation.ko.md` |
| 이력 | `_history/request-traces/2026/2026-06-05-python-environment-workbench.ko.md` |

## 수락 기준

- `data-tool-environment-workbench`가 `environment` 모드에서만 표시된다.
- profile 3개와 action 4개가 marker로 검증된다.
- runtime/install/run/sandbox/health 영역이 모두 표시된다.
- 390px 모바일에서도 수평 overflow가 없다.

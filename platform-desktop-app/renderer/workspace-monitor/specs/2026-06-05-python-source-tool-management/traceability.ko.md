# 추적성

| 항목 | 연결 |
| --- | --- |
| 요구사항 | REQ-WM-056 |
| 사용자 요청 | `툴을 만드는 쉬운 방법 파이썬 소스 관리` |
| 구현 파일 | `components/workbench/ToolStudioPanel.tsx` |
| 스타일 파일 | `app/globals.css` |
| 테스트 파일 | `tests/tool-studio.test.mjs` |
| 검증 파일 | `validation.ko.md` |
| 이력 | `_history/request-traces/2026/2026-06-05-python-source-tool-management.ko.md` |

## 수락 기준

- `data-tool-python-source-manager`가 `build` 모드에서 표시된다.
- template별 package/module/entrypoint/pyproject/test path/edit targets/checklist가 marker와 copy payload에 포함된다.
- source target 선택 버튼이 4개 이상 표시되고 선택 상태가 바뀐다.
- 390px 모바일에서도 수평 overflow가 없다.

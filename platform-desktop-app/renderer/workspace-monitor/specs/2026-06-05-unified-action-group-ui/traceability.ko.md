# Unified Action Group UI 추적성

| 요구사항 | 구현 | 검증 | 산출물 |
| --- | --- | --- | --- |
| REQ-WM-067 | `components/ui/ActionGroup.tsx`, `MonitorShell.tsx`, `ToolStudioPanel.tsx`, `app/globals.css` | `tests/tool-studio.test.mjs`, Browser smoke, build/check/perf | 이 스펙 폴더, 요구사항 문서, history/evaluation/request trace/work summary |

## 의사결정 근거

- NN/g 일관성 heuristic은 같은 개념과 행동이 화면마다 다르게 보이면 사용자가 학습을 반복해야 한다는 리스크를 제시한다.
- Material/Apple/Radix 기준은 버튼과 메뉴 trigger의 상태, familiar control, 접근 가능한 primitive 사용을 지지한다.
- 따라서 대표 반복 액션 묶음을 공통 primitive로 모으고 화면별 CSS는 배치 목적만 남긴다.

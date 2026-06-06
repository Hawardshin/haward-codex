# Work Summary: Core Feature Connections

날짜: 2026-06-07

## 요약

Workspace Monitor 홈의 주요 기능 상세에 세부 연결 버튼을 추가했다. 에이전트, 툴, 실행, 평가, 파일, 가시성 기능이 실제 section/intent/flow step으로 바로 이동한다.

## 변경

- `CoreFeatureDrilldownItem`에 `connections` contract 추가.
- `CoreFeatureDrilldown`에 connection grid 렌더링 추가.
- `MonitorShell`에 `selectIntentStep`, `selectToolStep` helper 추가.
- 홈 주요 기능 6개에 세부 연결 버튼 추가.
- `.main-feature-connections` CSS와 static tests 추가.

## 검증

- renderer test/check는 통과했다.
- collect/build/platform check가 통과했다.
- Browser smoke에서 connection 그룹 6개, action 18개를 확인했고 `tool-source` 대표 클릭이 Tool Studio로 연결됐다.
- resource/omission/evaluation guard가 통과했다.

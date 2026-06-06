# Request Trace: Core Feature Connections

날짜: 2026-06-07

## 요청

- "주요 기능 연결"

## 결과

- 홈 주요 기능 상세에 connection 버튼을 추가했다.
- connection은 실제 intent/flow step 또는 Tool Studio mode request를 호출한다.

## 산출물

- `platform-desktop-app/docs/requirements/2026-06-07-core-feature-connections.ko.md`
- `platform-desktop-app/specs/2026-06-07-core-feature-connections/`
- `_history/web-searches/2026/2026-06-07-core-feature-connections.ko.md`
- `_history/omission-checks/2026/2026-06-07-core-feature-connections.json`
- `_history/resource-checks/2026/2026-06-07-core-feature-connections.json`
- `_history/evaluations/2026/2026-06-07-core-feature-connections-input.json`
- `_history/evaluations/2026/2026-06-07-core-feature-connections.ko.md`

## 검증

- renderer test/check 통과.
- collect/build/platform check 통과.
- Browser smoke에서 connection 그룹 6개와 action 18개를 확인하고 `tool-source` 대표 클릭이 Tool Studio로 연결됨을 확인했다.
- resource/omission/evaluation guard 통과.

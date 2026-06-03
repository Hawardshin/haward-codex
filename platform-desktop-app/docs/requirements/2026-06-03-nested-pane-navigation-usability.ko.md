# 요구사항: 긴 탭 내부 분할 UX

- 요청 ID: `UR-2026-06-03-052`
- 소유 프로젝트: `platform-desktop-app/`
- 범위: settings dialog, source workbench, runtime terminal drawer

## 배경

이전 작업으로 독립 스크롤 pane은 생겼지만, 사용자가 한 대분류 탭 안에서 여전히 긴 목록을 스크롤해야 하는 문제가 남았다. desktop app처럼 쓰려면 대분류 안에서도 클릭 가능한 하위 섹션이나 view 전환으로 목적을 좁힐 수 있어야 한다.

## 요구사항

- `PDA-REQ-052-1`: 설정 dialog의 각 대분류 탭은 내부 하위 섹션 navigation을 제공해야 한다.
- `PDA-REQ-052-2`: `초기화`처럼 긴 설정 탭은 추천 기본값, CLI adapter, session mode, task pipe, question handling을 한 화면에 모두 쌓지 않아야 한다.
- `PDA-REQ-052-3`: 파일/코드 workbench는 파일 탐색, 편집, 저장 결과를 클릭 가능한 view로 분리해야 한다.
- `PDA-REQ-052-4`: 다중 CLI 터미널 drawer는 시작 입력, 세션 목록, 출력, 이벤트를 클릭 가능한 view로 분리해야 한다.
- `PDA-REQ-052-5`: 새 분할 구조는 readiness 검사와 테스트에서 회귀 방지 토큰으로 검증되어야 한다.

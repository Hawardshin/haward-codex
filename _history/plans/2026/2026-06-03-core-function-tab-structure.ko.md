# 계획: Workspace Monitor 핵심 기능 탭 구조

## 요청 요약

사용자는 Workspace Monitor가 딱 봤을 때 핵심 기능 위치를 알 수 있고, 탭이 잘 나뉜 구조가 되어야 한다고 요청했다.

## 선택한 범위

- `workspace-monitor/` UI 정보구조를 소유 범위로 둔다.
- 새 snapshot collector나 runtime data 저장소는 만들지 않는다.
- 기존 섹션 화면은 유지하고 navigation hierarchy만 정리한다.

## 결정

- 핵심 기능은 상단 `core-feature-rail`로 분리한다.
- 전체 섹션은 기능군별 grouped tabs로 묶는다.
- Overview에 `Core Functions` 패널을 추가해 첫 화면의 기능 지도 역할을 강화한다.
- view mode 허용 범위는 기존 registry 결과를 그대로 사용한다.

## 검증 계획

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app run monitor:build`

# 작업 계획: Sidebar Navigation Componentization

- 작업 모드: `standard`
- 소유 프로젝트: `platform-desktop-app`
- 제품 gap: `componentized_desktop_ui_architecture`

## 실행 계획

1. 웹 검색과 메모리 부트스트랩으로 현재 구현 경계를 확인한다.
2. `MonitorShell`의 activity rail/sidebar navigation을 새 `DesktopActivityRail` 컴포넌트로 분리한다.
3. renderer test, platform readiness test, readiness script가 새 컴포넌트 파일을 직접 확인하게 갱신한다.
4. dev server와 Playwright smoke로 실제 DOM 렌더링을 검증한다.
5. collect/build/platform check, omission/resource/evaluator를 통과시킨 뒤 commit/push한다.

## 결정

- Settings dialog 전체 분리는 props와 상태가 많아 이번 조각에서 하지 않는다.
- 작은 shell navigation 경계부터 만들어 후속 분리를 안전하게 이어갈 수 있게 한다.

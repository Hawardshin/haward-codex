# 계획 기록: 타이틀바 섹션 링크 UI

## 대형 범위 분해 패킷

- 트리거: `UI개선`은 broad language이며, UI 후보 파일이 108개라 전체 변경은 context와 blast radius가 크다.
- 제외: `node_modules`, `.next`, `out`, generated snapshots, 대량 history JSON.
- 대표 샘플: `MonitorShell.tsx`, `globals.css`, `Button.tsx`, `tool-studio.test.mjs`, `section-location.mjs`, `user-flow-registry.json`.
- 첫 실행 slice: `slice-titlebar-current-context`
- touch paths: `MonitorShell.tsx`, `globals.css`, `tool-studio.test.mjs`, 요구사항/스펙/히스토리 기록.
- 검증: workspace monitor check, targeted node tests, Playwright smoke, package tests, renderer build, omission/resource/evaluation validators.

## 실행 순서

1. 공식 toolbar/action UI 출처 확인.
2. 로컬 UI shell과 titlebar 구조 샘플링.
3. titlebar에 current section link copy button과 status pill 추가.
4. CSS와 정적 테스트 추가.
5. Playwright smoke로 desktop/narrow 렌더링과 복사 상태 확인.
6. 기록, 빌드, commit, push.

## 후속 slice 후보

- section header density 정리
- report action strip 표준화
- navigation discoverability 개선
- command palette에 current-section copy command 추가

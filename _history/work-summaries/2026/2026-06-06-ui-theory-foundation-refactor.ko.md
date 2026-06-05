# 작업 요약: UI 이론 기반 디자인 파운데이션 리팩토링

## 완료

- workspace monitor 전역 CSS에 spacing, depth, hierarchy, hover, focus halo token을 추가했다.
- 홈/설정/어댑터/주요 버튼 표면을 새 token으로 연결했다.
- `data-ui-foundation="gestalt-hierarchy-density"` shell marker를 추가했다.
- dark/system 테마의 depth token 누락을 브라우저 검증으로 발견하고 수정했다.
- 정적 테스트와 readiness 검사를 보강했다.

## 검증

- workspace-monitor test 통과
- platform-desktop-app test 통과
- workspace-monitor check 통과
- platform-desktop-app check 통과
- 브라우저 렌더 검증 통과
- internal `.app`/`.dmg` 패키징 및 검증 통과

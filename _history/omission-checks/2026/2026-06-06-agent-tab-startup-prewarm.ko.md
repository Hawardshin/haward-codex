# 누락 점검

- 사용자 요구: Agent 탭 첫 진입 지연을 startup 비용으로 이동한다.
- 구현 확인: 모든 12개 section을 초기 resident set에 포함했다.
- dev 실행 확인: `next.config.mjs`를 production static export 전용으로 분리해 dev hydration을 복구했다.
- 검증 확인: check/test/build/perf/browser smoke 완료.
- 남은 작업: internal package build 후 validation/evaluation 최종 갱신.

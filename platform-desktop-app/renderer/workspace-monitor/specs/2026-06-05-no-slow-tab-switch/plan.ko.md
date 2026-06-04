# 계획: 탭 전환 무지연 계약

1. 현재 탭 전환 렌더 경로와 기존 성능 기록을 확인한다.
2. `MonitorShell`에 section body staged mount gate를 추가한다.
3. Source 대량 검색이 body 준비 전 실행되지 않도록 막는다.
4. CSS 전환 shell과 정적 회귀 테스트를 추가한다.
5. 정적 테스트, 타입 체크, customer build, perf budget, Browser/Playwright 성능 smoke를 실행한다.
6. 결과와 trace/evaluation을 남기고 커밋/푸시한다.

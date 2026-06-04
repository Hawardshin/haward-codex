# Plan: Button Interaction Latency

1. 공식 성능 reference를 확인한다.
2. 정적 export + CPU throttle 6에서 주요 섹션 버튼 click-to-paint를 계측한다.
3. 느린 버튼을 개별 버튼이 아니라 공통 화면 마운트 경로로 분류한다.
4. Desktop Runtime/Source heavy content를 staged shell 뒤로 미룬다.
5. source/evidence/native refresh 계산을 실제 필요 시점으로 미룬다.
6. 같은 audit으로 평균, p95, max, long task를 재측정한다.
7. check/test/build/perf/platform check와 in-app Browser smoke로 회귀를 확인한다.

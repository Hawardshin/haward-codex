# Work Timing

- intake/search/memory bootstrap: 약 5분
- UI source inspection and first patch batch: 약 20분
- second patch batch for first-run/init/settings actions: 약 15분
- browser smoke and server lifecycle: 약 10분
- package/check failure reconciliation: 약 15분
- final package verification: 약 25분
- bottleneck: 패키징 파이프라인이 여러 readiness 문자열 계약을 중복 보유해 UI 라벨 변경 후 테스트와 스크립트를 모두 갱신해야 했다.

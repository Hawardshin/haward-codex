# 계획: 구조/메모리/성능 마이그레이션

1. 웹 기준 확인: Tauri process model, React performance hooks, Next static/bundle guidance.
2. 로컬 구조 측정: 파일 line count, snapshot payload, source content bytes, state churn 경로.
3. 위험 분류: 전면 재작성 대상과 즉시 개선 가능한 hot path 분리.
4. 구현: source snapshot metadata/preview화, performance budget gate, Monaco draft throttling.
5. 검증: payload 수치, tests/checks, internal package build.
6. 기록/커밋/푸시.

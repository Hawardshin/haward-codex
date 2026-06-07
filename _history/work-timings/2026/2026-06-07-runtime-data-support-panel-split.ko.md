# 2026-06-07 Runtime Data Support panel split 작업 시간

## 단계별 기록

- 웹 확인: React component/props/TypeScript 공식 문서 확인.
- 소스 조사: Runtime Data & Support UI 블록, support readiness 검사, readiness test aggregation 확인.
- 구현: `RuntimeDataSupportPanel.tsx` 추가와 `MonitorShell.tsx` 호출부 전환.
- 계약 갱신: `check-readiness.mjs`, `check-service-readiness.mjs`, `readiness.test.mjs` 수정.
- 검증: workspace monitor check/test, desktop app test/check 실행.

## 병목

- service readiness script가 support UI 문자열을 `MonitorShell.tsx` 단일 파일에서 찾고 있어 aggregation 보정이 필요했다.

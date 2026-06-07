# 2026-06-07 Service Readiness panel split 작업 시간

## 단계별 기록

- 웹 확인: Tauri updater, macOS signing/notarization, updater API 공식 문서 확인.
- 소스 조사: Service Readiness UI 위치, readiness source aggregation, 테스트 계약 확인.
- 구현: `ServiceReadinessPanel.tsx` 추가와 `MonitorShell.tsx` 호출부 전환.
- 계약 갱신: `check-readiness.mjs`, `readiness.test.mjs`에 새 컴포넌트 포함.
- 검증: workspace monitor check/test, desktop app test/check 실행.

## 병목

- 검증 계약이 기존 단일 파일 중심이라, 분리된 feature 파일을 명시적으로 aggregation에 추가해야 했다.

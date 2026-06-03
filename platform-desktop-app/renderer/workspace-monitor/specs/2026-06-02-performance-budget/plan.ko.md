# 계획: Workspace Monitor 성능 예산

## 모드

- work_mode: `standard`
- view_mode: `superadmin_developer`
- large-scope 처리: 전체 코드 분석 요청이므로 대표 병목을 샘플링하고, 이번 slice는 초기 bundle과 검색 반응성에 제한한다.

## 실행 순서

1. 웹 검색으로 Next.js lazy loading, bundle optimization, React deferred rendering 공식 근거를 확인한다.
2. build output과 source import graph를 샘플링해 가장 큰 병목을 확인한다.
3. snapshot static import를 제거하고 loader + dynamic MonitorShell로 전환한다.
4. 검색 경로에서 source content scanning을 Source 탭에만 제한한다.
5. 성능 예산 스크립트를 추가한다.
6. check/test/build/perf/static smoke로 검증한다.

## 측정 기준

- 변경 전 largest JS chunk: `6,224,897 bytes`
- 목표: largest JS chunk `< 1,000,000 bytes`
- 변경 후 측정: `227,537 bytes`

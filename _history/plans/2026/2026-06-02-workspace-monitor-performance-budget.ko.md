# 계획 기록: Workspace Monitor 성능 예산

## 요청 요약

코드를 전체적으로 분석해 속도를 개선하고 빠른 속도를 유지해 달라는 요청.

## 범위 축소

- 전체 저장소를 모두 리팩터링하지 않는다.
- 대표 병목을 build output과 import graph로 샘플링한다.
- 이번 slice는 Workspace Monitor 초기 JS 크기와 검색 반응성에 집중한다.

## 실행 계획

1. 웹-first intake와 memory bootstrap을 수행한다.
2. Workspace Monitor build output에서 largest chunk를 측정한다.
3. snapshot static import를 제거한다.
4. public JSON fetch + `MonitorShell` dynamic import를 적용한다.
5. 검색 렌더 비용을 줄인다.
6. `perf:budget` 회귀 검사를 추가한다.
7. check/test/build/perf/static smoke를 수행한다.

## 결과

- 변경 전 largest JS chunk: `6,224,897 bytes`
- 변경 후 largest JS chunk: `227,537 bytes`

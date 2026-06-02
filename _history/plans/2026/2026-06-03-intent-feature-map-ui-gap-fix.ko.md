# 계획 기록: Intent Feature Map UI 부족분 보강

## 요청

- 요청 ID: `UR-2026-06-03-017`
- 목표: 방금 구현한 의도-기능 맵 UI에서 부족한 부분을 찾아 고친다.

## 확인한 부족분

1. collector가 특정 날짜 파일에 고정되어 최신 intent map을 자동 반영하지 못했다.
2. UI가 source freshness와 available map count를 보여주지 않았다.
3. Overview의 Source 버튼이 intent-map 문서 필터를 자동으로 적용하지 않았다.
4. developer/customer snapshot의 intent map 상태를 빠르게 검증하는 전용 명령이 없었다.

## 실행

- 최신 한국어 intent map 자동 선택 로직 추가
- `sourceDate`, `updatedAt`, `availableMaps` summary 추가
- Overview Source 버튼의 document category filter 연결
- `check-intent-feature-map.mjs`, `check:intent-map`, `check:intent-map:customer` 추가
- 테스트, build, customer redaction, perf budget 검증


# 요청-결과 추적: Intent Feature Map UI 부족분 보강

## 요청

- 요청 ID: `UR-2026-06-03-017`
- 요약: “부족한부분 고쳐줘”에 따라 방금 구현한 Intent Feature Map UI의 실제 부족분을 찾아 보강했다.

## 결과

- intent map source 하드코딩을 제거하고 최신 한국어 map 자동 선택으로 바꿨다.
- `intentFeatureMap.summary`에 `sourceDate`, `updatedAt`, `availableMaps`를 추가했다.
- Overview Source 버튼이 intent-map 문서 필터로 바로 이동하게 했다.
- developer/customer snapshot 전용 검사 스크립트와 npm script를 추가했다.

## 검증

- `npm --prefix workspace-monitor test`: 통과
- `npm --prefix workspace-monitor run collect`: 통과
- `npm --prefix workspace-monitor run check:intent-map`: 통과
- `npm --prefix workspace-monitor run check`: 통과
- `npm --prefix workspace-monitor run build`: 통과
- `npm --prefix workspace-monitor run build:customer`: 통과
- `npm --prefix workspace-monitor run check:intent-map:customer`: 통과
- `npm --prefix workspace-monitor run perf:budget`: 통과

## 남은 한계

- customer build 후 developer snapshot 복구가 여전히 별도 단계다. 다음에는 하나의 safe validation script로 묶는 것이 좋다.


# 계획: bounded tab resident 성능 보정

## 작업 모드

- 선택: `standard`
- 이유: 사용자 체감 성능 개선이지만 source/runtime state와 resource lifecycle에 영향이 있어 quick으로 닫기 어렵다.
- resource risk: true. renderer resident memory, idle callbacks, Playwright browser, static server, Tauri/Rust package build를 다룬다.

## 단계

1. 웹 검색으로 React/Next/idle scheduling 성능 기준을 확인한다.
2. 이전 resident preload 구현의 hidden tree 누적 경로를 찾는다.
3. resident state를 bounded cap으로 바꾸고 source 보존 우선순위를 둔다.
4. heavy module/data prewarm은 유지한다.
5. runtime/source 패널에 memo와 stable callback을 적용한다.
6. 섹션 전환 측정 스크립트를 추가한다.
7. renderer test/check/build, perf audit, desktop test/check/package를 실행한다.
8. developer snapshot을 복구하고 평가 기록을 남긴다.

## 결정

- 전체 visible section idle mount는 제거한다.
- native resource warmup은 Rust startup과 source workspace cache 쪽에 남긴다.
- admin history는 hook cache promise를 외부 prewarm 가능하게 열어 첫 history/documents 진입 비용을 줄인다.

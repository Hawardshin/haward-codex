# Runtime Data Boundary 구현 계획

## 작업 모드

- 선택: `governance`
- 이유: 사용자 지시는 향후 설치형 제품 구조, 고객 source visibility, agent/log/data 축적 위치에 영향을 주는 durable steering이다.

## 단계

1. 공식 문서 중심으로 runtime app data, bundle/resource, OS app data boundary를 확인한다.
2. repository source, installed app bundle, runtime data/log/cache/agent workspace plane을 registry로 정의한다.
3. product boundary, persistent instruction, memory bootstrap anchor를 갱신한다.
4. readiness/test에 누락 감지 토큰을 추가한다.
5. 요구사항, spec, web-search, request trace, evaluation 기록을 남긴다.
6. JSON/config/test/Rust/Tauri build 검증 후 commit/push한다.

## 의사결정

- 실제 storage adapter 구현은 다음 slice로 분리한다.
- 고객에게 platform source code가 보이지 않는다는 기준은 installer payload policy와 customer visibility policy로 우선 고정한다.
- agent는 정의/registry와 runtime work plane을 분리한다.

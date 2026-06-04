# 계획: Depth First Home Navigation

## work_mode

- 선택: `governance`
- 이유: 사용자 지시가 지속 UI 정보구조 원칙이며, 영속 지침/정책/memory bootstrap/요구사항과 구현을 함께 바꾼다.
- view_mode: `superadmin_developer`
- install_mode: 해당 없음

## 단계

1. 웹 기준 확인: cognitive accessibility, progressive disclosure, one thing per page, tab usage guidance를 확인한다.
2. 정책 갱신: 탭 하나에 여러 기능을 넣지 않고 drill-down을 우선하는 원칙을 영속 지침과 UI 정책에 반영한다.
3. 구현: Overview 홈을 해시 기반 선택 메뉴와 단일 기능 child view로 바꾼다.
4. 검증: check, test, build, perf, docs audit, config contract, Browser responsive/drill-down smoke를 실행한다.
5. 기록: 요구사항, 스펙, 히스토리, 평가, 요청 추적을 갱신한다.

## 의사결정

- 대안 A: 기존 disclosure panel을 더 작게 유지한다.
- 대안 B: 기본 홈은 선택 메뉴로 낮추고, 각 기능은 별도 child view로 연다.
- 선택: B. 사용자가 “차라리 깊이를 더 가라”고 명시했으므로 탭 안 동시 노출보다 drill-down이 요구에 더 직접적으로 맞다.

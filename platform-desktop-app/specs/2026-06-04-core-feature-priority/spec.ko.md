# 핵심 기능 우선순위 스펙

## 목표

설치형 데스크톱 앱의 첫 화면과 제품 계약을 Agent Core와 CLI Orchestration 중심으로 재정렬한다. 루트 툴과 작업 가시성은 두 핵심 기능을 가능하게 하는 supporting layer로 분리하고, 운영/문서/구조/요구사항 같은 비핵심 기능은 Operator Center 뒤로 낮춘다.

## 범위

- Home hero, primary metric, feature tabs, setup panels를 두 core 기능 중심으로 재구성한다.
- `product-feature-registry.json`과 fallback product architecture를 2 primary + supporting layer 구조로 맞춘다.
- 사용자 기본 navigation과 view mode contract를 `overview`, `agents`, `desktop`, `source`, `intent` 순서로 맞춘다.
- 루트 툴 setup과 핵심 기능 readiness를 Home과 execution settings에서 노출한다.
- 현재 작업량, pending decisions, task-run records, agent count를 한눈에 보이게 한다.
- readiness/test/snapshot/customer bundle 검사를 새 제품 계약으로 갱신한다.

## 비범위

- 새 CLI adapter나 agent runtime backend 추가
- 실제 외부 provider 계정 생성 자동화
- public release signing/notarization/updater 완료

## 수용 기준

- Home 첫 화면에 Agent Core, CLI Orchestration, Root Tools, Work Visibility가 보인다.
- primary product feature는 Agent Core와 CLI Orchestration 두 개뿐이다.
- Root Tool Management와 Work Visibility는 supporting feature로 registry와 snapshot에 포함된다.
- user view mode의 allowed sections는 `overview`, `agents`, `desktop`, `source`, `intent`다.
- renderer check/test, platform check/test, config contract, view-mode check, customer snapshot audit가 통과한다.
- Browser smoke에서 첫 화면과 설정 표면이 비어 있지 않고 주요 핵심 문구가 렌더된다.


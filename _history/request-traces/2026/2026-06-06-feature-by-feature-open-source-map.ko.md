# 요청-결과 추적: 기능별 오픈소스 맵

- 날짜: 2026-06-06
- 요청: 각각 기능별로도 오픈소스 찾아보기
- 프로젝트: `platform-desktop-app/`

## 입력

앞선 유사 플랫폼 조사에서 전체적으로 비슷한 오픈소스를 봤으나, 사용자는 각 기능 단위로도 오픈소스를 찾으라고 요청했다.

## 결정

현재 제품의 `feature_layers`를 기준 분류로 사용했다. 기능 layer는 CLI Orchestration, Agent Work Environment, Agent Development Environment, Agent Core, Learning & Evaluation Loop, Root Tool Management, Work Visibility, Observability & Monitoring이며, 구현상 필요한 Desktop Shell / Native Runtime을 별도 축으로 추가했다.

## 결과

기능별 후보, 볼 부분, 적용 포인트를 `_research/topics/platform-desktop-app/2026-06-06-feature-by-feature-open-source-map.ko.md`에 정리했다. 이 문서는 다음 구현 slice마다 직접 clone할 후보를 고르는 출발점이다.

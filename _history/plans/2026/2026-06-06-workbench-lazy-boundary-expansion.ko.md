# 작업 계획: Workbench lazy boundary 확장

## 분류

- 소유 프로젝트: `platform-desktop-app`
- 작업 모드: `standard`
- view mode: `superadmin_developer`
- install mode: `developer`

## 계획

이전 root-boundary 작업에서 다음 병목으로 남긴 `DesktopRuntimePanel`과 Agents detail panels를 대상으로 한다. 목표는 모든 탭을 한 번에 재작성하는 것이 아니라, Shell-local heavy UI를 실제 dynamic chunk boundary로 옮기고 prewarm을 분산해 탭 전환과 버튼 feedback을 개선하는 것이다.

## 수용 기준

- internal package build까지 완료한다.
- section p95 1400ms 이하와 mounted/resident cap 5를 지킨다.
- button feedback 누락이 0건이어야 한다.
- readiness/test 계약이 새 lazy module 구조를 인식한다.

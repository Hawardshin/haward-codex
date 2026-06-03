# 요구사항: Native Permission & Quiet UI

- 요청 ID: `UR-2026-06-03-053`
- 소유 프로젝트: `platform-desktop-app/`
- 범위: Workspace Monitor desktop shell UI, workspace access flow

## 배경

사용자는 현재 UI와 폰트가 과하고, 설치형 데스크톱 앱이라면 작업공간 접근 권한을 요청해서 바로 사용할 수 있어야 한다고 지적했다.

## 요구사항

- `PDA-REQ-053-1`: UI는 forced web/marketing typography가 아니라 OS system font stack을 우선해야 한다.
- `PDA-REQ-053-2`: hero, metric, card, hover motion은 과한 강조를 줄이고 desktop workbench 톤으로 낮춰야 한다.
- `PDA-REQ-053-3`: 작업공간 진입점은 `작업공간 접근 권한 요청`처럼 native permission action으로 표현해야 한다.
- `PDA-REQ-053-4`: native folder picker로 작업공간 접근이 승인되면, source explorer와 CLI working directory가 바로 해당 경로를 사용할 수 있어야 한다.
- `PDA-REQ-053-5`: readiness/test는 권한 요청 UX와 system font 회귀 방지 토큰을 검증해야 한다.

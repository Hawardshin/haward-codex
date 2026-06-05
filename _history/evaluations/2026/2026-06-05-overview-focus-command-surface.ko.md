# 평가: Overview Focus Command Surface

## 결과

- Overview 첫 화면을 카드 목록 중심에서 Focus Command Surface 중심으로 바꿨다.
- 추천 작업은 기본 `툴 만들기`이며, 선택된 task intent가 있으면 그 intent를 대표 작업으로 보여준다.
- 대표 작업 card는 다음 단계 3개와 primary action을 먼저 보여주고, 다른 목표는 `작업 dock`으로 낮췄다.
- 작업량 status strip은 focus command와 dock 아래로 내려 첫 판단을 방해하지 않게 했다.

## 검증

- `corepack pnpm --filter workspace-monitor test` 통과
- `corepack pnpm --filter workspace-monitor run check` 통과
- `corepack pnpm --filter workspace-monitor run build:customer` 통과
- `corepack pnpm --filter workspace-monitor run perf:budget` 통과
- desktop Browser smoke 통과: focus/card/dock/status 표시, card intent `build-tool`, flow 3개, target 6개, overflowX 0
- mobile 390x844 smoke 통과: focus/card/dock/status 표시, body/viewport width 390px, overflowX 0, primary action height 48px

## 판단

- 사용자가 요구한 “UI 근본 변화”를 첫 화면의 정보 구조 전환으로 구현했다.
- 모든 섹션을 한 번에 뒤집는 대신, 실제 체감이 큰 Overview first-screen을 먼저 바꿔 위험을 제한했다.
- 새 dependency 없이 기존 task intent 모델과 responsive token을 활용했으므로 성능/설치 위험은 낮다.

## 미완료/후속

- Agents, Source, Tools 내부 workbench도 같은 focus command 원칙으로 순차 적용할 수 있다.
- 실제 사용 빈도 기반 추천 작업 선택은 아직 없다.

# 평가: Industrial Control Affordance

## 결과

- Overview 작업 dock 목표 버튼을 번호, 기능 아이콘, 본문, 상태 badge, 진행 화살표로 분리했다.
- dock 버튼을 88px 이상 tactile target으로 키우고 inset highlight, hover/focus, active pressed 상태를 추가했다.
- 모바일에서는 기능 아이콘을 숨기고 번호, 텍스트, action cue 중심으로 재배치해 수평 overflow를 막았다.

## 검증

- `corepack pnpm --filter workspace-monitor test` 통과
- `corepack pnpm --filter workspace-monitor run check` 통과
- `corepack pnpm --filter workspace-monitor run build:customer` 통과
- `corepack pnpm --filter workspace-monitor run perf:budget` 통과: largest chunk 723,490 bytes
- desktop Browser smoke 통과: button/cue/icon 각 6개, 첫 버튼 88px, overflowX 0
- mobile 390px Playwright smoke 통과: cue 6개, icon display none, 첫 버튼 약 109px, overflowX 0

## 판단

- 작업 dock이 단순 카드 묶음보다 더 명확한 조작 패널로 보인다.
- 손이 갈 위치와 다음 진행 방향이 분리되어 작업 선택 비용이 줄었다.
- 새 dependency 없이 기존 구조에 적용했으므로 위험은 낮다.

## 후속

- 같은 control affordance를 Tool Studio, Source toolbar, terminal controls에 확대 적용할 수 있다.

# 조사 메모: Workspace Monitor의 은근히 귀여운 UI 톤

## 결론

운영 도구에서 “귀여움”은 장식 테마가 아니라 반복 사용 피로를 줄이는 작은 정서적 완충으로 다뤄야 한다. 상태를 더 잘 느끼게 하는 작은 색상점, hover 피드백, empty state의 부드러움은 유효하지만, 정보 밀도와 hierarchy를 희생하면 플랫폼 목적과 충돌한다.

## 적용 기준

- 상태 전달에 도움이 되는 작은 accent만 사용한다.
- hover는 layout shift가 아니라 `transform`으로 짧게 처리한다.
- motion은 사용자 행동을 기다리게 만들지 않는다.
- `prefers-reduced-motion`을 제공한다.
- 색상은 기존 green/blue/amber/red/violet/slate 체계를 유지하고, 보조 warm accent만 추가한다.

## 이번 반영

- `workspace-monitor/app/globals.css`에 `--rose`, `--mint-soft`, `--peach-soft`, `--soft-shadow`를 추가했다.
- metric card에 작은 상태점을 넣어 정적인 수치 카드에 부드러운 신호를 더했다.
- 주요 카드/버튼 hover에 1px lift와 soft shadow를 적용했다.
- `prefers-reduced-motion` media query를 추가했다.

## 재사용

향후 `platform-desktop-app/`과 dashboard/report HTML은 `_docs/policies/ui-tone-policy.ko.md`를 먼저 확인한다.

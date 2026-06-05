# 구현 계획

## 범위

- Overview 홈의 첫 surface를 `home-focus-command` 중심으로 재배치한다.
- 추천 작업은 현재 handoff intent가 있으면 그것을 쓰고, 없으면 `툴 만들기`를 기본 추천으로 둔다.
- 목표 목록은 `home-navigation-dock`으로 낮추고 상태 요약은 별도 strip으로 유지한다.
- CSS는 desktop 2열, 960px 이하 1열, 720px 이하 텍스트 정상 줄바꿈을 보장한다.
- static test, check, customer build, performance budget, Browser smoke로 검증한다.

## 결정

- 언어/런타임은 기존 Next.js/React/TypeScript를 유지한다.
- 새 UI 라이브러리를 설치하지 않고 기존 CSS token, lucide icon, task intent 모델을 재사용한다.
- 전체 navigation shell을 한 번에 재작성하지 않고 Overview 첫 화면을 고충격 slice로 먼저 바꾼다.

## 위험과 대응

- 추천 카드가 또 다른 카드 과밀을 만들 수 있다: 기존 `core-home-panel` frame을 제거하고 focus band/dock/status strip으로 분리한다.
- 모바일에서 단계 텍스트가 좁게 깨질 수 있다: 960px 이하 1열, 720px 이하 단계 텍스트 normal wrap을 적용한다.
- 목표 클릭 흐름이 퇴행할 수 있다: 기존 `data-task-intent`와 `item.run` route를 유지한다.

# 스펙: Overview UX 내비게이션 개선

## 목적

Workspace Monitor는 기능이 많아질수록 사용자가 현재 상태와 다음 행동을 빠르게 찾기 어려워진다. Overview 상단은 현재 선택 섹션, 주의 상태, 다음 행동, 근거 문서, runtime 진입점을 한 번에 보여주는 운영 작업면이어야 한다.

## 기능 범위

- section tab에 각 섹션의 상태 또는 수량 badge를 표시한다.
- view mode selector와 filter toolbar 사이에 `operator-strip`을 배치한다.
- `operator-strip`은 현재 섹션, workspace attention 상태, primary action, 다음 decision/action, web search/evaluation count, Desktop runtime shortcut을 제공한다.
- action button은 해당 섹션으로 직접 이동해야 한다.
- mobile layout에서는 operator action이 폭을 채워 터치하기 쉬워야 한다.

## 비목표

- 새 데이터 저장소를 추가하지 않는다.
- client-side UI 표시를 보안 경계로 취급하지 않는다.
- Overview의 기존 command center, evidence panel, mode switchboard를 제거하지 않는다.

## 수용 기준

- 탭마다 badge가 렌더링된다.
- `operator-strip`이 attention tone별 icon color와 shortcut button을 렌더링한다.
- `npm run check`, `npm test`, `npm run build`, desktop customer bundle build가 통과한다.
- 정적 build 또는 브라우저 smoke에서 `operator-strip`, `Runtime`, `Workspace status and actions`가 확인된다.

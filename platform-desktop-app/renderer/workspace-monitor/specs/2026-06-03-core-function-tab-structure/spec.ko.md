# 스펙: 핵심 기능 탭 구조

## 목적

Workspace Monitor는 기능이 많아지면서 핵심 기능 위치와 보조 탐색 탭이 한 줄에 섞여 보였다. 첫 화면에서 사용자가 "무엇을 어디에서 하는지"를 즉시 파악하도록 핵심 기능을 별도 rail로 노출하고, 섹션 탭은 기능군별로 묶는다.

## 범위

- `Overview`, `Desktop`, `Intent Map`, `Agents`, `Structure`를 핵심 기능 rail로 노출한다.
- 기존 flat section tabs를 `핵심 실행`, `작업공간`, `근거와 지식` 기능군으로 묶는다.
- 각 탭에는 짧은 label, count/status badge, 목적 tooltip을 제공한다.
- Overview에는 `Core Functions` 패널을 추가해 핵심 기능 위치를 다시 한 번 보여준다.
- view mode에 허용되지 않은 섹션은 핵심 rail과 grouped tabs에서 숨긴다.
- 모바일에서도 탭 label을 숨기지 않고 1열 layout으로 전환한다.

## 비목표

- 새 snapshot 데이터 계약을 만들지 않는다.
- 고객 snapshot의 보안 경계를 client-side tab 숨김으로 대체하지 않는다.
- 섹션별 상세 화면의 기능을 재작성하지 않는다.
- 대규모 컴포넌트 분리는 이번 slice에서 하지 않는다.

## 수용 기준

- 상단에 `core-feature-rail`이 렌더링되고 핵심 기능으로 직접 이동한다.
- 기존 섹션 탭이 기능군별 `section-tab-groups`로 렌더링된다.
- Overview에 `Core Functions` 패널이 표시된다.
- user view mode에서는 허용된 섹션만 보이고 developer/superadmin에서는 내부 기능 탭이 보인다.
- `npm test`, `npm run check`, `npm run build`, `npm run perf:budget`, desktop customer bundle build가 통과한다.

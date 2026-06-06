# Evaluation: Clear Tab Discrimination

## 평가 기준

- 활성 탭과 비활성 탭이 색상만이 아니라 형태/indicator로 구분되는가.
- 주요 tab-like controls에 selected 상태 계약이 남는가.
- 실제 DOM/브라우저에서 selected indicator가 computed style로 확인되는가.
- 기존 기능, scroll 정책, build/package 흐름을 깨뜨리지 않는가.

## 평가 결과

- selected tab token과 `::before` indicator가 추가됐다.
- active tab은 `opacity: 1`, 4px indicator, selected border, selected shadow를 갖는다.
- inactive tab은 indicator opacity `0`이며 별도 inactive shadow/background를 유지한다.
- settings top tabs와 source editor draft tabs는 `aria-selected`를 갖는다.
- 정적 테스트와 Browser computed-style check, internal package build가 통과했다.

## 잔여 리스크

- 설정 모달 클릭 검증은 브라우저 세션에서 attach 타이밍 충돌이 있었으나, 정적 계약과 visible tab rail computed-style로 selected indicator 동작은 확인됐다.
- public release readiness의 기존 signing, notarization, updater, clean-machine smoke test 경고는 별도 범위다.

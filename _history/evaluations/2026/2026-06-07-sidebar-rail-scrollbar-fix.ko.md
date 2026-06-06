# Evaluation: Sidebar Rail Scrollbar Fix

날짜: 2026-06-07

## 평가

사용자의 사이드바 옆 이상한 스크롤 문제는 activity rail nav의 안정 scrollbar gutter와 고정 button width가 좁은 rail에서 만드는 phantom horizontal overflow로 판단했다. React 구조를 바꾸지 않고 CSS contract를 조정해 해결했다.

## 결과

- `.activity-rail nav`의 가로 overflow를 숨기고 세로 overflow만 허용했다.
- rail nav의 `scrollbar-gutter`를 `auto`로 되돌려 기본 상태의 불필요한 gutter를 없앴다.
- collapsed nav button을 `min(100%, 58px)`로 제한했다.
- expanded nav button은 `width: 100%`로 expanded rail 내부에 맞췄다.
- CSS contract 테스트를 추가했다.

## 검증

- renderer check 통과.
- renderer test 90개 통과.
- Browser smoke 통과: 기본 1280x720과 짧은 1280x520 모두 horizontal overflow 없음.
- dev server와 Browser tab cleanup 확인.
- collect, renderer production build, customer bundle audit 통과.
- platform check 통과. 기존 public release signing/notarization/updater/clean-machine smoke gate는 public 배포 gate로 남았다.
- omission guard, resource guard, work timer check, work evaluator 통과.

## 남은 위험

- 전체 사이드바 정보구조 재배치는 포함하지 않았다.
- packaged Tauri binary에서의 OS scrollbar 렌더링은 이번 Browser smoke 범위 밖이다.

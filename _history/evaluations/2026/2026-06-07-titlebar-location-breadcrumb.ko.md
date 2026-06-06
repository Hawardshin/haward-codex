# Evaluation: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 평가

사용자의 `사용자 헷갈리지 않게 직관성 개선` 요청은 titlebar의 현재 위치 인식 개선으로 처리했다. 도움말 문구를 늘리지 않고, 사용자가 보고 있는 화면의 홈, 기능 그룹, 현재 섹션 관계를 바로 볼 수 있게 했다.

## 결과

- titlebar에 `홈 > 기능 그룹 > 현재 섹션` breadcrumb 추가.
- 현재 섹션에 `aria-current="page"` 추가.
- breadcrumb home은 기존 overview section activation lifecycle을 재사용한다.
- 클릭 가능한 breadcrumb 영역만 no-drag 처리했다.
- 960px 이하에서 root/shell 최소폭을 해제해 모바일 미디어 규칙이 실제 viewport에서 동작하게 했다.
- breadcrumb와 모바일 width reset 구조 테스트 추가.

## 검증

- renderer check 통과.
- renderer test 90개 통과.
- collect 통과.
- renderer production build와 customer bundle audit 통과.
- platform check 통과. 기존 public release signing/notarization/updater/clean-machine smoke gate는 public 배포 gate로 남았다.
- Browser smoke 통과: 초기 breadcrumb, tools 이동 후 trail 갱신, home 클릭 복귀, 모바일 390x844 overflow 없음, dev server cleanup 확인.
- omission guard, resource guard, work timer check, work evaluator 통과.

## 남은 위험

- packaged Tauri binary의 실제 window drag는 이번 Browser smoke 범위 밖이다.
- 전체 정보구조 재설계는 포함하지 않았다.

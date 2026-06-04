# 2026-06-05 직관성 개선 웹 검색

## 질의

- `Nielsen Norman Group recognition rather than recall user interface design`
- `Material Design navigation actions menus user interface guidelines`
- `Apple Human Interface Guidelines menus controls layout clarity`

## 확인한 출처

- Nielsen Norman Group heuristic summary PDF: recognition rather than recall, minimalist design 원칙을 확인했다.
- Material Design navigation/menu 문서: 주요 이동은 예측 가능한 직접 navigation으로 두고, menu는 보조 action에 쓰는 기준을 확인했다.
- Apple Human Interface Guidelines menus 문서: 메뉴는 현재 view/task와 관련된 소수 action에 적합하며, submenu는 복잡도를 높인다는 기준을 확인했다.

## 계획 영향

- 섹션 이름을 기억해야 하는 UI보다 "하고 싶은 일" 기반 진입점을 먼저 노출하기로 했다.
- Overview 첫 화면과 command palette가 같은 목표 언어를 쓰게 해 recall 부담을 줄였다.
- 모바일 Overview에서는 상단 진단/필터보다 목표 선택을 먼저 보이게 했다.

## 불확실성

- 실제 사용자의 최빈 작업 순서는 아직 계측 데이터가 부족하다. 이번 변경은 reversible UI route 추가이며, 추후 사용 로그나 사용자 피드백으로 순서 조정이 필요하다.

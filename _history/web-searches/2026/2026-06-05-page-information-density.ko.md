# 웹 검색 기록: Page information density

- 날짜: 2026-06-05
- 요청: 한 페이지에 너무 많은 정보가 있으면 괴롭다는 UI 피드백을 Workspace Monitor에 반영.

## 검색

- `W3C cognitive accessibility information overload progressive disclosure interface design`
- `Nielsen Norman Group progressive disclosure cognitive load user interface`
- `Material Design progressive disclosure information architecture dense screens`

## 확인한 출처

- W3C WAI cognitive accessibility pattern, important actions and information: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p04-page-important/
- Material Design density guidance: https://m2.material.io/develop/web/supporting/density
- Progressive disclosure reference summary with NN/g pointer: https://concepts.dsebastien.net/articles/r4o9b/

## 계획 영향

- 초기 화면에는 주 작업대와 직접적인 실행 선택만 남긴다.
- 진단, 기록, 인벤토리, 생성기, 협업판처럼 보조 판단을 요구하는 패널은 기본 접힘 disclosure로 이동한다.
- 보조 정보는 삭제하지 않고, 명명된 summary를 통해 사용자가 원할 때 한 단계 더 들어가게 한다.

## 불확실성

- 현재 변경은 Agents와 Desktop Runtime의 고밀도 영역을 우선 줄인다.
- Source editor 같은 작업 자체가 복합적인 화면은 별도 UX slice에서 더 깊은 정보 구조로 나누는 것이 남은 개선 여지다.

## 공개 판단 요약

- 사용자가 처음 보는 페이지는 하나의 주 작업을 중심으로 구성한다.
- 한 섹션에서 여러 기능군을 모두 펼치는 대신, 세부 기능군은 닫힌 disclosure 아래로 내린다.

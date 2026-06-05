# Scroll Scope Color Speed 스펙

## 요구사항

- REQ-WM-070: 화면별 작업 범위의 스크롤을 분리하고, 절제된 scrollbar 색상과 필요한 성능 격리, 화면 밖 애니메이션 정지를 적용해야 한다.

## 사용자 결과

- 전체 페이지를 스크롤할 때 rail, 설정, 터미널, 소스 탐색, Tool Studio 내부 목록/상세/환경 영역이 서로 덜 끌려 다닌다.
- 스크롤바는 과하게 튀지 않지만 어느 영역이 스크롤 가능한지 인지할 수 있다.
- Tool Studio의 3D 협업 장면은 화면 밖에 있을 때 프레임 루프를 멈춰 스크롤과 버튼 반응을 방해하지 않는다.

## 설계 결정

- 스크롤 가능 영역을 공통 selector contract로 묶어 `overscroll-behavior: contain`, `scrollbar-gutter: stable`, `scrollbar-color`를 적용한다.
- 리스트/터미널/소스/Tool Studio 내부 스크롤 영역에는 `contain: layout paint style`을 적용해 repaint 범위를 줄인다.
- scrollbar 색상은 surface/line과 연결된 semantic token으로 관리한다.
- Tool Studio 3D canvas는 `IntersectionObserver`, `document.hidden`, `prefers-reduced-motion`을 사용해 보이지 않거나 motion을 줄여야 할 때 animation frame을 취소한다.

## 비목표

- 모든 페이지 구조 전면 재배치
- 새 UI 라이브러리 또는 성능 라이브러리 설치
- generated snapshot 정리
- 서버 측 데이터 모델 변경

# Requirements: Sidebar Rail Scrollbar Fix

날짜: 2026-06-07

## 요청

사용자가 사이드바 옆에 이상한 스크롤이 생기지 않게 UI 크기를 조절해 달라고 요청했다.

## 요구사항

- 좌측 activity rail의 nav 영역은 버튼 폭 때문에 가로 스크롤을 만들지 않아야 한다.
- 짧은 viewport에서 nav 항목이 실제로 넘칠 때만 세로 스크롤을 허용해야 한다.
- collapsed rail의 버튼은 nav 가용 폭 안으로 줄어들어야 한다.
- expanded rail의 버튼은 기존 라벨 표시 폭을 유지하면서 컨테이너 폭을 넘지 않아야 한다.
- renderer 테스트와 Browser smoke로 overflow contract를 검증해야 한다.

## 범위

- 포함: workspace monitor activity rail CSS, 관련 구조 테스트, 검증/기록.
- 제외: 전체 사이드바 정보구조 재설계, 새 라이브러리 설치, native shell 변경.

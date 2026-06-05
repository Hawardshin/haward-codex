# 누락 점검: Premium Apple Design System

## 사용자 요구

- Apple 수준의 고급 디자인 기준을 찾아보고 전체 디자인을 정돈한다.

## 점검

- [x] 웹 검색 먼저 수행
- [x] Apple HIG/Design Resources/Fonts 근거 기록
- [x] 대범위 요청 분해 및 제외 범위 기록
- [x] 요구사항 REQ-WM-075 추가
- [x] 기존 REQ-WM-074 요구사항 표 누락 보정
- [x] CSS token/material 구현 반영
- [x] test/check/build/perf/build:customer 검증
- [x] desktop/mobile visual smoke와 screenshot artifact 생성
- [x] resource cleanup 기록
- [x] 생성 snapshot JSON은 이번 커밋에서 제외

## 남은 위험

- 이번 변경은 CSS token/material pass이며 모든 세부 화면의 구조 재설계는 아니다.
- in-app Browser 도구가 현재 세션에 노출되지 않아 Playwright static export smoke로 대체했다.

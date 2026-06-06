# 요구사항: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 요구

사용자가 앱에서 현재 어디에 있는지 헷갈리지 않도록 직관성을 개선한다. 기존 titlebar는 보기 모드와 섹션명을 표시하지만, 홈, 기능 그룹, 현재 섹션의 관계가 한눈에 이어지지 않는다.

## 수용 기준

- titlebar는 현재 위치를 `홈 > 기능 그룹 > 현재 섹션` 구조로 표시한다.
- 현재 섹션 항목은 `aria-current="page"`로 보조기기에 전달한다.
- `홈` 항목은 기존 `openSection("overview")` 경로로 바로 돌아간다.
- breadcrumb는 기존 titlebar/drag region 구조를 해치지 않고, 클릭 가능한 항목만 no-drag 처리한다.
- 좁은 화면에서 breadcrumb 텍스트는 줄바꿈 또는 말줄임으로 컨테이너를 밀어내지 않는다.
- 960px 이하 viewport에서는 앱 root/shell 최소폭을 해제해 모바일용 미디어 규칙이 실제로 적용된다.
- 구조 테스트와 Browser smoke로 현재 위치 표시, 홈 클릭, 모바일 overflow를 검증한다.

## 비범위

- 새 route 시스템 도입.
- 전체 정보구조 재설계.
- 새 native command 추가.
- 새 dependency 설치.

# 2026-06-05 Visual Design Foundation 웹 검색

## 질의

- `Apple Human Interface Guidelines visual design color typography layout official`
- `Material Design 3 foundations color typography layout official`
- `IBM Carbon Design System color typography layout official`
- `Nielsen Norman Group aesthetic minimalist design heuristic official`
- `site:m3.material.io foundations color typography layout Material 3 official`
- `site:carbondesignsystem.com guidelines color typography IBM Plex official`
- `site:nngroup.com aesthetic minimalist design heuristic official`

## 확인한 출처

- Apple Human Interface Guidelines: visual hierarchy, layout, color, platform control consistency를 UI 기준으로 삼았다.
- Material Design 3 foundations/style 문서: color, typography, layout을 foundation token으로 다루는 방향을 확인했다. 일부 페이지는 JS requirement 때문에 본문 추출이 제한되어 URL 검증 수준으로 기록한다.
- Carbon Design System color/typography: product UI에서 neutral surface, type token, interaction state, accessible contrast를 일관되게 다루는 기준을 확인했다.
- NN/g 10 usability heuristics: aesthetic and minimalist design은 primary goal을 지원하고 불필요한 정보를 줄이는 원칙이라는 점을 확인했다.

## 계획 영향

- Overview의 디자인 설명 문구를 실제 작업 목표와 detail로 교체한다.
- shell/titlebar/rail/home focus surface가 같은 surface, line, shadow, type rhythm token을 쓰게 한다.
- 주 작업면과 보조 dock/status의 시각 위계를 분리한다.
- 모바일에서는 제목 크기를 명시적으로 낮추고 one-column reflow를 유지한다.

## 불확실성

- 이번 변경은 전체 앱의 모든 상세 화면까지 재설계하지 않는다.
- Material 3 웹 페이지 일부는 JavaScript 요구로 본문 확인이 제한되어 Carbon/Apple/NNG 확인 내용을 더 강한 실행 기준으로 삼았다.

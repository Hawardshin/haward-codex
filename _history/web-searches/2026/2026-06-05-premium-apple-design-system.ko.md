# 2026-06-05 Premium Apple Design System 웹 검색

## 질의

- `Apple Human Interface Guidelines visual design color typography layout official`
- `Apple Human Interface Guidelines buttons controls menus official`
- `Apple Design Resources official Human Interface Guidelines`
- `site:developer.apple.com/design/human-interface-guidelines "visual hierarchy" "Human Interface Guidelines"`
- `site:developer.apple.com/design/human-interface-guidelines "Typography" "Human Interface Guidelines"`

## 확인한 출처

- Apple Human Interface Guidelines: hierarchy, harmony, consistency를 핵심 기준으로 확인했다. 특히 clear visual hierarchy, platform convention, window/display size adaptation을 계획 기준으로 삼았다.
- Apple Design Resources: 공식 design template, icon production template, color guide, font, SF Symbols 같은 consistency 자원을 제공한다는 점을 확인했다.
- Apple Fonts: San Francisco는 Apple 플랫폼 system font이고 다양한 크기에서 legibility를 목표로 설계됐으나, Apple font license는 Apple platform UI mockup/use 제약이 있으므로 제품 번들 폰트는 기존 self-hosted Pretendard를 유지한다.

## 계획 영향

- `globals.css`의 light/dark token을 neutral Apple-like base로 재조정한다.
- 반복 surface에는 glass/chrome/elevated material 계층을 공통 적용한다.
- primary action은 명확한 blue + white foreground로 유지하고 dark 3D/terminal surface에는 흰색 foreground 계열을 유지한다.
- visual polish는 CSS token 중심으로 적용해 JS 초기 chunk와 탭/버튼 응답 비용을 늘리지 않는다.

## 약한 출처와 제외

- 비공식 Apple HIG mirror, 블로그, 커뮤니티 글은 공식 문서가 확인된 항목의 보조 발견 신호로만 취급하고 계획 근거에서 제외했다.

## 불확실성

- Apple 최신 HIG 페이지 일부는 JavaScript 기반이라 본문 라인 추출이 제한된다. 검색 결과와 공식 Apple Developer 페이지 URL 확인을 기준으로 삼고, 적용은 모방이 아니라 hierarchy/consistency 원칙과 public design resources 방향에 한정한다.

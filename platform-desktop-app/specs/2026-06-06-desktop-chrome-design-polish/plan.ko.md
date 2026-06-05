# 데스크톱 크롬 디자인 개선 계획

## 근거

- Apple HIG: 데스크톱 앱은 친숙한 control/content 관계와 명확한 visual hierarchy가 필요하다.
- Fluent 2: elevation, neutral hierarchy, design token은 복잡한 업무 UI에서 스캔성과 상태 인지를 높인다.
- WCAG 2.2: focus appearance와 target size는 키보드/포인터 조작의 기본 안전선이다.

## 단계

1. 웹 기준과 현재 CSS/test 구조 확인.
2. 공통 shadow/elevation/press/highlight 토큰 추가.
3. 레일, titlebar, section tabs, panel, shared button 상태 연결.
4. 정적 테스트에 디자인 계약 추가.
5. 요구사항, 스펙, 검증 기록 작성.
6. renderer/app 테스트, build, package, Browser smoke 실행.
7. 평가/요약/추적 기록 작성 후 commit/push.

## 리스크와 완화

- 리스크: 과한 그림자나 움직임으로 앱이 산만해질 수 있다.
- 완화: elevation은 핵심 크롬과 선택 상태에만 제한하고 radius는 기존 8px 체계를 유지한다.
- 리스크: system dark theme 토큰 누락으로 밝은 선택 배경이 섞일 수 있다.
- 완화: `theme-dark`와 `theme-system` dark media 양쪽에 토큰을 정의한다.

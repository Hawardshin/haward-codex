# 계획: 버튼 클릭 타깃 크기 정리

1. 웹 접근성/플랫폼 UI 기준을 확인한다.
2. 기존 CSS에서 40px 미만의 실제 button selector를 찾는다.
3. 버튼 크기를 공통 토큰으로 정리하고, mobile/coarse pointer 변수를 추가한다.
4. 장식 pill과 상태 icon은 버튼 토큰 변경 대상에서 제외한다.
5. TypeScript/CSS 관련 검증, 테스트, build, localhost smoke를 수행한다.

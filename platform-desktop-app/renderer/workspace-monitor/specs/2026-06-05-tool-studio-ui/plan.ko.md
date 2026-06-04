# 구현 계획

1. Radix/Three.js 설치 감사 기록을 작성한다.
2. `three`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-context-menu`를 exact dependency로 설치한다.
3. `SectionId`와 section registry에 `tools`를 추가한다.
4. Tool Studio 컴포넌트를 별도 파일로 구현한다.
5. Radix dropdown/context menu와 keyboard shortcuts를 Tool Studio에 연결한다.
6. Three.js 3D 협업 canvas를 lazy import와 cleanup으로 구현한다.
7. CSS로 split scroll, stable button size, no broken text wrapping, restrained color system을 추가한다.
8. 회귀 테스트와 Playwright smoke를 실행한다.

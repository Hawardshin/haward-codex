# 웹 검색 기록: Smooth Redesign Maintenance

## 질의

- `React official code splitting lazy Suspense documentation`
- `Next.js official lazy loading dynamic import documentation`
- `Apple Human Interface Guidelines motion navigation sidebars macOS official`
- `Material Design navigation information architecture tabs official`

## 확인한 출처

- React, Code-Splitting: https://legacy.reactjs.org/docs/code-splitting.html
- React, `lazy`: https://react.dev/reference/react/lazy
- Next.js, Lazy Loading: https://nextjs.org/docs/app/guides/lazy-loading
- Apple Human Interface Guidelines, Motion: https://developer.apple.com/design/human-interface-guidelines/motion
- Material Design, Navigation: https://m3.material.io/foundations/navigation/overview

## 계획 영향

- 초기 로드와 탭 전환 체감 속도는 heavy render를 first paint 뒤로 미루고, 필요할 때 로드하는 구조를 유지한다.
- UI motion은 `opacity`/`transform` 중심으로 제한하고 reduced-motion 사용자를 존중한다.
- 탭 하나에 여러 기능을 과하게 담기보다 핵심 탭과 Operator Center 분리를 유지하며 depth를 더 탄다.

## 불확실성

- 공식 디자인 문서는 구체 구현 숫자를 강제하지 않는다. 실제 acceptance는 local Playwright smoke와 perf scripts로 검증했다.

# 웹 검색 기록: Workspace Monitor 성능 예산

## 검색 일시

- 날짜: 2026-06-02
- 요청: Workspace Monitor와 관련 코드를 전체적으로 분석해 속도를 개선하고 빠른 속도를 유지한다.

## 쿼리

- `Next.js App Router performance lazy loading dynamic imports official docs`
- `React useMemo useDeferredValue performance official docs`
- `Next.js bundle analyzer optimize package imports official docs`
- `Next.js optimizePackageImports next.config.js lucide-react docs nextjs.org`
- `Tauri v2 performance best practices official docs`

## 확인한 출처

- Next.js lazy loading official docs: https://nextjs.org/docs/app/guides/lazy-loading
- Next.js `optimizePackageImports` official docs: https://nextjs.org/docs/pages/api-reference/config/next-config-js/optimizePackageImports
- React `useDeferredValue` official docs: https://react.dev/reference/react/useDeferredValue
- Tauri process model official docs: https://v2.tauri.app/concept/process-model/
- Reddit/커뮤니티 신호: Next.js performance 관련 글은 adoption/risk discovery 신호로만 사용하고 사실 근거로 사용하지 않았다.

## 계획 영향

- Next.js 공식 문서는 Client Component와 library lazy loading이 초기 JavaScript를 줄이는 방법이라고 설명하므로, 대용량 snapshot을 client bundle에서 빼고 loader + dynamic import 구조를 선택했다.
- React 공식 문서는 `useDeferredValue`를 렌더링 지연 최적화로 설명하므로, 검색 입력 처리에 적용했다.
- `lucide-react`는 `optimizePackageImports` 적용 대상에 포함되므로 Next config에 실험 설정을 추가했다.

## 불확실성

- snapshot JSON 자체는 여전히 약 6MB다. 이번 작업은 초기 JavaScript chunk 회귀를 막는 slice이며, JSON sharding/compression/cache 전략은 후속 과제다.

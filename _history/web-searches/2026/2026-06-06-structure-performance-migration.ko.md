# 웹 검색 기록: 구조/메모리/성능 마이그레이션

## 검색어

- `Tauri v2 performance best practices Rust WebView memory official docs`
- `Next.js static export performance bundle optimization official docs`
- `React performance useMemo memo lazy Suspense official docs`
- `Rust rayon performance thread pool CPU IO bounded official docs`
- `Tauri v2 state management official docs managed state`
- `Tauri v2 process model WebView Rust backend official docs architecture`
- `Next.js optimizePackageImports official docs`
- `React useSyncExternalStore official docs external store performance`

## 확인한 출처

| 출처 | 유형 | 반영 |
| --- | --- | --- |
| https://v2.tauri.app/concept/process-model/ | 공식 문서 | Rust backend와 WebView frontend의 책임 분리를 평가 기준으로 사용 |
| https://v2.tauri.app/concept/architecture/ | 공식 문서 | system capability는 Rust backend command로 두는 방향 확인 |
| https://react.dev/reference/react/useMemo | 공식 문서 | memoization은 보조책이고 state boundary 축소가 우선이라는 판단 |
| https://react.dev/reference/react/memo | 공식 문서 | rerender 회피는 보장 아닌 최적화라 구조 분리를 우선 |
| https://react.dev/reference/react/lazy | 공식 문서 | lazy loading은 heavy UI 지연에는 유효하나 editor input churn 해결은 별도 |
| https://nextjs.org/docs/pages/guides/static-exports | 공식 문서 | static output에서 불필요한 client payload 축소 판단 |
| https://nextjs.org/docs/pages/api-reference/config/next-config-js/optimizePackageImports | 공식 문서 | 기존 lucide optimizePackageImports 유지 근거 |

## 계획 영향

- full source text를 static snapshot에 싣는 구조를 제거하고 Rust runtime read path를 source of truth로 유지했다.
- React memoization만 추가하는 대신 Monaco onChange state churn을 줄였다.
- 전면 재작성은 deferred migration으로 두고 hot path를 먼저 줄였다.

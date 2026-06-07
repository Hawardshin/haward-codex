# Web search: TypeScript file-size remediation

- 날짜: 2026-06-08
- 요청: 미뤄둔 것 전부 구현.

## 확인한 출처

- React 공식 문서: https://react.dev/learn/sharing-state-between-components
- React 공식 문서: https://react.dev/learn/managing-state
- TypeScript 공식 Handbook modules: https://www.typescriptlang.org/docs/handbook/2/modules.html
- Next.js static export 관련 공식 문서 후보: https://nextjs.org/docs

## 계획 영향

- 공유 상태는 상위 component에 유지하고 하위 UI/순수 로직만 분리한다.
- TypeScript 파일은 ES module 경계를 사용하고 type-only import/export를 우선한다.
- Next 정적 빌드와 workspace-monitor test/check를 검증 gate로 둔다.

## 불확실성

Next.js 문서는 검색 결과에서 archive/지역 mirror가 섞여 나왔으므로 최종 주장은 local `renderer:build` 결과를 우선 근거로 삼는다.

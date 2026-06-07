# 2026-06-07 source structure duplication removal web-first record

- 요청: 소스 구조에서 중복되는 부분을 제거한다.
- 검색 시각: 2026-06-07
- 쿼리:
  - `Rust module organization official book modules splitting code files`
  - `TypeScript modules official handbook re-export barrel modules`
  - `React official custom hooks reusing logic refactor duplicate component logic`
- 확인한 출처:
  - Rust 공식 문서: Control Scope and Privacy with Modules, https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html
  - TypeScript 공식 문서: Modules, https://www.typescriptlang.org/docs/handbook/2/modules.html
  - React 공식 문서: Reusing Logic with Custom Hooks, https://react.dev/learn/reusing-logic-with-custom-hooks
- 약한 출처:
  - 블로그/커뮤니티 글은 이번 구조 정리 결정에 필요하지 않아 사용하지 않았다.
- 계획 영향:
  - 실제 앱 로직을 크게 움직이기보다, 중복 정의된 소스 구조/검증 파일 목록을 먼저 하나의 manifest로 모은다.
  - Rust/TypeScript/React 구조는 기존 분리 방향을 유지하고, 검사 코드가 서로 다른 파일 목록을 들고 있는 문제를 제거한다.
- 공개 결정 요약:
  - `scripts/readiness/source-structure.mjs`를 새 단일 source manifest로 만들고 readiness/test/service checks가 재사용하게 한다.

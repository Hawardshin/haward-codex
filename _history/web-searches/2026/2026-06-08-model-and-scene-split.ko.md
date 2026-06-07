# Web search: model and scene split

- 날짜: 2026-06-08
- 요청: 미뤄둔 것 전부 구현.

## 확인한 출처

- React 공식 문서, state sharing/extraction: https://react.dev/learn/sharing-state-between-components
- TypeScript 공식 문서, modules/type-only imports: https://www.typescriptlang.org/docs/handbook/2/modules.html
- Three.js 공식 문서, WebGLRenderer dispose: https://threejs.org/docs/pages/WebGLRenderer.html
- Three.js manual, cleanup/dispose responsibility: https://threejs.org/manual/en/cleanup.html

## 계획 영향

- React 상태와 선택 로직은 기존 상위 component에 유지하고 scene side-effect만 hook으로 분리한다.
- TypeScript type model은 re-export shell을 두고 실제 타입 정의를 별도 module로 이동한다.
- Three.js scene 분리에서는 기존 resize, visibility, reduced-motion, dispose 처리를 유지한다.

## 불확실성

이 작업은 구조 분리이며 새 기능 주장을 하지 않는다. 검증은 TypeScript check, unit tests, Next build, customer bundle audit로 판단한다.

# 웹 검색 기록: EVAL report catalog structure

## 목적

사용자의 “소스코드 개선” 요청을 platform desktop app의 EVAL report 구조 개선으로 좁혀 구현하기 전에, UI/계산/정적 데이터 분리 원칙이 현재 React/TypeScript 공식 권장과 충돌하지 않는지 확인했다.

## 검색어

- `TypeScript official modules import export maintainability type-only imports`
- `React official keeping components pure extracting logic from components`
- `React official reusing logic with custom hooks pure functions component logic separation`
- `TypeScript official namespaces modules organizing code handbook`

## 확인한 주요 출처

- React, Keeping Components Pure: https://react.dev/learn/keeping-components-pure
- React, Reusing Logic with Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
- TypeScript, Modules reference: https://www.typescriptlang.org/docs/handbook/modules/reference
- TypeScript, Namespaces and Modules: https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html

## 약한 출처 처리

블로그와 Q&A는 이번 구현 결정에 필요하지 않아 근거로 사용하지 않았다. 공식 문서만으로 충분했다.

## 계획 영향

- React component는 렌더링을 중심으로 두고, 순수 계산과 정적 catalog는 feature-local TypeScript module로 분리한다.
- TypeScript module export/import를 사용해 catalog, model, panel의 의존 방향을 명확히 한다.
- 현재 slice는 새 런타임이나 외부 dependency를 설치하지 않는다.

## 불확실성

이 분리는 EVAL feature 내부 구조 개선이다. `MonitorShell.tsx` 같은 더 큰 orchestration component의 구조개선은 별도 slice가 필요하다.

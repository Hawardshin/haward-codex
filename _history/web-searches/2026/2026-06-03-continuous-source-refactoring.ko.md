# 웹 검색 기록: 지속 소스 구조 리팩터링

## 검색 목적

사용자의 “좋은 구조의 소스에서 좋은 결과가 나온다”는 지시를 지속 원칙과 실제 리팩터링으로 반영하기 전에, 동작 보존 리팩터링과 Node.js ESM 모듈 분리 기준을 확인했다.

## 검색 일시

- 날짜: 2026-06-03
- 작업 모드: `standard`

## 검색 쿼리

- `official refactoring modular code structure maintainability JavaScript testing best practices`
- `Node.js ES modules code organization official documentation`
- `Martin Fowler refactoring improving design of existing code modularization`
- `Node.js ECMAScript modules official documentation import export`
- `Martin Fowler refactoring improving design existing code behavior preserving`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| Martin Fowler, Refactoring, https://martinfowler.com/books/refactoring.html | 전문가/원전 | 리팩터링은 기존 코드 설계를 개선하되 작은 동작 보존 변화로 위험을 줄이는 방식이다. | 새 지속 지침에 behavior-preserving, scoped, tested 리팩터링 gate를 기록했다. |
| Node.js Documentation, ECMAScript modules, https://nodejs.org/api/esm.html | 공식 문서 | ESM은 JavaScript 재사용을 위한 공식 모듈 포맷이며 `import`/`export`로 모듈 경계를 구성한다. | `.mjs` collector에서 `scripts/lib/intent-feature-map.mjs`를 import/re-export하는 구조를 사용했다. |

## 약한 출처와 제외

- 일반 SEO성 “best practices” 글과 커뮤니티 토론은 이번 구현 판단 근거로 쓰지 않았다.
- Reddit/Stack Overflow는 ESM 사용 신호로만 보였고, 공식 Node.js 문서가 더 직접적인 기준이라 제외했다.

## 계획 영향

- 전체 저장소를 한 번에 재배치하지 않고, 테스트가 있는 `intentFeatureMap` 추출 책임만 별도 모듈로 분리한다.
- 기존 `collect-workspace.mjs` API를 re-export로 유지해 외부 동작을 보존한다.
- 리팩터링 결과는 test, snapshot collect, intent-map checker, TypeScript, build로 확인한다.

## 불확실성

- 이번 변경은 첫 번째 작은 구조 개선이며, collector의 다른 기능별 파서까지 모두 분리한 것은 아니다. 다음 기능 추가나 수정 때 같은 기준으로 반복 분리한다.

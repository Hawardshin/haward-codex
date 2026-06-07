# 2026-06-07 Task Run Store panel split 웹 검색 기록

## 검색 목적

새 이어서 구현 요청을 처리하기 전에 React/TypeScript 컴포넌트 분리와 Rust 모듈 분리 방향이 현재 구조 개선 작업과 맞는지 확인했다.

## 확인한 출처

- React 공식 문서, Passing Props to a Component: https://react.dev/learn/passing-props-to-a-component
- React 공식 문서, Using TypeScript: https://react.dev/learn/typescript
- Rust 공식 책, Separating Modules into Different Files: https://doc.rust-lang.org/stable/book/ch07-05-separating-modules-into-different-files.html

## 계획 영향

- 이번 조각은 상위 상태/액션을 props로 넘기고 화면 렌더링 책임을 별도 컴포넌트로 분리한다.
- Rust 쪽은 직전 slice에서 기능 모듈화를 진행했으므로, 이번에는 TypeScript UI 대형 파일 축소에 집중한다.

## 불확실성

- public 배포 blocker는 외부 signing/notarization/updater 환경값이 필요하므로 이번 UI 분리 범위에서 해소하지 않는다.

# 2026-06-07 데스크톱 provider/action feedback 분리 웹 검색 기록

## 검색 목적

- 데스크톱 앱 패키징 실패 복구 후 남은 대형 TypeScript/Rust 소스 분리 작업을 이어서 수행하기 전, React 컴포넌트 경계, TypeScript 모듈 경계, Rust 모듈 경계의 공식 기준을 확인했다.

## 확인한 출처

- React 공식 문서, Passing Props to a Component: https://react.dev/learn/passing-props-to-a-component
- TypeScript 공식 Handbook, Modules Reference: https://www.typescriptlang.org/docs/handbook/modules/reference.html
- Rust 공식 Book, Packages, Crates, and Modules: https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html

## 계획 영향

- React: 반복 UI와 상태 표시 렌더링을 props 기반 컴포넌트로 분리하는 방향을 선택했다.
- TypeScript: 공유 UI 타입은 새 컴포넌트 파일에서 export하고 `MonitorShell.tsx`가 import하도록 정리했다.
- Rust: Tauri invoke 명령명은 `lib.rs` 래퍼에 유지하고 provider 구현은 `features/providers.rs` 모듈로 옮기는 구조를 선택했다.

## 무시한 약한 출처

- 블로그, Q&A, 요약 글은 이번 작업에 직접 필요하지 않아 사용하지 않았다.

## 불확실성

- 공식 문서는 일반 원칙 확인 용도이며, 실제 안전성은 현 레포의 readiness/test/package 게이트로 검증했다.

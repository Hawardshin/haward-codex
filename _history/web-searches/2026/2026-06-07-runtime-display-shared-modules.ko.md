# 웹 우선 인테이크 기록

- 날짜: 2026-06-07
- 검색 목적: React/TypeScript 컴포넌트 분리와 Tauri 프런트엔드-백엔드 호출 경계 확인.
- 검색어:
  - `React official docs component composition extracting components props TypeScript`
  - `TypeScript official docs JSX React components typing`
  - `Tauri official docs invoke commands TypeScript Rust state`
- 확인한 주요 출처:
  - React 공식 문서, Using TypeScript: https://react.dev/learn/typescript
  - React 공식 문서, Your First Component: https://react.dev/learn/your-first-component
  - TypeScript 공식 문서, JSX: https://www.typescriptlang.org/docs/handbook/jsx
  - Tauri 공식 문서, Calling Rust from the frontend: https://v1.tauri.app/v1/guides/features/command
- 계획 영향:
  - JSX 렌더링 컴포넌트는 props 기반의 작은 함수 컴포넌트로 분리한다.
  - 런타임 순수 로직은 React 컴포넌트 파일 밖의 공통 유틸로 이동한다.
  - Tauri invoke 경계는 이번 변경에서 손대지 않고 기존 호출 계약을 유지한다.
- 불확실성:
  - 이번 검색은 구현 구조 기준 확인용이다. 실제 안전성은 로컬 TypeScript, 테스트, 패키징으로 검증한다.


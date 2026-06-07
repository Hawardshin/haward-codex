# 2026-06-07 데스크톱 검색 에이전트 패널 분리 웹 검색

## 쿼리

- React official docs passing props to a component extracting components
- TypeScript official docs type-only imports exports modules
- Rust official book modules split code into modules

## 확인한 출처

- React 공식 문서: https://react.dev/learn/passing-props-to-a-component
- TypeScript 공식 Modules Reference: https://www.typescriptlang.org/docs/handbook/modules/reference.html
- Rust 공식 Book 모듈 장: https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html

## 판단 요약

- React 컴포넌트 분리는 props로 상태와 이벤트를 주입하는 방식이 기존 `MonitorShell.tsx` 구조와 가장 잘 맞는다.
- TypeScript는 새 파일에서 폼/메시지/라우팅 타입과 기본값을 export하고, shell은 type-only import와 값 import를 함께 쓰는 형태가 유지보수에 적합하다.
- Rust 모듈 문서는 이번 추가 분리에서 새 Rust 코드를 만들 필요가 없다는 판단을 보강했다. 기존 `service_readiness.rs` 경계를 유지하고 `cargo check`로 확인하는 것이 충분하다.

## 계획 영향

- 검색 에이전트 채팅 UI와 모델 라우팅 헬퍼를 `components/features/SearchAgentWorkChatPanel.tsx`로 분리한다.
- 기존 readiness/test 스크립트는 이동한 UI 토큰을 새 파일까지 포함해 검사하도록 업데이트한다.
- 공개 배포 readiness 주장은 하지 않고 내부 package/run 검증까지만 완료 기준으로 둔다.


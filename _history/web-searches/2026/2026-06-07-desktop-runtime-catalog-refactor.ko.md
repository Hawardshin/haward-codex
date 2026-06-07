# 2026-06-07 데스크톱 런타임 카탈로그 분리 웹 확인

## 요청

- 사용자가 데스크톱 패키징 실패 수정 이후 "계속 구현", "이어서 구현"을 요청했다.
- 후속 구현 범위는 큰 TypeScript/Rust 소스 분리와 패키징 검증 유지다.

## 확인한 출처

- React 공식 문서: Sharing State Between Components, https://react.dev/learn/sharing-state-between-components
- TypeScript 공식 문서: Modules Reference, https://www.typescriptlang.org/docs/handbook/modules/reference.html
- Rust 공식 문서: Packages, Crates, and Modules, https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html

## 계획 영향

- React 상태는 가까운 공통 부모가 소유하고, 분리 컴포넌트에는 props/콜백으로 전달하는 기존 방향을 유지한다.
- TypeScript 분리는 값 export와 type import 경계를 명확히 두는 방식으로 진행한다.
- Rust 분리는 이미 적용한 `features/service_readiness.rs` 경계를 유지하고 추가 Rust 변경은 검증 중심으로 제한한다.

## 불확실성

- 공식 문서 수준의 구조 원칙만 확인했다. 이 저장소의 실제 계약은 로컬 테스트와 패키징 결과를 우선 근거로 삼았다.

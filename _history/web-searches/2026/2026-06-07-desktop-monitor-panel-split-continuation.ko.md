# 2026-06-07 desktop monitor panel split continuation web-first note

## 요청

- 사용자가 반복해서 "계속"을 보내지 않아도 되도록, 데스크톱 패키징 실패와 큰 TypeScript/Rust 소스 구조 문제를 계속 고치라고 요청했다.

## 검색 상태

- 이 기록은 같은 활성 목표의 이어진 실행 slice다.
- 앞선 slice에서 React 공식 문서와 Rust module 분리 공식 문서를 확인했고, 이번 slice는 같은 근거와 로컬 검증을 이어 사용했다.
- 추가 외부 사실이나 최신 버전 판단이 필요하지 않아 새 검색을 확장하지 않았다.

## 근거로 삼은 원칙

- React 컴포넌트는 props로 데이터를 전달해 UI 블록을 독립 단위로 분리한다.
- Rust 쪽은 이번 slice에서 새 구조 변경을 하지 않고, 이전에 분리한 `features/service_readiness.rs`, `features/providers.rs`가 전체 Rust test/build에서 계속 통과하는지 확인했다.

## 계획 영향

- `MonitorShell.tsx`의 기능 패널 JSX를 추가 분리한다.
- 이동된 UI 문자열이 readiness/test 계약에서 계속 보이도록 source aggregation을 같이 갱신한다.
- 마지막 검증은 사용자가 실패를 본 `desktop:package:run:internal` 전체 경로로 수행한다.

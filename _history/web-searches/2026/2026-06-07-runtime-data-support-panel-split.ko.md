# 2026-06-07 Runtime Data Support panel split 웹 검색 기록

## 검색 목적

새 이어서 구현 요청을 처리하기 전에 React/TypeScript 컴포넌트 분리 기준을 확인했다.

## 확인한 출처

- React 공식 문서, Common components: https://react.dev/reference/react-dom/components/common
- React 공식 문서, Component: https://react.dev/reference/react/Component
- React 공식 문서, Using TypeScript: https://react.dev/learn/typescript

## 계획 영향

- 상위 `MonitorShell`은 상태와 action callback을 유지하고, runtime data/support 화면 렌더링은 별도 props 기반 컴포넌트로 분리한다.
- public release blocker는 외부 signing/notarization/updater 환경값이 필요하므로 이번 UI 분리 범위에서 해소하지 않는다.

## 불확실성

- 없음. 이번 조각은 UI 구조 분리이며 런타임 command 동작은 변경하지 않는다.

# 웹 우선 인테이크 기록

- 날짜: 2026-06-07
- 검색 목적: React 상태/로직 분리와 TypeScript 모듈 export 기준 확인.
- 검색어:
  - `React official docs sharing state between components extracting state components`
  - `React official docs reusing logic with custom hooks`
  - `TypeScript official docs type aliases modules exports`
- 확인한 주요 출처:
  - React 공식 문서, Sharing State Between Components: https://react.dev/learn/sharing-state-between-components
  - React 공식 문서, Reusing Logic with Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
  - React 공식 문서, Managing State: https://react.dev/learn/managing-state
  - TypeScript 공식 문서, Modules Reference: https://www.typescriptlang.org/docs/handbook/modules/reference
- 계획 영향:
  - 상태 소유권은 `MonitorShell`에 유지하고, 순수 데이터/프롬프트 기본값만 모듈로 분리한다.
  - `DesktopRuntimePanel` 전체 이동 전에 의존성이 적은 프리셋/문구를 먼저 추출한다.
- 불확실성:
  - 웹 검색은 구조 기준 확인용이며 실제 안전성은 로컬 TypeScript, 테스트, 패키징으로 판단한다.


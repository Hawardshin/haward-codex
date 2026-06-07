# 2026-06-07 desktop package typecheck fix 웹 검색 기록

- 요청 요약: 내부 데스크톱 패키징 명령이 `refreshProviderCredentials` TypeScript 이름 해석 실패로 중단되어, TypeScript와 Rust 양쪽을 확인하고 큰 소스를 분리해 달라는 요청.
- 검색 시각: 2026-06-07
- 검색어:
  - `React useCallback official documentation dependency array`
  - `TypeScript cannot find name TS2304 official documentation`
- 확인한 출처:
  - React 공식 문서, `useCallback`: https://react.dev/reference/react/useCallback
  - TypeScriptPro TS2304 설명: https://typescriptpro.com/errors/ts2304
- 약한 출처/제외:
  - Stack Overflow와 Reddit 검색 결과는 일반 사례 확인용으로만 보고 구현 근거로 사용하지 않음.
- 계획 영향:
  - `useCallback`/`useEffect` 의존성에 들어가는 함수는 해당 컴포넌트 또는 훅 스코프에 실제로 선언되어야 하므로, 부모 스코프의 `refreshProviderCredentials`를 자식 패널에 명시 prop으로 전달하고 refresh 로직을 전용 훅으로 분리하는 방향을 선택함.
  - TS2304는 미선언 식별자 문제로 판단하고, 타입 우회나 전역 선언 추가 대신 실제 데이터 흐름을 복구함.
- 불확실성:
  - 검색은 React 훅/TS 오류 의미 확인에만 사용했고, 최종 검증은 로컬 타입 체크, 테스트, Rust 빌드, Tauri 패키징 결과를 기준으로 함.


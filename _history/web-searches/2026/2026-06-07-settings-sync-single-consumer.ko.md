# 2026-06-07 설정 동기화 단일 소비자 웹 검색

- 작업: 설정/provider 변경 이후 런타임 동기화 요청이 화면 활성 상태와 무관하게 일관되게 실행되도록 조정.
- 검색 시각: 2026-06-07 KST.
- 검색 쿼리:
  - `React custom hooks reuse stateful logic official docs`
  - `React synchronizing with effects custom hooks official docs`
- 확인한 주요 출처:
  - React 공식 문서 `Reusing Logic with Custom Hooks`: https://react.dev/learn/reusing-logic-with-custom-hooks
  - React 공식 문서 `Synchronizing with Effects`: https://react.dev/learn/synchronizing-with-effects
  - React 공식 문서 `Rules of Hooks`: https://react.dev/reference/rules/rules-of-hooks
- 계획 영향:
  - 동기화 실행 로직은 이미 `useSettingsRuntimeSync`에 모였으므로, 이번에는 request 소비 조건만 분리한다.
  - 화면 활성 상태(`surfaceActive`)는 polling/launch/update에 남기고, 설정 동기화 request 소비는 별도 `settingsSyncRequestConsumer`로 제어한다.
  - 중복 실행을 막기 위해 top-level settings/provider request는 desktop runtime panel 하나만 소비하게 한다.


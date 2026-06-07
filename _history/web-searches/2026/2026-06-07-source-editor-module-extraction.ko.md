# 2026-06-07 소스 에디터 모듈 분리 웹 검색 기록

## 검색 쿼리

- `React official docs code splitting lazy component best practices`
- `TypeScript official handbook modules project organization`
- `Tauri official docs commands state frontend architecture`

## 확인한 출처

- React `lazy`: https://react.dev/reference/react/lazy
- TypeScript Modules Handbook: https://www.typescriptlang.org/docs/handbook/modules.html
- Tauri Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/

## 계획 반영

- React 기준상 무거운 UI/패널은 동적 로딩 경계를 유지하고, 이번 작업은 렌더 경계가 아니라 정적 소스 에디터 설정/헬퍼 모듈 분리에 집중했다.
- TypeScript 모듈 경계 기준에 맞춰 `source-editor/index.ts` barrel을 추가해 호출부 import를 단일화했다.
- Tauri 프론트엔드-런타임 경계는 건드리지 않고, 소스 편집기 프론트엔드 설정만 분리했다.

## 불확실성

- 전체 `MonitorShell` 비대화는 아직 남아 있다. 이번 작업은 안전하게 검증 가능한 한 슬라이스만 완료했다.

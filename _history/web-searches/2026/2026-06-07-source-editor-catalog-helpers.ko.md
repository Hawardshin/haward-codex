# 2026-06-07 소스 에디터 catalog helper 분리 웹 검색 기록

## 검색 쿼리

- `React official docs useMemo derive filtered lists from state`
- `TypeScript official docs module imports exports type only imports`
- `React official docs keeping components pure calculations during render`

## 확인한 출처

- React Keeping Components Pure: https://react.dev/learn/keeping-components-pure
- React useMemo Reference: https://react.dev/reference/react/useMemo
- TypeScript Modules Handbook: https://www.typescriptlang.org/docs/handbook/2/modules.html

## 계획 반영

- 렌더 중 수행되는 파일 목록 선택, 필터링, 라벨 계산을 side effect 없는 pure helper로 분리했다.
- React `useMemo`는 유지하되 계산 본문을 source-editor 모듈로 이동했다.
- TypeScript type-only import를 사용해 `WorkspaceSourceFile` 타입 경계를 유지했다.

## 불확실성

- 다음 단계에서 파일 로드/저장 액션까지 hook으로 옮기려면 비동기 취소와 UI lock 경계 테스트가 더 필요하다.

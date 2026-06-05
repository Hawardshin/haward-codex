# 스펙: 구조/메모리/성능 마이그레이션

## 판정

현재 구조는 기능 누적을 빠르게 흡수했지만 장기 성능 구조로는 좋지 않다. 근본 개선 방향은 `Rust runtime owns heavy data`, `React UI owns bounded visible state`, `snapshot carries metadata not full source`, `large panels split by domain`이다.

## 이번 마이그레이션 범위

- `collect-workspace.mjs`의 source file snapshot을 full `content`에서 bounded `preview`/`previewBytes`로 바꾼다.
- `WorkspaceSourceFile` 타입에서 full `content`를 제거하고 preview 기반으로 전환한다.
- monitor 검색/복사 fallback은 `preview`를 사용한다. 실제 full source read/write는 Tauri runtime command 경로가 맡는다.
- `check-performance-budget.mjs`에 developer snapshot source content 금지와 preview byte budget을 추가한다.
- Monaco onChange는 `sourceDraftRef`에 즉시 저장하고, React state sync는 `SOURCE_DRAFT_UI_SYNC_MS`로 묶는다.
- save/copy/template/save-all은 editor buffer 또는 effective draft snapshot에서 최신 내용을 읽는다.

## 근거

- Tauri process model은 Rust backend와 WebView frontend를 분리한다: https://v2.tauri.app/concept/process-model/
- Tauri architecture는 WebView가 message passing으로 Rust backend capability를 호출하는 구조다: https://v2.tauri.app/concept/architecture/
- React `useMemo`/`memo`는 성능 최적화일 뿐 의미 보장이 아니므로, 큰 state boundary 자체를 줄이는 편이 우선이다: https://react.dev/reference/react/useMemo, https://react.dev/reference/react/memo
- React `lazy`/`Suspense`는 무거운 UI를 지연할 수 있지만, 입력 중 state churn 자체를 해결하지는 않는다: https://react.dev/reference/react/lazy
- Next.js static export와 bundle guidance는 불필요한 client JS/payload를 줄이는 방향을 권장한다: https://nextjs.org/docs/pages/guides/static-exports, https://nextjs.org/docs/pages/api-reference/config/next-config-js/optimizePackageImports

## 수용 기준

- generated developer snapshot의 `sourceFiles[].content` 수가 0이다.
- generated developer snapshot의 source preview total bytes가 220KB 이하이다.
- `workspace-monitor test/check`, `platform-desktop-app test/check`, internal package build가 통과한다.

## 다음 마이그레이션

1. `SourceWorkspacePanel` 파일 분리.
2. Runtime/terminal/task-run state external store 분리.
3. `src-tauri/src/lib.rs` command modules 분리.
4. `globals.css` feature stylesheet 분리.

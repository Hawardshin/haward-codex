# 계획: Source Loading Performance

## 작업 모드

- selected work_mode: ship_first
- 이유: 사용자가 체감 성능 문제 해결을 요청했으므로 먼저 동작하는 성능 fix를 적용하고, 비파괴적 문서/검증 기록을 뒤따라 남긴다.
- view_mode: superadmin_developer
- install_mode: developer

## Web-first Intake

- 검색어:
  - `React large file viewer performance virtualized list code editor lazy loading best practices`
  - `Monaco editor large file performance load model lazy syntax highlighting`
  - `web.dev virtualize large lists react-window official`
- 반영한 기준:
  - large list는 visible window만 렌더링하거나 lazy load해야 한다.
  - code editor/large file 경로는 불필요한 기능과 대량 DOM 렌더링을 줄여야 한다.

## 로컬 진단

- `DesktopRuntimePanel`은 runtime surface에서도 `refreshRuntimeSourceFiles()`를 호출했다.
- `WorkspaceExplorerPane`와 `source-file-browser`가 같은 filtered file list를 동시에 렌더링했다.
- `WorkspaceExplorerDirectoryView`는 모든 directory를 기본 expanded로 렌더링했다.

## 실행

1. Source surface가 아닌 경우 runtime source catalog 자동 scan을 생략한다.
2. Source surface는 `editor` view를 기본으로 두고 파일 선택은 Explorer에 맡긴다.
3. Source surface에서 오른쪽 flat file browser를 렌더링하지 않는다.
4. file select option을 filtered list로 제한한다.
5. source filter에 deferred value를 적용한다.
6. Explorer tree 기본 전개를 최상위 directory로 제한한다.
7. check, test, build, perf budget, localhost smoke를 실행한다.

## 비고

Browser MCP callable tool은 현재 검색되지 않아 in-app browser screenshot 검증은 실행하지 못했다. 대신 Next dev server와 HTTP smoke를 수행했다.

# 스펙: Source Loading Performance

## 목표

Workspace Monitor의 코드 불러오기 경로에서 불필요한 파일 catalog scan과 중복 렌더링을 줄여 Source 화면 진입과 파일 목록 표시를 빠르게 만든다.

## 요구사항

- `REQ-WM-029`

## 문제

- Desktop 런타임 surface가 열릴 때도 `refreshAdapters()` 후 `refreshRuntimeSourceFiles()`를 실행해 source catalog scan이 따라붙었다.
- Source 화면에서는 왼쪽 `WorkspaceExplorerPane`과 오른쪽 숨김 `source-file-browser`가 같은 파일 목록을 동시에 렌더링했다.
- Explorer tree는 모든 directory를 기본 expanded로 렌더링해 파일 수가 많을 때 초기 DOM이 커졌다.
- source filter 입력은 즉시 전체 파일 필터와 tree rebuild를 유발했다.

## 변경

- `DesktopRuntimePanel`의 source catalog refresh를 `surface="files"`인 Source 화면에만 자동 실행한다.
- Source 화면의 기본 작업 view를 `editor`로 두고, 파일 선택은 왼쪽 Explorer가 담당한다.
- Source 화면에서는 오른쪽 flat file browser를 렌더링하지 않는다.
- 파일 select option은 현재 표시 대상인 filtered list로 제한한다.
- source filter는 `useDeferredValue`를 적용해 입력 중 렌더 압박을 줄인다.
- Workspace Explorer directory는 최상위만 기본 expanded로 두고 하위 directory는 사용자가 펼칠 때 렌더링한다.

## 수용 기준

- Desktop 런타임 surface 진입이 source catalog scan을 자동으로 유발하지 않는다.
- Source 화면은 파일 목록을 두 번 만들지 않는다.
- Explorer tree는 전체 하위 directory를 기본 전개하지 않는다.
- 기존 TypeScript, source control design, scroll container checks가 통과한다.
- Next build와 performance budget이 통과한다.

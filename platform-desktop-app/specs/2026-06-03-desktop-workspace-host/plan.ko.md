# Desktop Workspace Host 계획

## 옵션 비교

- 옵션 A: 기존처럼 사용자가 외부에서 git clone 후 앱을 그 폴더에서 실행한다. 기각. 설치형 앱의 핵심 기능이 개발자 작업 방식에 묶인다.
- 옵션 B: 앱 안에서 workspace state를 저장하고 import/clone command를 제공한다. 선택. 기존 source editor/CLI 기능을 app-owned workspace 위로 옮길 수 있다.
- 옵션 C: libgit2 같은 Git library를 추가한다. 보류. 이번 slice는 dependency 설치 없이 bounded `git` capability로 충분하며, Git이 없으면 `capability_missing`으로 degrade할 수 있다.

## 구현 순서

1. Tauri backend에 workspace state report/import/clone command 추가.
2. source editor와 CLI working dir resolution을 app-selected workspace 우선으로 변경.
3. Workspace Monitor에 Workspace Host 패널 추가.
4. runtime contract, readiness, service readiness, requirements 갱신.
5. Rust/TypeScript/test/build/browser/evaluation 검증.

## 검증 대상

- `cargo check`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run runtime:contract`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor test`
- customer build/perf/customer bundle audit
- Browser smoke

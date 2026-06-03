# Web Search: Desktop Workspace Host

## 사용자 지시 요약

- 사용자가 현재 방식이 git clone 후 그 폴더에서 작업하는 구조에 특화되어 있으나, 해당 기능을 데스크톱 앱 안에 녹이겠다고 지시했다.

## 검색어

- `Tauri v2 opener plugin open path official docs`
- `Tauri v2 path app data directory official docs`
- `Git clone command official documentation`

## 확인한 출처

- Tauri Path API: `https://v2.tauri.app/reference/javascript/api/namespacepath/`
- Tauri Opener plugin: `https://v2.tauri.app/plugin/opener/`
- Git clone manual: `https://git-scm.com/docs/git-clone`

## 판단 요약

- Tauri의 app data path 모델은 active workspace profile과 managed workspace root를 제품 runtime data plane에 저장하는 방향과 맞는다.
- Git clone은 repository를 새 working tree로 복제하는 표준 Git 명령이다. 데스크톱 앱은 Git 자체를 필수 런타임으로 만들지 않고, `git`이 있을 때만 bounded clone capability로 제공하는 것이 기존 optional CLI adapter 원칙과 맞다.
- opener/native picker는 이후 OS별 folder picker를 붙일 때 참고할 수 있지만, 이번 slice는 dependency 추가 없이 absolute path import와 bounded clone command로 구현한다.

## 계획 반영

- `get_desktop_workspace_state`, `set_desktop_workspace_path`, `clone_desktop_workspace` Tauri commands를 추가한다.
- active workspace state는 `app_data/runtime-data/workspace-host/desktop-workspace-state.v1.json`에 저장한다.
- source editor와 CLI working dir resolution은 app-selected workspace를 우선 사용한다.
- Workspace Monitor Desktop에 `Workspace Host` 패널을 추가한다.

## 약한 출처

- 커뮤니티 글은 채택하지 않았다. 이번 결정은 공식 Tauri/Git 문서와 로컬 runtime contract에 근거했다.

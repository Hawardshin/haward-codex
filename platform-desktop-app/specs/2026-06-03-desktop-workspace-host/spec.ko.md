# Desktop Workspace Host 스펙

## 목표

- 사용자가 별도 터미널에서 `git clone`을 실행하고 그 폴더에서 도구를 띄우는 개발자 흐름에 의존하지 않게 한다.
- 설치형 데스크톱 앱이 workspace import, repository clone, active workspace selection, workspace state persistence를 소유한다.
- source editor와 CLI session/task pipe working directory는 앱이 선택한 workspace를 우선 사용한다.

## 기능

- `get_desktop_workspace_state`: app data에 저장된 active workspace state와 managed workspace root, Git capability를 반환한다.
- `set_desktop_workspace_path`: 기존 absolute workspace path를 app-owned workspace profile로 저장한다.
- `clone_desktop_workspace`: Git이 사용 가능할 때 repository를 app data managed workspace root로 bounded clone하고 active workspace로 선택한다.
- Workspace Monitor Desktop Runtime은 `Workspace Host` 패널에서 import/clone/status/state path/managed root/Git 상태를 보여준다.
- Runtime contract와 readiness/test는 workspace host command surface를 검증한다.

## 비범위

- native folder picker integration.
- full Git branch/commit/pull/push UI.
- credential helper, private token 저장, SSH key 관리.
- public clean-machine workspace smoke 완료 주장.

## 수용 기준

- 앱 안에서 기존 workspace를 import하거나 repository URL clone을 시작할 수 있다.
- app data에 `workspace-host/desktop-workspace-state.v1.json` state가 저장된다.
- source editor file listing과 CLI working dir resolution은 app-selected workspace를 우선 사용한다.
- Git이 없으면 clone은 `capability_missing`으로 degrade하고 앱 전체 실행을 막지 않는다.
- Rust/TypeScript/readiness/runtime contract/service readiness 검증이 통과한다.

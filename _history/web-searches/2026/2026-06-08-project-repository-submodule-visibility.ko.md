# 웹 검색 기록: project repository submodule visibility

- 날짜: 2026-06-08
- 요청 요약: Git으로 분리된 project들을 사용자가 쉽게 확인하고, 터미널/데스크톱 UI에서 계속 사용할 수 있게 구현.

## 검색 쿼리

- `Git official submodule update init recursive documentation`
- `Tauri official command invoke filesystem dialog documentation`
- `GitHub CLI official repo clone create documentation`

## 확인한 출처

| 출처 | URL | 신뢰도 | 반영 |
| --- | --- | --- | --- |
| Git submodule documentation | https://git-scm.com/docs/git-submodule | 높음 | `git submodule status --recursive`, `git submodule update --init --recursive` 진단 흐름에 반영 |
| GitHub CLI repo clone manual | https://cli.github.com/manual/gh_repo_clone | 높음 | clone/import UI가 repository URL을 다뤄야 한다는 기준으로 반영 |
| GitHub Docs cloning a repository | https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository | 높음 | 원격 repository를 로컬 workspace로 가져오는 사용자 작업 흐름 확인 |
| Tauri dialog plugin docs | https://v2.tauri.app/plugin/dialog/ | 높음 | 기존 Tauri workspace folder 선택 흐름이 import surface로 적합함을 확인 |

## 판단

- 이번 slice는 credential 저장이나 자동 submodule update 실행보다, 먼저 repository URL/submodule path/branch/doctor status를 사용자에게 명확히 보여주는 것이 안전하다.
- private repository 접근 실패는 destructive하게 고치지 않고 `awp doctor --json`과 UI에서 확인 가능한 상태로 남긴다.

## 계획 영향

- `platform-desktop-app` snapshot과 project-management UI에 repository metadata를 추가한다.
- `awp doctor --json`에 project repository list와 submodule summary를 추가한다.
- 검증은 renderer check/test, platform test/check, CLI doctor smoke, generated snapshot inspection으로 수행한다.

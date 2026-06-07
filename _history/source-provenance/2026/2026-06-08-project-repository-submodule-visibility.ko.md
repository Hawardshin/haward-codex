# Source provenance: project repository submodule visibility

- 날짜: 2026-06-08

## 내부 출처

- `_ops/projects/registry.json`
- `.gitmodules`
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- `platform-desktop-app/tools/awp/awp.py`

## 외부 출처

- Git submodule docs: https://git-scm.com/docs/git-submodule
- GitHub CLI repo clone manual: https://cli.github.com/manual/gh_repo_clone
- GitHub clone docs: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
- Tauri dialog plugin docs: https://v2.tauri.app/plugin/dialog/

## 적용

- Git submodule status는 mutation 없는 진단 명령으로만 사용했다.
- GitHub clone 흐름은 이미 존재하는 desktop clone/import UI와 repository URL 노출 기준으로만 반영했다.

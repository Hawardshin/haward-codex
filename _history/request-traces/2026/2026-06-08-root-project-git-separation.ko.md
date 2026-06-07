# 요청-결과 추적: root project Git 분리

- 날짜: 2026-06-08
- 요청: project들이 실제 Git으로 분리됐는지 확인하고, 분리되지 않았다면 구현.

## 결과

- `agent-platform/`, `agent-tool-desktop-app/`, `platform-desktop-app/`, `presentation-agent/`, `design-asset-library/`, `vscode-agent-workbench/`를 각각 private GitHub repository로 분리했다.
- root repository는 각 project를 submodule로 추적하도록 전환했다.
- `_ops/projects/registry.json`에 repository URL과 submodule model을 추가했다.

## 산출물

- `.gitmodules`
- `_ops/projects/registry.json`
- `_history/git-separations/2026/2026-06-08-root-project-git-separation.ko.md`
- `_requirements/changes/2026-06-08-root-project-git-separation.ko.md`
- `_specs/workspace-platform/2026-06-08-root-project-git-separation/`
- `_history/evaluations/2026/2026-06-08-root-project-git-separation-evaluation-input.json`

## 검증 예정/결과

- `gh repo view ... visibility`: 통과
- `git submodule status --recursive`: 통과
- 각 submodule `git status --short`: 통과
- root gitlink mode `160000`: 통과
- JSON syntax, docs audit, config contract, omission/resource/evaluation, diff check: 통과
- root commit/push: close-out에서 실행

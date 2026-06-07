# Traceability: root project Git repository separation

| 요구 | 구현/증거 | 검증 |
| --- | --- | --- |
| Project별 standalone Git repository | `Hawardshin/haward-codex-*` private repositories | `gh repo view ... visibility` |
| Root는 superproject로 project 경계 추적 | `.gitmodules`, gitlink mode `160000` | `git submodule status --recursive`, `git ls-files -s <project>` |
| Registry에서 Git 경계 확인 | `_ops/projects/registry.json` `repository_model` metadata | `python3 -m json.tool _ops/projects/registry.json` |
| 분리 기록 보존 | `_history/git-separations/2026/2026-06-08-root-project-git-separation.ko.md` | close-out review |
| 누락 방지와 평가 | `_history/omission-checks/...`, `_history/evaluations/...` | validator / JSON syntax |

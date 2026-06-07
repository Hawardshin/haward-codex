# Tasks: root project Git repository separation

| ID | 작업 | 상태 | 증거 |
| --- | --- | --- | --- |
| T1 | 분리 대상 root project 확정 | 완료 | `_ops/projects/registry.json` |
| T2 | Git 분리 방식 선택 | 완료 | `_history/web-searches/2026/2026-06-08-root-project-git-separation.ko.md` |
| T3 | private GitHub repositories 생성 | 완료 | `_history/git-separations/2026/2026-06-08-root-project-git-separation.ko.md` |
| T4 | project별 history split 및 push | 완료 | submodule SHA table |
| T5 | root repository submodule 전환 | 완료 | `.gitmodules`, mode `160000` gitlinks |
| T6 | generated/local-only ignore 정리 | 완료 | project-local `.gitignore` commits |
| T7 | registry와 trace records 업데이트 | 완료 | `_ops/projects/registry.json`, `_history/*` |
| T8 | validation 실행 | 완료 | validation record |
| T9 | root commit/push | close-out 진행 | final Git commit |

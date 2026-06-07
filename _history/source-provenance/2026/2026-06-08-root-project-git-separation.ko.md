# Source provenance: root project Git separation

- 날짜: 2026-06-08
- 내부 기준:
  - `AGENTS.md` root project and Git rules
  - `_ops/projects/registry.json`
  - `_history/web-searches/2026/2026-06-08-root-project-git-separation.ko.md`
- 외부 기준:
  - Git submodule official docs: https://git-scm.com/docs/git-submodule
  - Git worktree official docs: https://git-scm.com/docs/git-worktree.html

## 적용

- Submodule은 root superproject가 project repository commit을 추적하는 구조로 사용했다.
- Worktree는 같은 repository의 다중 working tree 기능이라 이번 project별 repository 분리 요구에는 채택하지 않았다.
- `git subtree split`은 현재 환경에서 project별 history branch를 만들기 위한 내장 Git 도구로 사용했다.

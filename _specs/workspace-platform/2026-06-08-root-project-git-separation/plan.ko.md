# Plan: root project Git repository separation

1. Web-first intake로 Git submodule/worktree/subdirectory split 옵션을 확인한다.
2. Root project registry에서 분리 대상 project를 확정한다.
3. 각 project directory를 `git subtree split`으로 standalone history branch로 만든다.
4. 각 project별 private GitHub repository를 생성하고 branch를 `main`으로 push한다.
5. Root repository에서 기존 project file tracking을 제거하고 submodule을 추가한다.
6. Submodule generated/local-only output을 project-local `.gitignore`로 정리한다.
7. Registry, audit, requirements, spec, validation, evaluation records를 업데이트한다.
8. Submodule status, gitlink mode, remote visibility, JSON syntax, diff whitespace를 검증한다.
9. Root superproject commit과 push를 완료한다.

# 요구사항 변경: project repository submodule visibility

- 날짜: 2026-06-08
- 변경 유형: desktop workspace usability / Git diagnostics

## 요구사항

Root project가 private Git submodule로 분리된 뒤, desktop project management surface와 companion CLI는 각 project의 repository URL, submodule path, branch, submodule readiness를 표시해야 한다.

## 수용 기준

- generated workspace snapshot의 project portfolio는 repository metadata를 포함한다.
- 프로젝트 카드와 상세 패널은 repository/submodule 상태를 보여준다.
- `awp doctor --json`은 `projectRepositories`, `submodules.summary`, `submodules.initCommand`를 포함한다.
- submodule access 문제는 자동 credential 저장 없이 진단 상태로 표시한다.

## 비범위

- GitHub token 저장
- private repo 권한 자동 부여
- destructive Git repair
- public release packaging

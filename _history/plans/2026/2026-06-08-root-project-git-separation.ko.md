# 실행 계획 기록: root project Git 분리

- 날짜: 2026-06-08
- 대상: registered root projects

## 선택지 비교

| 선택지 | 장점 | 단점 | 판단 |
| --- | --- | --- | --- |
| Root monorepo 유지 | 단순한 clone과 single commit | 사용자 요구인 project별 Git 분리와 맞지 않음 | 제외 |
| `git worktree` | 같은 repository branch 작업에는 유용 | project별 독립 remote repository가 아님 | 제외 |
| `git filter-repo` split | 정교한 history extraction | 현재 환경 설치 필요, 이번 범위에는 과함 | 보류 |
| `git subtree split` + submodules | Git 내장 기능으로 project history split 가능, root는 project pointer만 추적 | submodule onboarding과 권한 관리 필요 | 선택 |

## 실행 slice

- S1: project inventory and target repo naming
- S2: private GitHub repo creation
- S3: project history split and push
- S4: root submodule conversion
- S5: registry/history/evaluation records
- S6: validation and root commit/push

## 롤백 경계

- 각 project remote repository는 private으로 생성했다.
- root commit 전에는 staged changes를 검토하고, root commit 이후에는 정상 Git revert로 superproject pointer change를 되돌릴 수 있다.
- project repository 삭제나 history rewrite는 이번 작업에서 수행하지 않는다.

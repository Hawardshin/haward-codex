# 웹 검색 기록: root project Git 분리

- 날짜: 2026-06-08
- 요청 요약: 등록된 root project들이 실제로 별도 Git repository로 분리됐는지 확인하고, 분리되지 않았다면 구현.
- 검색 목적: 이미 추적 중인 subdirectory를 standalone repository와 root superproject 구조로 전환할 때 사용할 안전한 Git 방식을 확인.

## 검색 쿼리

- `git submodule add existing directory already tracked safe migration official docs`
- `git rm cached directory convert to submodule official git submodule`
- `git filter-repo split subdirectory into new repository documentation`

## 확인한 주요 출처

| 출처 | URL | 신뢰도 | 반영 내용 |
| --- | --- | --- | --- |
| Git official `git-submodule` documentation | https://git-scm.com/docs/git-submodule | 높음 | Root repository가 submodule gitlink와 `.gitmodules`로 외부 repository를 추적하는 방식을 확인했다. |
| Git official `git-worktree` documentation | https://git-scm.com/docs/git-worktree.html | 높음 | 같은 repository의 여러 working tree를 관리하는 기능이므로, project별 독립 repository 요구에는 직접 맞지 않는다고 판단했다. |
| `git-filter-repo` documentation/search results | https://github.com/newren/git-filter-repo | 중간 | Subdirectory history extraction 대안으로 확인했으나, 현재 환경에 설치돼 있지 않아 내장 `git subtree split`을 선택했다. |

## 판단

- 이번 요구는 여러 project를 독립 Git repository로 운영하고, root workspace가 그 경계를 쉽게 보여주는 것이 핵심이다.
- `git worktree`는 같은 repository의 branch/worktree 관리에 적합하므로, project별 독립 Git repository 요구에는 부족하다.
- `git filter-repo`는 강력하지만 현재 도구 설치가 필요하고, 이번 slice에서는 Git 내장 `subtree split`으로 충분히 project별 history를 보존할 수 있다.
- 선택한 방식은 `git subtree split`으로 project별 history를 만들고, root repository는 `.gitmodules`와 submodule gitlink만 추적하는 superproject 구조다.

## 약한 출처와 제외

- 일반 블로그 글과 Q&A는 공식 문서 확인 전 참고하지 않았다.
- Stack Overflow류 답변은 이번 판단에 필요하지 않아 채택하지 않았다.

## 계획 영향

- 각 registered root project를 private GitHub repository로 만들고 push한다.
- root repository에서 기존 project 파일 추적을 제거하고 submodule 포인터로 전환한다.
- `_ops/projects/registry.json`에 repository model과 remote URL을 남긴다.
- submodule status, gitlink mode `160000`, remote visibility, diff check를 검증 게이트로 삼는다.

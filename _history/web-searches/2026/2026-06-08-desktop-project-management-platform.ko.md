# 웹 검색 기록: desktop project management platform

- 날짜: 2026-06-08
- 작업: 데스크톱 앱을 Ollama/툴/에이전트 운영과 분리된 프로젝트 관리 플랫폼으로 구현
- 검색 방식: 공식 문서 우선, 로컬 구현 전 확인

## 확인한 출처

| 출처 | URL | 신뢰도 | 이번 계획 영향 |
| --- | --- | --- | --- |
| Git worktree 공식 문서 | https://git-scm.com/docs/git-worktree.html | 높음 | durable 작업 단위를 Git 경계와 worktree/repository 중심으로 보게 함 |
| GitHub Desktop 공식 문서 | https://docs.github.com/desktop | 높음 | 사용자가 GUI에서 repository clone/open/manage를 기대한다는 비교 기준으로 사용 |
| GitHub Desktop clone 문서 | https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop?platform=mac | 높음 | 데스크톱 기본 액션을 `open_existing_git_repo`, `clone_remote_repo`, `create_new_repo`로 정리 |
| Linear project overview 문서 | https://linear.app/docs/project-overview | 높음 | 프로젝트 overview가 specs, updates, notes, resources, milestones를 한 곳에 보여주는 모델 확인 |
| Linear project milestones 문서 | https://linear.app/docs/project-milestones | 높음 | 프로젝트별 milestone/progress/next action을 패널에 포함 |
| Tauri dialog plugin 문서 | https://v2.tauri.app/plugin/dialog/ | 높음 | 데스크톱 앱에서 workspace import/open flow가 OS dialog와 연결될 수 있음을 확인 |

## 무시한 약한 출처

- 블로그/홍보성 project-management 글은 이번 구현 기준으로 사용하지 않았다.
- 비공식 Tauri/GitHub Desktop 예제는 공식 문서보다 우선하지 않았다.

## 결정 요약

- 프로젝트 관리 데스크톱은 agent/tool/Ollama 운영 화면이 아니라 Git repository/import/work timeline/report/evidence 화면이어야 한다.
- 프로젝트 탭은 단순 registry list가 아니라 portfolio, milestone, workflow lanes, recent trail, default actions를 제공해야 한다.
- 고객용 snapshot에는 내부 project portfolio/resource path를 노출하지 않고 공개 가능한 workflow/action 요약만 남긴다.

## 불확실성

- 실제 원격 Git repository 생성, 권한, credential UX는 이번 slice에서 구현하지 않았다.
- Tauri native dialog와 Git clone/create 실행은 기존 source/workspace host 표면과 연결될 수 있지만 이번 변경은 프로젝트 관리 표시/추적 모델에 집중했다.

# 웹 검색 기록: desktop project management sliced implementation

- 날짜: 2026-06-08
- 작업: 프로젝트 관리 플랫폼 기능을 slice별로 구현하고, Git 작업공간 import/run/report 흐름을 데스크톱 앱의 기본 사용자 경로에 연결한다.

## 검색 질의

- `official GitHub Desktop documentation clone create open repository desktop app`
- `official Git worktree documentation porcelain list multiple worktrees`
- `official Tauri v2 dialog plugin open directory shell opener documentation`
- `Linear docs project overview milestones roadmap project management official`

## 확인한 출처

- GitHub Desktop 공식 문서: https://docs.github.com/desktop
  - 영향: 사용자가 로컬/원격 Git repository를 열고 복제하는 흐름은 프로젝트 관리 앱의 첫 작업으로 노출되어야 한다.
- Git worktree 공식 문서: https://git-scm.com/docs/git-worktree.html
  - 영향: 여러 작업공간을 Git 경계로 다루되, 앱 UI는 각 프로젝트의 상태와 현재 작업을 독립적으로 보여야 한다.
- Tauri v2 Dialog 플러그인 문서: https://v2.tauri.app/plugin/dialog/
  - 영향: 폴더 선택/열기 같은 네이티브 작업공간 액션은 기존 Tauri runtime surface를 재사용한다.
- Linear Project Overview 문서: https://linear.app/docs/project-overview
  - 영향: 프로젝트 화면은 단순 목록이 아니라 상태, 마일스톤, 연결 문서, 다음 액션을 한 화면에서 보여야 한다.

## 참고한 이슈/디스커션 신호

- GitHub Desktop issue #14801: https://github.com/desktop/desktop/issues/14801
  - 영향: clone/open 이후 repository 인식 문제는 실제 사용자 환경에서 발생할 수 있으므로, 프로젝트 화면은 네이티브 작업공간 상태와 보고서 확인 경로를 분리해서 보여야 한다.
- GitHub Desktop issue #11314: https://github.com/desktop/desktop/issues/11314
  - 영향: clone 대상 폴더와 오류 안내는 혼선 지점이 될 수 있으므로 이번 slice에서는 clone 자체를 재작성하지 않고 기존 workspace host 표면으로 라우팅한다.
- Tauri discussion #11102: https://github.com/tauri-apps/tauri/discussions/11102
  - 영향: 파일/폴더 선택은 권한과 플랫폼 제약이 있으므로 기존 Tauri runtime command 경계를 유지한다.

## 계획 영향

- 새 dependency나 CLI 설치 없이 기존 Next.js/React/Tauri 경로를 사용한다.
- 프로젝트 상태 계산은 UI가 아니라 snapshot collector에서 수행한다.
- 프로젝트 화면을 단일 TSX 파일에서 `project-management/` 하위 컴포넌트로 분리한다.
- 프로젝트 액션은 `source`, `desktop`, `eval`, `history`, `documents`, `requirements`로 직접 연결한다.

## 불확실성

- 원격 Git hosting repository 생성과 각 AI 도구의 자동 설치는 이번 slice에서 수행하지 않는다.
- 실제 네이티브 folder picker와 clone 명령은 기존 workspace host panel이 담당하며, 프로젝트 화면은 해당 표면으로 라우팅한다.

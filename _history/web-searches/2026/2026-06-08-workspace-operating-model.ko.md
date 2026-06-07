# Web Search Record: Workspace Operating Model

## 검색 목적

데스크톱 앱을 Git 분리 프로젝트 관리 앱으로 고정하고, 프로젝트 분리/가져오기/초보자 온보딩 판단에 사용할 공식 근거를 확인했다.

## 검색어

- `Git official documentation submodule separate repositories`
- `GitHub Docs splitting a subfolder out into a new repository`
- `Apple Human Interface Guidelines onboarding desktop app progressive disclosure`
- `Git official documentation worktree multiple working trees`

## 확인한 강한 출처

| 출처 | 유형 | 사용한 판단 |
| --- | --- | --- |
| https://git-scm.com/docs/gitsubmodules.html | official docs | 루트 컬렉션이 별도 프로젝트의 작업 트리와 이력을 분리해 참조할 수 있다는 Git submodule 모델 확인 |
| https://git-scm.com/docs/git-worktree.html | official docs | Git-native 다중 작업공간 개념 확인 |
| https://docs.github.com/en/get-started/using-git/splitting-a-subfolder-out-into-a-new-repository | official docs | 기존 폴더를 새 저장소로 분리하는 공식 migration 경로 확인 |
| https://developer.apple.com/design/human-interface-guidelines/onboarding | official docs | 초보자가 시스템 자체를 배우기보다 앱의 가치와 필요한 맥락을 바로 얻어야 한다는 온보딩 원칙 확인 |

## 약한 출처 처리

검색 결과의 커뮤니티 글과 블로그는 이번 구현 근거로 사용하지 않았다. 제품 방향 판단은 공식 문서와 로컬 소스/테스트를 기준으로 했다.

## 계획 영향

- 프로젝트 관리 앱의 기본 단위는 `git_repository`로 유지한다.
- 이미 루트 프로젝트들이 submodule로 분리되어 있으므로 새 Git history rewrite는 수행하지 않고, 화면과 스냅샷에서 분리 상태를 검증 가능하게 만든다.
- 초보자 흐름은 설정 설명보다 자연어 작업 입력, Git 작업공간, 실행 상태, 보고서/근거 확인을 먼저 보여준다.

## 불확실성

- 원격 GitHub 저장소 생성/clone/create를 완전히 자동화하는 런타임 UX는 이번 slice의 구현 범위가 아니다.

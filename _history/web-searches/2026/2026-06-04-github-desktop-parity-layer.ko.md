# Web Search: GitHub Desktop Parity Layer

## 요청

- `UR-2026-06-04-001`: Native Git Workbench를 GitHub Desktop 수준으로 끌어올리기.

## 검색

- `GitHub Desktop docs stashing changes partial commit diff selected lines commit amend official`
- `GitHub Desktop open source repository license MIT features changes diff history branches pull request official`
- `GitHub Desktop release notes 2026 changes diff history stash partial staging`

## 확인한 출처

- GitHub Docs: `Committing and reviewing changes to your project in GitHub Desktop`
  - 변경 파일 체크박스, 선택 변경 커밋, partial commit, discard, stash 접근 흐름을 확인했다.
- GitHub Desktop repository
  - GitHub Desktop이 공개 Electron 기반 앱이며 MIT license grant가 GitHub trademark에는 적용되지 않는다는 경계를 확인했다.
- GitHub Desktop release notes
  - 2026년 릴리스 노트에서 discard, stash menu, history/commit 관련 polish가 계속 핵심 워크플로우로 유지됨을 확인했다.
- GitHub Blog: split diffs / PR preview / commit management 관련 posts
  - diff 검토 중심 UX와 history/PR preview가 GitHub Desktop의 핵심 방향임을 확인했다.

## 계획 영향

- 단순 3-pane status UI를 넘어서 Changes/History/Stash view를 같은 Native Git Workbench 안에 넣기로 했다.
- Changes에는 파일별 include checkbox와 선택 파일 커밋을 넣었다.
- Discard는 destructive action이므로 renderer confirm과 backend repository-relative path 검증을 둘 다 적용했다.
- Stash apply/pop/drop은 명시적으로 선택한 stash ref에 대해서만 실행하도록 설계했다.

## 불확실성

- 이번 구현은 local Git workbench 핵심에 집중했다. GitHub 계정 기반 PR 생성/리뷰, line-level hunk staging, conflict editor 수준의 고급 기능은 별도 제품 surface로 확장해야 한다.

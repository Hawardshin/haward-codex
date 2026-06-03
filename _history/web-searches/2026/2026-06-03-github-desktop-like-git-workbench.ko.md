# Web Search: GitHub Desktop-like Git Workbench

## Queries

- `GitHub Desktop features commit changes file diff branch push pull fetch UI official docs`
- `GitHub Desktop managing changes committing stashing reviewing diffs official docs`
- `GitHub Desktop open source repository changes list diff commit UI GitHub Desktop`

## Checked Sources

- GitHub Desktop repository: https://github.com/desktop/desktop
- GitHub Docs, GitHub Desktop overview/tutorial: https://docs.github.com/en/desktop/overview/creating-your-first-repository-using-github-desktop
- GitHub Blog, split diffs in GitHub Desktop: https://github.blog/2020-11-17-introducing-split-diffs-in-github-desktop/
- GitHub Desktop release notes: https://desktop.github.com/release-notes/

## Plan Impact

- Git 패널을 단순 status/action card가 아니라 changed-file list, selected-file diff preview, commit box, pull/push sync panel이 한 화면에 있는 작업대로 재구성했다.
- Tauri Git status payload에 파일별 staged/unstaged/untracked/conflicted 상태, additions/deletions, bounded diff preview를 추가했다.
- 큰 diff, binary, preview 제한 파일은 전체 Git 기능을 막지 않고 preview unavailable 상태로 degrade하게 했다.

## Weak Sources Ignored

- 비공식 설치 가이드, PDF 튜토리얼, Reddit troubleshooting 글은 discovery signal로만 보고 구현 근거에는 포함하지 않았다.

## Uncertainty

- 이번 변경은 per-file bounded preview와 3-pane Git workbench까지 구현한다. GitHub Desktop의 line-level partial staging, stash, PR preview, history graph, conflict editor는 별도 후속 product slice로 남는다.

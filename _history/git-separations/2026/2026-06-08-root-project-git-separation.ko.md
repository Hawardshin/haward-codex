# Git 분리 기록: root project repositories

- 날짜: 2026-06-08
- 요청: 등록된 root project들이 실제로 별도 Git 저장소로 분리되도록 계속 구현.
- 방식: private GitHub repository + root superproject submodule

## 대상

| 프로젝트 | 기존 경로 | 새 원격 저장소 | visibility | parent gitlink SHA | 상태 |
| --- | --- | --- | --- | --- | --- |
| agent-platform | `agent-platform/` | `Hawardshin/haward-codex-agent-platform` | private | `e536989dbae31d208a895e23fdbc135457402e33` | 완료 |
| agent-tool-desktop-app | `agent-tool-desktop-app/` | `Hawardshin/haward-codex-agent-tool-desktop-app` | private | `545c2de1641d602998e25f39104062933725d84d` | 완료 |
| platform-desktop-app | `platform-desktop-app/` | `Hawardshin/haward-codex-platform-desktop-app` | private | `4343d97358f4ac3750438dc5da6cb0b51d1a9d2e` | 완료 |
| presentation-agent | `presentation-agent/` | `Hawardshin/haward-codex-presentation-agent` | private | `c3dfbd0adc0f73285597b548eb3446f5783f21eb` | 완료 |
| design-asset-library | `design-asset-library/` | `Hawardshin/haward-codex-design-asset-library` | private | `154fb105a62e8d09567c8f2698f4aa9e28208e30` | 완료 |
| vscode-agent-workbench | `vscode-agent-workbench/` | `Hawardshin/haward-codex-vscode-agent-workbench` | private | `2274d3cc0a3798c437bc5d85cbcc27627c29ce11` | 완료 |

## 실행 결과

- `gh repo create --private`로 여섯 project별 GitHub repository를 생성했다.
- `git subtree split --prefix=<project>`로 기존 root history에서 project별 독립 history를 만들고 각 repository `main`에 push했다.
- root repository에서는 기존 project 파일 추적을 제거하고 `.gitmodules`와 `160000` mode gitlink로 전환했다.
- 네 project에는 local/generated output을 repository에 섞지 않도록 project-local `.gitignore`를 추가해 각 project repository에 별도 commit/push했다.
- root workspace는 이제 superproject이며, project source 변경은 각 submodule repository에서 commit/push해야 한다.

## 안전 경계

- 원격 repo는 private으로 생성한다.
- 각 project는 `git subtree split --prefix=<project>`로 독립 history를 만든 뒤 새 repo `main`에 push한다.
- parent repo는 `.gitmodules`와 gitlink로 project 경계를 추적한다.
- 공개 배포나 installer release claim은 하지 않는다.
- private repo 접근 권한이 없는 환경에서는 `git submodule update --init --recursive`가 실패할 수 있으므로, onboarding에는 GitHub 권한 확인이 필요하다.

## 검증

- `gh repo view Hawardshin/<repo> --json nameWithOwner,visibility,url`: 여섯 repo 모두 `PRIVATE` 확인.
- `git submodule status --recursive`: 여섯 submodule SHA 확인.
- 각 submodule 내부 `git status --short`: 변경 없음 확인.
- root `git ls-files -s <project>`: 여섯 경로 모두 mode `160000` 확인.
- `python3 -m json.tool _ops/projects/registry.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/projects/registry.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-08-root-project-git-separation.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-08-root-project-git-separation.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-08-root-project-git-separation-evaluation-input.json`: 통과.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과.
- `git diff --check`: 통과.
- root commit/push: close-out 단계에서 수행.

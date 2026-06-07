# 웹 검색 기록: product domain gap clarity

- 날짜: 2026-06-08
- 목적: 데스크톱 Git/AI 작업공간 앱의 영역 분리와 기획 gap audit 기준 확인

## 검색

1. `official design systems information architecture desktop app navigation task workflows Git workspace developer tools`
2. `GitHub Desktop documentation repository list changes history branch pull request user workflow`
3. `VS Code UX guidelines activity bar panel sidebar terminal source control official`

## 확인한 출처

- GitHub Desktop documentation: Git repository, changes, history, branch, pull request workflow가 명확한 제품 영역으로 나뉜다.
- VS Code UX Guidelines: Activity Bar는 core navigation, Panel은 Terminal/Problems/Output 같은 실행·상태 표면에 적합하다.
- Emdash docs: 여러 coding agent 작업을 isolated Git worktree 단위로 분리하는 현대적 reference signal이다.

## 계획 영향

- 데스크톱 tracker는 `workspace/repository`, `guest tool run`, `work timeline/report`, `evidence/requirements`, `settings/advanced`로 영역을 나눈다.
- Agent/tool/model/provider/Ollama 운영은 기본 작업 화면이 아니라 별도 agent-tool desktop app 또는 advanced operator link로 분리한다.
- 기획 허점은 stable ID와 acceptance gate를 갖는 registry로 관리하고 화면에 일부 노출한다.

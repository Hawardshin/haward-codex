# 계획: workspace tracker product split

1. 공식 문서로 Git 작업공간, AI 코딩 도구, AgentCore류 런타임/툴 플랫폼의 역할을 확인한다.
2. `platform-desktop-app/`와 `agent-platform/`의 소유 경계를 다시 정의한다.
3. 데스크톱 앱 제품 레지스트리를 `workspace_tracker` 중심으로 바꾼다.
4. user view mode와 홈 화면을 Git 작업공간/current work/report 중심으로 바꾼다.
5. 스냅샷 collector와 customer snapshot에 product split 데이터를 추가한다.
6. agent/tool/Ollama/AgentCore류 기능은 separated advanced platform으로 표시한다.
7. 테스트, README, requirements/spec/history/evaluation records를 업데이트한다.
8. check/test/build와 close-out guard를 실행하고 커밋/푸시한다.

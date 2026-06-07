# 사용자 요청 요약: workspace tracker product split

사용자는 데스크톱 앱의 근본 목적이 AntiGravity, Cursor, Codex, Claude Code 등 여러 AI 코딩 도구를 Git 작업공간 위에서 잘 쓰도록 돕고, 현재 작업 중인 계획/요약/보고서/근거를 쉽게 확인하는 것이라고 정리했다.

또한 Ollama, 에이전트 관리, 툴 관리, AWS Agent Platform/AgentCore류 기능은 기본 데스크톱 앱에서 덜어내 별도 플랫폼/프로젝트로 분리해야 한다고 요청했다. 새 사용자 프로젝트는 하나의 큰 앱 내부에 섞지 말고 별도 Git repository/workspace로 다루는 방향을 요구했다.

이번 작업의 목표는 이 제품 분리를 코드, UI, 레지스트리, 스냅샷, 테스트, 문서에 반영하는 것이다.

# User Request: Chatbot Connection

날짜: 2026-06-07

## 요약

사용자는 `챗봇 연결`을 요구했다. 이전 요청 흐름상 터미널, provider, CLI, 에이전트 채팅이 실제 작업 공간 실행과 분리되어 보이지 않도록, 기존 실행 기능을 명확히 이어달라는 의미로 해석했다.

## 범위 결정

- 기존 `SearchAgentWorkChatPanel`과 native provider/CLI fallback 경로를 활용한다.
- 채팅 화면에서 모델 API, 모델 라우팅, 터미널 대체 실행, 작업 실행 저장소 연결 상태를 보여준다.
- 명령 팔레트에서 `챗봇 연결`로 바로 들어갈 수 있게 한다.

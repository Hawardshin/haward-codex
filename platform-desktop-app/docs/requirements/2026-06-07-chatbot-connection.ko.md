# 요구사항: Chatbot Connection

날짜: 2026-06-07

## 요구

사용자는 챗봇 연결을 요구했다. 기존 에이전트 채팅이 단순 채팅 화면처럼 보이지 말고, 실제 모델 API 계정, 터미널 대체 실행, 작업 실행 저장소와 어떻게 연결되어 있는지 바로 보여야 한다.

## 수용 기준

- 에이전트 채팅 화면은 챗봇 연결 상태를 별도 영역으로 표시한다.
- 연결 상태는 모델 API, 모델 라우팅, 터미널 대체 실행, 작업 실행 저장소를 포함한다.
- 모델 API가 연결되지 않은 경우 계정 연결 필요 상태를 명확히 보여준다.
- 사용자는 채팅 화면에서 provider 계정 설정, 터미널 연결, 모델 목록 갱신으로 바로 이동할 수 있다.
- 명령 팔레트에서 `챗봇 연결`을 검색해 같은 에이전트 채팅 화면을 열 수 있다.
- 기존 `run_provider_agent_task` provider 직접 실행과 `start_cli_adapter_session` fallback 경로는 유지한다.
- 연결 상태 UI와 명령 팔레트 진입점은 테스트로 보호한다.

## 비범위

- 새 provider API 구현.
- 새 CLI adapter 설치 또는 global dependency 설치.
- 외부 chatbot SaaS 계정 자동 가입.
- provider secret 저장 방식 변경.
- 작업 실행 기록 저장소 schema 변경.

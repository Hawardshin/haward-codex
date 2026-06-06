# Work Plan: Chatbot Connection

날짜: 2026-06-07

## 계획

1. web-first intake로 agent/chat/native command 참고 기준을 확인한다.
2. 기존 provider 직접 실행과 CLI fallback 흐름을 읽는다.
3. 채팅 panel에 연결 상태 strip과 설정/터미널/모델 refresh 액션을 추가한다.
4. 명령 팔레트에 `챗봇 연결` entry를 추가한다.
5. 테스트와 CSS contract를 보강한다.
6. renderer check/test, collect/build/platform check, Browser smoke를 실행한다.
7. guard/evaluator 기록 후 commit/push한다.

## 근거

- Tauri invoke 경계가 이미 존재하므로 새 native command보다 기존 명령 재사용이 유지보수 비용이 낮다.
- 사용자 요구는 새 provider 구현보다 사용 흐름에서 연결이 보이지 않는 문제에 가깝다.
- 채팅 화면 내부에 상태를 두면 실행 직전에 연결 상태와 fallback을 확인할 수 있다.

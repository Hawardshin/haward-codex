# 구현 계획 기록

- 날짜: 2026-06-04
- 작업: Ollama/local model selection

## 계획

1. Ollama 공식 API에서 모델 catalog와 chat endpoint를 확인한다.
2. Tauri provider 정의에 keyless local provider를 추가한다.
3. `list_provider_models` command로 `/api/tags` catalog를 노출한다.
4. provider direct task 실행에 `/api/chat` adapter를 추가한다.
5. 검색 에이전트 작업 채팅에서 provider/model 선택과 새로고침 UI를 제공한다.
6. 설정 화면에서 Ollama를 API key 폼이 아니라 로컬 런타임 카드로 표시한다.
7. 요구사항, spec, runtime contract, readiness 검증을 갱신한다.
8. compile, build, tests, browser smoke를 실행한다.

## 결정

- OpenAI-compatible endpoint 대신 Ollama native endpoint를 사용한다.
- 모델 자동 pull은 설치/네트워크/디스크 사용 동의가 필요하므로 이번 구현에서는 제외한다.
- Ollama runtime availability는 credential configured 여부가 아니라 model catalog command 결과로 사용자에게 보여준다.

# Ollama 로컬 모델 provider 조사

- 날짜: 2026-06-04
- 작업: 데스크톱 앱에서 모델 선택, 특히 Ollama 같은 로컬 모델 provider를 사용할 수 있게 구현

## 쿼리

- `Ollama API list local models chat generate official docs`
- `Ollama REST API /api/tags /api/chat official documentation`
- `Ollama OpenAI compatibility API local models official docs`

## 확인한 출처

- Ollama 공식 API 문서: https://docs.ollama.com/api
- Ollama OpenAI compatibility 문서: https://docs.ollama.com/openai

## 구현 영향

- 설치된 로컬 모델 catalog는 Ollama 공식 API의 `GET /api/tags`를 사용한다.
- 검색 에이전트 직접 실행은 Ollama 공식 API의 `POST /api/chat`와 `stream: false`를 사용한다.
- Ollama는 API key 저장 대상이 아니라 `127.0.0.1:11434` 로컬 HTTP 런타임으로 모델 provider에 등록한다.
- OpenAI-compatible path도 가능하지만, 기존 provider adapter가 provider별 endpoint를 분리하고 있어 이번 구현은 Ollama native endpoint를 사용했다.

## 불확실성

- 사용자 환경에 Ollama와 모델이 실제 설치되어 있는지는 앱 실행 시 `/api/tags` catalog 상태로 판정해야 한다.
- 모델 자동 pull은 설치/용량/네트워크 동의가 필요한 행동이라 이번 변경에서는 하지 않았다.

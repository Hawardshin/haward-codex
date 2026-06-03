# 사용자 요청 요약

- 날짜: 2026-06-04
- 요청: 데스크톱 앱에서 모델 선택을 가능하게 하고, Ollama 같은 로컬 모델도 사용할 수 있게 한다.

## 요구로 해석한 항목

- 검색 에이전트 작업 채팅에서 provider와 model을 직접 선택할 수 있어야 한다.
- Ollama는 API key 계정이 아니라 로컬 모델 런타임으로 취급해야 한다.
- 설치된 로컬 모델 목록을 앱에서 새로고침할 수 있어야 한다.
- 로컬 provider도 task-run 저장, fallback, readiness 검증 구조 안에 들어가야 한다.

## 범위 밖

- Ollama 설치 파일 번들링
- 모델 자동 다운로드 또는 pull
- OS keychain provider adapter
- 모델 tool-calling 기반 파일 수정 실행

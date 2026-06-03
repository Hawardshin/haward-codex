# 누락/리소스 점검

- 날짜: 2026-06-04
- 작업: Ollama/local model selection

## 누락 점검

- 사용자 요구인 모델 선택: 반영됨
- Ollama/local model: 반영됨
- 실제 실행 경로: `/api/chat` 반영됨
- 모델 목록: `/api/tags` 반영됨
- 설정 UX: keyless local runtime 카드 반영됨
- 검증/계약: runtime contract, readiness, service readiness 반영됨
- 한국어 우선 문구: 주요 UI 문구 한국어 우선으로 반영됨

## 리소스 점검

- 장기 실행 서버: Playwright smoke용 `python3 -m http.server 4178` 실행 후 종료함
- 브라우저 세션: Playwright browser 인스턴스 종료함
- 외부 네트워크: Ollama 공식 문서 확인에만 사용함
- 실제 Ollama 모델 실행: 사용자 로컬 런타임 상태를 알 수 없어 자동 호출하지 않음

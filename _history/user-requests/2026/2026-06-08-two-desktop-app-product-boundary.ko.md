# 사용자 요청 요약: 두 제품 모두 데스크톱 앱

- 날짜: 2026-06-08
- 요약: 사용자는 프로젝트 관리 제품과 agent/tool/Ollama 운영 제품이 둘 다 데스크톱 앱이어야 한다고 명확히 했다.

## 요구 후보

- `platform-desktop-app/`은 Git 프로젝트 관리와 작업 추적 desktop app으로 유지한다.
- agent/tool/Ollama/provider runtime 운영은 별도 desktop app으로 분리한다.
- `agent-platform/`은 두 번째 앱의 내부 엔진과 검증 레이어로 남긴다.

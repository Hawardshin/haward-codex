# 요구사항 변경: 두 제품 모두 데스크톱 앱

- 날짜: 2026-06-08
- 변경 유형: product boundary clarification

## 변경 내용

분리된 두 제품을 모두 데스크톱 앱으로 정의한다.

- `platform-desktop-app/`: 프로젝트 관리와 Git 작업 추적 데스크톱 앱
- `agent-tool-desktop-app/`: 에이전트, 툴, Ollama/local model, provider runtime 운영 데스크톱 앱
- `agent-platform/`: 두 번째 앱과 다른 플랫폼 기능이 재사용하는 내부 엔진/정책/검증 레이어

## 영향

- agent/tool/Ollama 기능을 `agent-platform/` 자체가 사용자-facing 제품인 것처럼 표현하지 않는다.
- 두 번째 앱의 runtime shell, installer, security, credential, model storage 구현은 별도 구현 slice로 진행한다.

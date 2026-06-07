# 계획 기록: 두 데스크톱 앱 제품 경계

- 날짜: 2026-06-08
- 목표: 프로젝트 관리 제품과 agent/tool/Ollama 운영 제품을 모두 데스크톱 앱으로 고정한다.

## 실행 순서

1. 웹 검색으로 데스크톱 앱 경계와 capability/process separation 근거를 확인한다.
2. `agent-tool-desktop-app/` root project scaffold를 만든다.
3. `agent-tool-desktop-app/configs/product-boundary-registry.json`에 제품 경계를 기록한다.
4. `platform-desktop-app/configs/workspace-tracker-product-split-registry.json`과 `_ops/projects/registry.json`을 peer desktop product 구조로 갱신한다.
5. `agent-platform/README.md`를 engine/contract layer로 정리한다.
6. config contract, JSON, docs, desktop app test/check, customer renderer build를 검증한다.

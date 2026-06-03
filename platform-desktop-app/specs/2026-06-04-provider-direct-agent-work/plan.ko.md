# 구현 계획

## 결정

- 언어/런타임 선택: 기존 Tauri Rust 백엔드와 React/TypeScript renderer를 유지한다.
- 대안 비교:
  - Rust direct HTTP client: 앱이 provider API 실행을 소유하고 task-run store에 바로 저장할 수 있어 선택.
  - 외부 CLI only: 이미 존재하지만 사용자가 계정 기반 실제 작업을 원하므로 단독 경로로는 부족해 fallback으로 유지.
- 아키텍처 선택:
  - Provider direct command + task-run persistence: 기존 runtime data boundary를 재사용하고, 앱이 primary host runtime이라는 제품 원칙과 맞는다.
  - WebView consumer login embed: 비공식 session/cookie 처리 위험이 있어 제외.

## 단계

1. provider credential definition에 기본 모델과 직접 실행 report type을 추가한다.
2. `run_provider_agent_task` Tauri command를 구현하고 invoke handler에 등록한다.
3. OpenAI, Anthropic, Gemini API 호출 함수와 response text extractor를 만든다.
4. provider direct task 결과를 task-run store에 저장한다.
5. 검색 에이전트 작업 채팅에 provider/model 선택과 직접 실행 결과 메시지를 추가한다.
6. runtime contract, user flow, product feature, service readiness, readiness checks를 업데이트한다.
7. 요구사항, 스펙, 설치 감사, 히스토리, 평가를 남기고 검증한다.

## 위험과 완화

- API schema drift: 공식 docs 기준의 endpoint를 사용하고, 모델명은 UI에서 수정 가능하게 둔다.
- secret leakage: record에는 secret을 저장하지 않고 stderr/output도 redaction helper를 통과시킨다.
- public release storage risk: local secret file은 현재 slice의 한계로 기록하고 OS keychain adapter를 후속으로 둔다.

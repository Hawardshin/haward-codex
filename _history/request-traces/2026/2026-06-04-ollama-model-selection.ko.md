# 요청-결과 추적

- 날짜: 2026-06-04
- 요청: 모델 선택과 Ollama 같은 로컬 모델 사용 지원
- 결과 상태: 구현 완료

## 산출물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/configs/service-readiness-registry.json`
- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/docs/requirements/2026-06-04-provider-direct-agent-work.ko.md`
- `platform-desktop-app/docs/requirements/2026-06-04-provider-direct-agent-work.en.md`
- `platform-desktop-app/specs/2026-06-04-provider-direct-agent-work/`

## 요구 매핑

- 모델 선택: 검색 에이전트 채팅의 provider/model 컨트롤과 model datalist 입력으로 반영
- Ollama 지원: `Ollama / Local`, `list_provider_models`, `call_ollama_provider_api`로 반영
- 사용자 친화 설정: 설정의 API key 입력 대신 로컬 런타임 안내 카드로 반영
- 제품 계약: runtime contract와 readiness script token으로 반영

## 남은 제약

- Ollama 설치와 모델 pull은 사용자가 별도로 해야 한다.
- Ollama가 꺼져 있으면 catalog는 `local_model_runtime_unavailable` 상태를 보여주고 직접 실행은 실패 후 CLI fallback으로 이어진다.

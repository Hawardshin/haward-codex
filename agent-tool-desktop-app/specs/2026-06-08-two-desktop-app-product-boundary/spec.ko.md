# Spec: 두 데스크톱 앱 제품 경계

## 목표

사용자가 명확히 한 “둘 다 데스크톱 앱” 결정을 저장소 구조와 registry에 반영한다.

## 제품 경계

- `platform-desktop-app/`: Git workspace/project management desktop app
- `agent-tool-desktop-app/`: agent/tool/Ollama/provider runtime operations desktop app
- `agent-platform/`: shared engine, policy, validator, agent/runtime contract layer

## 수용 기준

- 루트 프로젝트 registry에 `agent-tool-desktop-app/`가 등록된다.
- `workspace-tracker-product-split-registry.json`이 두 peer desktop product를 명시한다.
- `agent-platform/README.md`가 두 번째 앱의 제품 홈이 아니라 engine layer라고 설명한다.
- 새 config는 self-documenting contract를 만족한다.

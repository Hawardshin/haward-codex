# 요구사항: 두 제품 모두 데스크톱 앱

- 날짜: 2026-06-08
- 소유 프로젝트: `agent-tool-desktop-app/`
- 관련 프로젝트: `platform-desktop-app/`, `agent-platform/`

## 요구사항

| ID | 요구사항 | 검증 |
| --- | --- | --- |
| REQ-ATD-001 | `platform-desktop-app/`과 `agent-tool-desktop-app/`은 peer installable desktop product로 기록되어야 한다. | project registry, split registry |
| REQ-ATD-002 | agent/tool/Ollama/provider/AgentCore-style 운영 기능은 `agent-tool-desktop-app/` 제품 홈이 소유해야 한다. | product boundary registry |
| REQ-ATD-003 | `agent-platform/`은 두 번째 데스크톱 앱의 내부 엔진/정책/검증 레이어로 표현되어야 하며 사용자-facing 앱 홈으로 표현하면 안 된다. | agent-platform README, project registry |
| REQ-ATD-004 | 첫 번째 데스크톱 앱은 Git 프로젝트 관리, 작업 추적, 보고서, 근거 확인 중심으로 유지되어야 한다. | workspace split registry |

## 비범위

- 이번 기록은 runnable Tauri/Electron shell을 추가하지 않는다.
- provider credential, Ollama install, 모델 저장소, cloud runtime 제어는 별도 보안/설치/rollback gate 이후 구현한다.

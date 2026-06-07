# 요구사항 변경: workspace tracker product split

- 날짜: 2026-06-08
- 범위: `platform-desktop-app/`, `agent-platform/`, 프로젝트 경계 레지스트리
- 상태: baseline

## 변경 이유

사용자가 원하는 핵심 가치는 한 플랫폼에서 모든 에이전트/툴/모델을 직접 만드는 것이 아니라, Codex, Claude Code, Cursor, Antigravity 같은 다양한 AI 코딩 도구를 여러 Git 작업공간 위에서 쉽게 사용하고 현재 작업의 계획, 보고서, 근거, 터미널 상태를 순서대로 확인하는 것이다.

## 요구사항

| ID | 요구사항 | 수용 기준 |
| --- | --- | --- |
| REQ-WTPS-001 | 데스크톱 앱의 기본 제품 역할은 `workspace_tracker`여야 한다. | `product-feature-registry.json`, fallback architecture, README, tests가 `workspace_tracker`를 기준으로 한다. |
| REQ-WTPS-002 | 사용자의 기본 화면은 Git 작업공간, 터미널/AI 실행, 작업 타임라인, 보고서/근거, 문서/요구사항을 우선해야 한다. | user view allowed sections가 `overview/source/desktop/eval/projects/history/documents/requirements`를 포함하고 agent/tool 고급 기능은 기본에서 빠진다. |
| REQ-WTPS-003 | Codex, Claude Code, Cursor, Antigravity 등은 내장 필수 런타임이 아니라 선택형 guest AI 도구로 모델링해야 한다. | product split snapshot과 UI가 guest AI tools를 별도 목록으로 표시한다. |
| REQ-WTPS-004 | agent factory, root tool management, Ollama, provider direct agent run, AWS AgentCore식 runtime lifecycle은 `agent-platform/` 또는 분리 프로젝트가 소유해야 한다. | product registry와 README가 해당 기능을 separated/advanced로 표시한다. |
| REQ-WTPS-005 | 새 사용자 프로젝트는 데스크톱 앱 내부 기능 묶음이 아니라 별도 Git repository/imported workspace로 취급해야 한다. | product split registry의 workspace model이 `git_repository`를 기본 단위로 둔다. |
| REQ-WTPS-006 | 제품 분리 결정은 스냅샷과 customer snapshot에도 안전하게 나타나야 한다. | collector가 product split registry를 읽고 customer snapshot에 비민감 필드만 포함한다. |
| REQ-WTPS-007 | 기본 UI는 분리 플랫폼 기능을 숨기기만 하지 말고, 필요한 경우 고급/분리 플랫폼 링크로 이해 가능하게 표시해야 한다. | WorkspaceProductSplitPanel과 ProductFeatureArchitecturePanel이 separated platform action/copy를 제공한다. |

## 비범위

- 이번 변경은 실제 원격 Git 호스팅에 새 repository를 생성하지 않는다.
- 이번 변경은 Codex/Claude/Cursor/Antigravity CLI를 자동 설치하지 않는다.
- 이번 변경은 Ollama 또는 AWS 계정/리소스를 변경하지 않는다.

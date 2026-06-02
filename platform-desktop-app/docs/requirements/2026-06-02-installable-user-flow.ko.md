# 설치형 앱 사용자 플로우 요구사항

## 범위

설치형 에이전트 플랫폼을 사용자가 쉽게 시작하고 반복적으로 사용할 수 있게 만드는 첫 실행, 홈, 작업 실행, 결정함, 설정, 복구 흐름을 정의한다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| PDA-UX-001 | 설치형 앱은 첫 실행에서 `기존 워크스페이스 열기`, `새 워크스페이스 만들기`, `데모로 둘러보기` 경로를 제공해야 한다. | must | user-flow registry와 온보딩 문서 |
| PDA-UX-002 | 사용자가 선택한 워크스페이스에서 어떤 파일, 설정, 스냅샷을 읽거나 생성하는지 명확히 보여야 한다. | must | first-run onboarding 문서 |
| PDA-UX-003 | 기본 사용자 흐름은 선택 CLI, 알림, 브라우저 자동화, 고급 검증 설정이 없어도 대시보드에 도착해야 한다. | must | user-flow registry acceptance checks |
| PDA-UX-004 | `user`, `developer`, `superadmin_developer` 보기 모드는 첫 실행과 설정에서 선택 가능해야 하며 사용자 모드는 복잡한 내부 도구를 숨겨야 한다. | must | view mode registry 연결 |
| PDA-UX-005 | 작업 실행 화면은 현재 단계, 경과 시간, 활성 에이전트/subprocess, 생성 파일, 근거, 사용자 결정, 검증, 커밋/푸시 상태를 보여야 한다. | must | task_run_flow 검토 |
| PDA-UX-006 | 사용자 질문은 decision inbox에 모으고, 의존성이 없는 작업은 계속 진행할 수 있어야 한다. | must | decision_inbox_flow 검토 |
| PDA-UX-007 | 실패 복구는 워크스페이스 읽기 실패, 선택 CLI 누락, 사용자 결정 대기, 오래된 스냅샷, 업데이트 실패를 포함해야 한다. | must | failure_recovery_flows 검토 |
| PDA-UX-008 | 개발자/슈퍼어드민 모드는 raw config, validator, release gate, coordination, source provenance를 볼 수 있어야 한다. | should | developer_superadmin_flow 검토 |
| PDA-UX-009 | 작업 preflight는 Claude Code CLI, Gemini CLI, Codex CLI, OpenCode를 선택 가능한 CLI lane으로 보여주고, availability/version/auth/permission/setup-later 상태를 표시해야 한다. | must | `ai_cli_orchestration_flow` 검토 |
| PDA-UX-010 | 실행 화면은 여러 CLI lane의 terminal output을 보여주되, durable state는 task event, artifact, decision, validation record로 구조화해야 한다. | must | run timeline과 data accumulation contract |
| PDA-UX-011 | CLI가 사용자 질문을 만들면 decision inbox handoff 화면에서 질문, 영향, 기본 가정, 막힌 lane, 계속 가능한 lane, 재개 action을 보여야 한다. | must | decision inbox flow와 human decision inbox |
| PDA-UX-012 | 소스 편집 화면은 Monaco Editor 같은 검증된 editor surface를 우선 사용하고, 사용자 모드에서는 안전한 파일 범위와 변경 리뷰를 중심으로 보여야 한다. | should | source editor prototype acceptance |
| PDA-UX-013 | Desktop 탭은 Tauri runtime 연결 상태, CLI adapter availability/version, bounded health check 결과, 감지된 CLI 질문, source editing 준비 상태를 한 화면에서 보여야 한다. | must | workspace-monitor Desktop tab |
| PDA-UX-014 | Desktop 탭은 pipe 기반 CLI session console과 scoped source editor를 제공해 start/poll/stdin/defer/cancel, decision inbox 저장 수, 파일 열기, backup 저장 상태를 한 화면에서 조작할 수 있어야 한다. | must | workspace-monitor Desktop tab, TypeScript check |
| PDA-UX-015 | Desktop 탭은 CLI setup guide, 작업 모드 프리셋, 보류 decision 목록, answer type/text 입력, 저장된 답변 상태를 같은 작업 표면에서 보여야 한다. | must | workspace-monitor Desktop tab, Tauri decision commands |
| PDA-UX-016 | Desktop 탭은 linked active CLI session이 있는 decision에 대해 answer-only와 answer-and-resume action을 구분하고, 연결 session id/status와 resume 결과를 보여야 한다. | must | workspace-monitor Desktop tab, Tauri answer-and-resume command |
| PDA-UX-017 | Desktop 탭은 VS Code/Raycast/Docker/GitHub Desktop/Warp/Cursor 레퍼런스에서 채택한 quick action, capability card, run board, process graph, terminal event rail, grouped decision, replay, diff review, evidence/promotion 정보를 조밀한 작업 화면으로 보여야 한다. | must | workspace-monitor Desktop tab, build, readiness/test |
| PDA-UX-018 | Desktop 탭의 source editing 화면은 사용자가 여러 파일을 열린 드래프트로 유지하고, 검색/직접 경로 열기, dirty 파일 큐, diff preview, 현재 저장, 전체 저장, 되돌리기, 닫기, backup 결과 확인을 한 화면에서 수행할 수 있어야 한다. | must | workspace-monitor Desktop tab, visual QA, readiness/test |
| PDA-UX-019 | 첫 실행과 Desktop 탭은 사용자가 플랫폼을 먼저 실행한 뒤 외부 AI CLI를 guest lane으로 추가한다는 관계를 명확히 보여야 한다. 누락된 CLI는 플랫폼 실패가 아니라 해당 lane의 setup-later/capability_missing 상태로 보여야 한다. | must | user-flow registry, Workspace Monitor Desktop tab, readiness/test |
| PDA-UX-020 | Desktop 탭은 사용자가 task pipe preset을 선택하고 하나의 task intake로 여러 CLI lane을 초기화하는 흐름을 제공해야 한다. UI는 lane 수, adapter 목록, stdin/stdout/stderr pipe, decision inbox pipe, merge gate, missing lane 상태를 한 화면에서 보여야 한다. | must | Workspace Monitor Desktop tab, user-flow registry, readiness/test |
| PDA-UX-021 | Desktop 탭은 실행 중인 CLI output에서 사용자 질문을 감지하면 사용자가 자리를 비운 상태에서도 해당 lane에 defer 메시지를 보내고, 질문을 decision inbox에 보류 항목으로 저장하며, 사용자가 돌아오면 answer/resume으로 연결할 수 있어야 한다. 수동 보류와 전체 감지 질문 보류도 제공해야 한다. | must | Workspace Monitor Desktop tab, Tauri session commands, readiness/test |

## 현재 상태

- 상태: baseline draft
- 실제 desktop dependency 설치: 없음
- 구현 전 필수 확인: `platform-desktop-app/configs/user-flow-registry.json`
- 시각 자료: `platform-desktop-app/artifacts/user-flow-map.html`

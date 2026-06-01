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

## 현재 상태

- 상태: baseline draft
- 실제 desktop dependency 설치: 없음
- 구현 전 필수 확인: `platform-desktop-app/configs/user-flow-registry.json`
- 시각 자료: `platform-desktop-app/artifacts/user-flow-map.html`

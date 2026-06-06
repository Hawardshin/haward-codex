# VS Code 하드 포크 워크스페이스 요구사항

날짜: 2026-06-06

## 사용자 요청 요약

사용자는 `microsoft/vscode`를 클론하고, 그 소스와 기능을 최대한 활용해 작업공간 성격을 회복하는 하드 포크성 작업을 시작하라고 요청했다. 단순 계획으로 미루지 말고 실제 소스 변경과 빌드까지 진행해야 한다.

## 요구사항

| ID | 요구사항 | 수용 기준 | 상태 |
| --- | --- | --- | --- |
| REQ-VSC-001 | VS Code 원본을 로컬에 직접 클론한다. | `vscode-agent-workbench/source`가 `microsoft/vscode` 기준 커밋을 가진다. | 충족 |
| REQ-VSC-002 | 원본 소스를 직접 변경한다. | 로컬 source 브랜치에 Agent Workspace 변경 커밋이 존재한다. | 충족 |
| REQ-VSC-003 | 작업공간 중심 기능의 1차 표면을 추가한다. | 내장 확장과 Activity Bar view가 추가된다. | 충족 |
| REQ-VSC-004 | 제품 정체성을 Agent Workspace Code로 분리한다. | `product.json`의 주요 이름, data folder, protocol, bundle identifier가 변경된다. | 충족 |
| REQ-VSC-005 | 큰 원본 전체를 바깥 저장소에 vendoring하지 않는다. | `source/`는 `.gitignore`에 있고, 패치와 기록만 추적한다. | 충족 |
| REQ-VSC-006 | 빌드 가능한 기준선을 만든다. | `compile-extensions`, `compile-client`, `code-cli` smoke가 통과한다. | 충족 |
| REQ-VSC-007 | 설치와 런타임 리스크를 기록한다. | Node/npm install 감사, npm audit 경고, Electron launch cleanup을 기록한다. | 충족 |

## 비목표

- 이번 slice에서 VS Code 전체 기능을 완성된 제품 수준으로 재브랜딩하거나 배포하지 않는다.
- Microsoft Visual Studio Code 배포판의 비공개/상표/서비스 구성까지 포함한다고 주장하지 않는다.
- npm audit 자동 수정은 upstream lockfile drift를 만들 수 있어 실행하지 않는다.

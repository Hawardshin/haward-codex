# macOS 실행 구조 계획

## 요청

설치형 플랫폼이 macOS에서 실행 가능한 구조를 가져야 한다.

## 작업 모드

- 선택: `governance`
- 이유: 설치형 앱 구조, 배포 release gate, 영속 지침, 요구사항, memory anchor에 영향을 주는 durable 변경이다.

## 계획

1. 웹 검색으로 Apple, Tauri, Electron 공식 문서의 macOS 배포 조건을 확인한다.
2. 기존 `platform-desktop-app`의 설치형 제품화, user-flow, runtime/language, CLI adapter 경계와 충돌하지 않는 구조를 정한다.
3. `macos-execution-profile.json`을 source of truth로 추가한다.
4. 프로젝트 문서, 요구사항, 스펙, traceability를 연결한다.
5. 영속 지침과 memory bootstrap에 macOS execution profile을 넣는다.
6. config contract, JSON parse, memory bootstrap, docs/naming/structure/workspace health, omission, grounding, evaluator를 실행한다.

## 결정

- Tauri-first macOS `.app` shell을 기본 방향으로 둔다.
- `workspace-monitor` UI를 재사용하고 Python `agent-platform`은 sidecar/local service/command boundary 뒤에 둔다.
- optional CLI는 missing 시 앱 전체 실패가 아니라 capability-level degrade로 처리한다.
- 실제 Tauri 설치와 `.app` 구현은 별도 설치 감사와 구현 스펙에서 진행한다.


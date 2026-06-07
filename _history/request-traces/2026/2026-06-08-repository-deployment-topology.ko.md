# Request Trace: 저장소/배포 토폴로지

## 요청

변경 히스토리를 현재 레포와 분리하고, 프로젝트별 Git/히스토리 경계를 다시 설계해 배포가 어려워지지 않게 바꾸라는 요청.

## 결과

- `platform-desktop-app` release root를 앱 자체 저장소로 고정.
- 루트 workspace를 control plane으로 정의.
- project-local history first 및 future `workspace-history-ledger` 후보 기록.
- `haward-codex-workspace-history-ledger` private repo 생성 및 root submodule 연결.
- collector standalone app repo root 지원.
- Project Management 화면에 repository deployment topology 패널 추가.
- release runbook을 앱 레포 단독 명령과 control repo alias로 분리.

## 검증

- config contract passed
- coding research validator passed
- target tests passed
- TypeScript passed
- Workspace Monitor check/build passed
- customer renderer build/audit passed
- browser smoke passed
- platform app test/check passed

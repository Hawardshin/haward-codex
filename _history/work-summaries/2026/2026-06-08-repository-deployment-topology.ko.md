# 작업 요약: 저장소/배포 토폴로지

`platform-desktop-app`의 배포 단위를 앱 자체 Git 저장소로 고정하고, 루트 workspace 저장소는 submodule pointer와 cross-project 기록을 관리하는 control plane으로 재정의했다.

구현으로는 repository deployment topology registry, snapshot collector branch, standalone app repo root 지원, Project Management 배포 토폴로지 패널, release runbook 갱신, collector/UI tests를 추가했다. 고객용 build는 raw cross-project history와 unrelated submodule checkout을 요구하지 않는 방향으로 검증했다.

`haward-codex-workspace-history-ledger` private repo를 생성하고 control repo에 submodule로 연결했다. 기존 `_history` 물리 이동은 compatibility index와 validator update가 필요한 follow-up으로 남겼다.

# Source Provenance: 저장소/배포 토폴로지

## 내부 소스

- `.gitmodules`: 현재 root project가 submodule로 분리되어 있음을 확인.
- `_ops/projects/registry.json`: project registry의 repository model 확인.
- `platform-desktop-app/package.json`: 앱 레포 단독 release/build scripts 확인.
- `platform-desktop-app/docs/release-runbook.ko.md`: 기존 배포 문서와 명령 경로 확인.
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`: snapshot root와 customer snapshot 경계 확인.
- `platform-desktop-app/renderer/workspace-monitor/components/features/ProjectManagementPanel.tsx`: UI 삽입점 확인.
- `workspace-history-ledger/`: 새 private history ledger submodule 확인.

## 외부 소스

- Git submodules official docs
- GitHub Actions checkout docs
- GitHub releases docs
- GitHub split subfolder docs

## 결정 영향

Submodule control repo는 portfolio tracking에 유지하고, deployable app은 자체 저장소에서 release한다. History는 project-local first로 두고, cross-project 기록은 `workspace-history-ledger/`로 migration할 수 있게 private repo와 submodule을 생성했다.

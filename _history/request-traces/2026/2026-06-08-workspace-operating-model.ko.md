# Request To Outcome Trace

## 요청

데스크톱 앱을 다양한 AI 도구를 잘 쓰는 Git 프로젝트 관리 공간으로 고정하고, 각 프로젝트를 별도 Git으로 관리하며, 작업 순서/문서/근거/보고서를 보여주고, 사용자 부재 시 중요한 결정만 보류하게 하라는 요청.

## 결과 산출물

- 운영 모델 registry: `platform-desktop-app/configs/workspace-operating-model-registry.json`
- 스냅샷 수집: `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- 타입: `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`
- UI: `platform-desktop-app/renderer/workspace-monitor/components/features/WorkspaceOperatingModelPanel.tsx`
- Git 분리 검증: `_history/git-separations/2026/2026-06-08-workspace-operating-model.json`
- 요구사항/스펙: `platform-desktop-app/docs/requirements/2026-06-08-workspace-operating-model.ko.md`, `platform-desktop-app/specs/2026-06-08-workspace-operating-model/`

## 검증 연결

- `node --test tests/collector.test.mjs tests/tool-studio.test.mjs`
- `corepack pnpm --dir renderer/workspace-monitor run check`
- `corepack pnpm --dir renderer/workspace-monitor run build`
- Playwright static export smoke
- `check-config-contract`
- `complete-coding-research`
- `check-omissions`
- `check-resources`
- `evaluate-work`

## 현재 한계

실제 원격 Git repository 생성/clone/create를 완전히 자동화하는 runtime UX는 이번 결과가 아니라 후속 slice다. 현재 구현은 이미 분리된 root submodule 상태를 화면과 스냅샷에서 검증 가능하게 만드는 것에 초점을 맞췄다.

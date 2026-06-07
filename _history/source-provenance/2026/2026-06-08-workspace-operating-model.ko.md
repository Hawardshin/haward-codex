# Source Provenance

## 내부 소스

- `.gitmodules`: 루트 프로젝트 submodule 상태 확인.
- `_ops/projects/registry.json`: 프로젝트 경계와 repository model 확인.
- `platform-desktop-app/configs/workspace-tracker-product-split-registry.json`: 기존 제품 분리 기준 확인.
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`: snapshot collector 확장 지점.
- `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`: renderer snapshot 타입.
- `platform-desktop-app/renderer/workspace-monitor/components/features/ProjectManagementPanel.tsx`: 프로젝트 화면 삽입 지점.
- `platform-desktop-app/renderer/workspace-monitor/tests/collector.test.mjs`: 수집기 계약.
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`: UI 계약.

## 외부 공식 소스

- Git submodules: https://git-scm.com/docs/gitsubmodules.html
- Git worktree: https://git-scm.com/docs/git-worktree.html
- GitHub split repository docs: https://docs.github.com/en/get-started/using-git/splitting-a-subfolder-out-into-a-new-repository
- Apple HIG onboarding: https://developer.apple.com/design/human-interface-guidelines/onboarding

## 적용 판단

공식 Git 문서는 별도 저장소/작업공간 모델의 근거로 사용했다. Apple HIG는 초보자 첫 화면에서 시스템 설명을 과하게 앞세우지 않고 작업 맥락과 가치 중심으로 보여야 한다는 판단에 사용했다. 구현 세부는 기존 collector, React component, 테스트 패턴을 따랐다.

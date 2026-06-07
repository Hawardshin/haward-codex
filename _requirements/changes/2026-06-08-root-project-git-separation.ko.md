# 요구사항 변경: root project Git repository 분리

- 날짜: 2026-06-08
- 변경 유형: workspace architecture / Git ownership boundary

## 요구사항

등록된 root-level project는 독립 Git repository로 운영할 수 있어야 하며, root workspace는 project source를 직접 장기 소유하지 않고 project repository를 submodule로 추적한다.

## 승인 기준

- `agent-platform/`, `agent-tool-desktop-app/`, `platform-desktop-app/`, `presentation-agent/`, `design-asset-library/`, `vscode-agent-workbench/`는 각각 private GitHub repository를 가진다.
- root repository는 `.gitmodules`와 mode `160000` gitlink로 여섯 project를 추적한다.
- `_ops/projects/registry.json`은 각 project의 `repository_model`, `repository_url`, `submodule_path`, `submodule_branch`를 포함한다.
- 각 submodule working tree는 clean이어야 한다.
- root commit과 push가 완료되어야 한다.

## 운영 영향

- project source 변경은 해당 submodule repository에서 commit/push해야 한다.
- root repository 변경은 project pointer update, shared ops docs, governance/history artifacts를 중심으로 관리한다.
- private repository 권한이 없는 새 환경은 submodule init/update 단계에서 GitHub 인증이 필요하다.

## 비범위

- 기존 history를 완전히 rewriting해서 root repository 과거 commit에서 project source를 제거하지 않는다.
- public package distribution readiness를 주장하지 않는다.
- user-facing Git clone/import wizard는 후속 desktop app runtime slice로 남긴다.

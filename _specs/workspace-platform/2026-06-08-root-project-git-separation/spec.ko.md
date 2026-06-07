# Spec: root project Git repository separation

- 날짜: 2026-06-08
- 소유 영역: workspace root governance

## 문제

플랫폼 제품 경계는 문서와 registry에서 나뉘었지만, root repository가 여전히 여러 project source를 직접 추적하면 각 project를 독립 Git workspace로 import하거나 다른 AI coding tool에서 별도 repository로 다루기 어렵다.

## 목표

- 등록된 root project를 standalone GitHub repository로 분리한다.
- root repository는 superproject가 되어 각 project를 submodule로 추적한다.
- 각 project의 기존 directory history는 가능한 한 보존한다.
- 분리 상태, remote URL, 검증 결과를 durable record로 남긴다.

## 기능 요구사항

- `git subtree split --prefix=<project>` 또는 동등한 방식으로 project별 history branch를 생성한다.
- 각 project별 private GitHub repository를 만들고 `main`에 push한다.
- root repository에서 해당 project paths를 gitlink mode `160000`으로 전환한다.
- `.gitmodules`에는 각 submodule path, URL, branch가 기록되어야 한다.
- `_ops/projects/registry.json`은 project별 repository metadata를 제공해야 한다.

## 비기능 요구사항

- 기존 user 변경을 reset하거나 discard하지 않는다.
- 생성된 repository는 기본적으로 private이어야 한다.
- submodule 내부 generated/local-only output은 각 project repository의 `.gitignore`로 막는다.
- root close-out 전 submodule status와 clean state를 검증한다.

## 제외 범위

- root repository의 과거 history에서 project source를 제거하는 aggressive rewrite.
- public release, installer, updater, signing.
- private GitHub 권한 onboarding UI.

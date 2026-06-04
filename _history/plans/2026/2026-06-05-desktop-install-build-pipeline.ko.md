# 2026-06-05 Desktop Install Build Pipeline Plan

## Mode

- selected_mode: `standard`
- reason: 설치/빌드 pipeline 소스, 문서, 검증 경로를 바꾸는 의미 있는 구현 작업이지만 새 제품 기능이나 public release signing까지 포함하지 않는다.

## Options

- language_options:
  - Node.js script: 기존 package scripts, Tauri CLI, pnpm workspace와 맞고 cross-platform shell quoting을 줄일 수 있다.
  - Python script: repository 운영 도구와 맞지만 desktop package scripts와 Tauri CLI 호출부에 새 runtime 경계를 추가한다.
- selected_language: Node.js
- language_decision_notes: 기존 `desktop-pipeline.mjs`를 확장하는 것이 가장 작고 유지보수 부담이 낮다.

- architecture_options:
  - Single heavy command: `setup:verify`가 install, build, test, package를 계속 묶는다.
  - Split pipeline: setup, quick verify, full verify, renderer build, package를 분리한다.
  - External task runner: 별도 build system을 도입한다.
- selected_architecture: Split pipeline
- architecture_decision_notes: 사용자가 느린 install/build를 문제로 봤고, 반복 작업마다 필요한 단계만 실행하는 구조가 가장 직접적인 개선이다.

- folder_structure_options:
  - Existing `platform-desktop-app/scripts/` 확장
  - 새 `_tools/desktop-build/` 도구 생성
- selected_folder_structure: Existing `platform-desktop-app/scripts/`
- folder_structure_decision_notes: 이 로직은 desktop app 프로젝트 전용이므로 프로젝트 내부 scripts가 소유권이 명확하다.

## Tasks

- [x] 웹 검색으로 Tauri/pnpm/Playwright 공식 기준 확인
- [x] root scripts를 `desktop:setup`, `desktop:verify:quick`, `desktop:renderer:build`로 분리
- [x] `desktop-pipeline.mjs`에 setup, quick verify, prepared Tauri build 모드 추가
- [x] Tauri direct build는 renderer build/audit를 유지하고, package pipeline은 prepared renderer audit만 재사용
- [x] readiness/service checks와 tests 갱신
- [x] README와 release runbook 갱신
- [x] setup, quick verify, full verify, internal package build 검증

## Validation Plan

- JSON parse check
- pipeline dry-run
- `corepack pnpm run desktop:setup`
- `corepack pnpm run desktop:verify:quick`
- `corepack pnpm run desktop:verify`
- `corepack pnpm run desktop:package:internal`
- `git diff --check`

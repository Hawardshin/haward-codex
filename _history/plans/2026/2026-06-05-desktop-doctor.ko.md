# 2026-06-05 Desktop Doctor Plan

## Mode

- selected_mode: `standard`
- reason: desktop developer workflow에 새 명령, 문서, tests, readiness gate를 추가하는 의미 있는 구현 작업이다.

## Feature Options

- Option A: setup/build pipeline 안에 더 많은 자동 복구 단계를 넣는다.
  - 장점: 사용자가 직접 고칠 일이 줄어든다.
  - 단점: install/permission/cost 영향이 커지고 실패 원인 파악이 어려워진다.
- Option B: `desktop:doctor` 진단 명령을 추가한다.
  - 장점: 빠르게 원인을 확인하고 기존 setup/verify/package 명령으로 이어갈 수 있다.
  - 단점: 자동 복구는 별도 후속 기능으로 남는다.
- Option C: release readiness check만 확장한다.
  - 장점: 기존 명령에 더 적은 변화로 붙일 수 있다.
  - 단점: 개발 환경, Playwright cache, next command 안내까지 담기 어렵다.

## Selected

- Option B

## Tasks

- [x] root `desktop:doctor`와 desktop app `doctor` script 추가
- [x] `scripts/desktop-doctor.mjs` 추가
- [x] required files, package scripts, Node/pnpm/Rust/Tauri/Playwright/browser cache 검사 구현
- [x] customer bundle, internal release preflight, public release gates를 doctor report에 연결
- [x] human output과 `--json` output 지원
- [x] README/runbook/readiness/test에 doctor command 반영
- [x] doctor/test/check/pipeline dry-run 검증

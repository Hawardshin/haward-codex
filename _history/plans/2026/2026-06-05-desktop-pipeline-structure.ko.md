# 2026-06-05 Desktop Pipeline Structure Plan

## Mode

- selected_mode: `standard`
- reason: desktop build pipeline source structure와 validation checks를 변경하는 구현 작업이다.

## Structure Options

- Option A: `desktop-pipeline.mjs` monolith 유지
  - 장점: 파일 수가 적다.
  - 단점: 경로, pipeline 정의, 실행 로직이 계속 충돌하고 느린 install/build 개선을 이어가기 어렵다.
- Option B: `scripts/desktop-pipeline/` 하위 모듈로 분리
  - 장점: entrypoint, paths, definitions, runner 경계가 명확하다.
  - 단점: 파일 수가 늘어난다.
- Option C: renderer package rename/migration
  - 장점: `workspace-monitor` 이름 부채를 줄일 수 있다.
  - 단점: durable path migration 범위가 크고 이번 요청의 install/build 구조 개선보다 위험이 높다.

## Selected

- Option B
- reason: 가장 작게 구조를 바꾸면서 실제 유지보수 경계를 개선한다.

## Tasks

- [x] `desktop-pipeline.mjs`를 얇은 entrypoint로 축소
- [x] `paths.mjs`, `definitions.mjs`, `runner.mjs` 추가
- [x] readiness check와 tests가 새 구조를 검사하도록 갱신
- [x] README에 build pipeline source 구조 추가
- [x] dry-run, quick verify, full verify, desktop tests/check 실행

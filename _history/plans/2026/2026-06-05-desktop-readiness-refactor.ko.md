# 2026-06-05 Desktop Readiness Refactor Plan

## Mode

- selected_mode: `standard`
- reason: source refactor, tests, validation, history 기록을 포함하는 의미 있는 구현 작업이다.

## Refactor Options

- Option A: `check-readiness.mjs` 전체를 한 번에 분해
  - 장점: 큰 폭의 구조 개선
  - 단점: 1,100줄 이상이라 regression risk가 크다.
- Option B: desktop build pipeline readiness slice만 분리
  - 장점: 최근 변경 영역이고 테스트로 쉽게 검증 가능하다.
  - 단점: 나머지 readiness monolith는 남는다.
- Option C: renderer path/package rename
  - 장점: naming debt 감소
  - 단점: durable path migration이라 별도 계획이 필요하다.

## Selected

- Option B

## Tasks

- [x] desktop build/package script checks를 새 readiness 모듈로 추출
- [x] README/runbook/pipeline token checks를 새 readiness 모듈로 이동
- [x] main readiness가 새 모듈 required files와 failures만 합치게 변경
- [x] readiness test가 새 모듈 존재와 exports를 검사하게 변경
- [x] module import smoke, platform desktop test/check 실행

# 2026-06-05 Desktop Readiness Refactor Web Search

## Trigger

- 사용자 지시: 리팩토링.
- 목적: desktop build/readiness 스크립트를 더 작고 유지보수 가능한 ESM 모듈 구조로 정리하기 전에 공식 기준을 확인한다.

## Queries

- `Node.js modules ESM official documentation import export`
- `Node.js child_process spawnSync official docs`
- `pnpm workspace filtering official docs`

## Checked Sources

- Node.js ESM docs: https://nodejs.org/api/esm.html
- Node.js child_process docs: https://nodejs.org/api/child_process.html
- pnpm docs: https://pnpm.io/

## Decision Impact

- 기존 project가 `"type": "module"`이므로 readiness helper도 ESM `import`/`export`로 만든다.
- 기존 순차 검증 command behavior는 유지하고, 검사 책임만 별도 모듈로 분리한다.
- pnpm filter/script 경계 자체는 이전 build pipeline refactor에서 유지한 구조를 그대로 검증한다.

## Weak Or Unused Sources

- Reddit, Stack Overflow, 일반 블로그 검색 결과는 공식 문서보다 신뢰도가 낮아 의사결정 근거로 쓰지 않았다.

## Public Summary

- 리팩토링 대상은 `platform-desktop-app/scripts/check-readiness.mjs`의 desktop build pipeline 검증 책임이다.

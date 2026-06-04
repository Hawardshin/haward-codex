# 2026-06-05 Desktop Pipeline Structure Web Search

## Trigger

- 사용자 지시: 설치/빌드 방법뿐 아니라 구조도 바꿔도 된다는 허용.
- 목적: desktop build pipeline 구조를 바꾸기 전에 Tauri/pnpm/Node child process 공식 기준을 확인한다.

## Queries

- `Tauri v2 monorepo frontendDist beforeBuildCommand config official docs`
- `pnpm workspace package directory filtering official docs`
- `Node.js child_process spawnSync official docs scripts build pipeline`

## Checked Sources

- Tauri v2 config reference: https://v2.tauri.app/reference/config/
- pnpm filtering docs: https://pnpm.io/filtering
- Node.js child_process docs: https://nodejs.org/api/child_process.html

## Decision Impact

- Tauri `frontendDist`와 `beforeBuildCommand` 경계는 유지한다.
- pnpm filter 기반 step 정의는 유지하되, step 정의와 실행기를 분리한다.
- 현재 pipeline은 순차 검증/패키징이므로 Node `spawnSync` 기반 runner를 유지한다.

## Weak Or Unused Sources

- Stack Overflow, Reddit, 일반 블로그 결과는 공식 문서로 충분해서 의사결정 근거로 사용하지 않았다.

## Uncertainty

- renderer folder rename 같은 durable path migration은 이번 변경보다 위험이 크므로 수행하지 않았다. 이번 구조 변경은 build pipeline source 내부 경계에 한정했다.

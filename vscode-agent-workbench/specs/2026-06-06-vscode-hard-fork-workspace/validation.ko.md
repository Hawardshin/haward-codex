# 검증 기록

날짜: 2026-06-06

## Source 검증

| 명령 | 결과 |
| --- | --- |
| `npm run gulp compile-extensions` | 통과. `extensions/agent-workspace/tsconfig.json` 0 errors |
| `npm run compile-client` | 통과. compile 0 errors |
| `./scripts/code-cli.sh --version` | 통과. `1.124.0`, `Unknown commit`, `arm64` |
| `./scripts/code.sh` | `Agent Workspace Code.app` launch 확인. version 명령처럼 종료되지는 않아 프로세스 정리 수행 |
| `git diff --check` | source commit 전 통과 |
| source pre-commit hygiene | 최초 tsconfig whitespace 실패 후 수정, 최종 통과 |

## Outer 검증

| 명령 | 기대 |
| --- | --- |
| `node vscode-agent-workbench/scripts/verify-source-state.mjs` | source branch/commit, product identity, extension files, patch subject 확인 |

## 알려진 경고

- `npm install`은 upstream dependency graph 기준 audit 경고를 보고했다.
- `npm audit fix`는 lockfile drift가 크므로 이번 slice에서 실행하지 않았다.
- `zsh -lic` 실행 시 기존 shell prompt의 gitstatus/monitor 경고가 출력된다.

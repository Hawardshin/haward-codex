# 요청-결과 추적: VS Code 하드 포크 워크스페이스

날짜: 2026-06-06

## 요청

VS Code를 클론하고, 소스를 직접 변경해 Agent Workspace 성격의 하드 포크 작업을 시작한다.

## 결과

- `vscode-agent-workbench/source`에 `microsoft/vscode` clone 완료
- source branch `awp/hard-fork-workspace-foundation` 생성
- source commit `c7df3053c6da59dae9af42d5474a0d45dd3dc594` 생성
- `product.json` Agent Workspace Code 정체성 적용
- `extensions/agent-workspace` built-in extension 추가
- `patches/0001-agent-workspace-hard-fork-foundation.patch` 생성
- outer project docs/specs/verification/install records 생성

## 산출물

- `vscode-agent-workbench/README.ko.md`
- `vscode-agent-workbench/configs/source-baseline.json`
- `vscode-agent-workbench/scripts/verify-source-state.mjs`
- `vscode-agent-workbench/patches/0001-agent-workspace-hard-fork-foundation.patch`
- `vscode-agent-workbench/specs/2026-06-06-vscode-hard-fork-workspace/`

## 검증

- `npm run gulp compile-extensions`
- `npm run compile-client`
- `./scripts/code-cli.sh --version`
- `./scripts/code.sh` GUI launch smoke and process cleanup
- `node vscode-agent-workbench/scripts/verify-source-state.mjs`

## 남은 연결 지점

다음 slice에서 Agent Workspace runtime records, CLI adapter status, native terminal/process/pipe 기능을 VS Code view와 command surface에 연결한다.

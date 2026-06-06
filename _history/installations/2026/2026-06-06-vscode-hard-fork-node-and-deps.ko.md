# 설치 감사: VS Code 하드 포크 Node/runtime/dependencies

날짜: 2026-06-06

## 설치 범위

- owning project: `vscode-agent-workbench`
- scope: user-local Node runtime and source-local npm dependencies
- Node: `24.15.0`
- npm: `11.12.1`
- source dependency path: `vscode-agent-workbench/source/node_modules/`

## 실행 명령

```bash
git clone --depth 1 --filter=blob:none https://github.com/microsoft/vscode.git vscode-agent-workbench/source
nvm install 24.15.0
nvm use 24.15.0
npm install
```

## dependency 기록

- `vscode-agent-workbench/source/.nvmrc`
- `vscode-agent-workbench/source/package.json`
- `vscode-agent-workbench/source/package-lock.json`
- `vscode-agent-workbench/configs/source-baseline.json`

## 보안 검토

`npm install`은 완료됐지만 upstream dependency graph 기준 audit 경고가 남았다. root package에서는 moderate/high 경고가 있었고, 일부 nested package에는 critical 포함 경고가 있었다. 자동 `npm audit fix`는 upstream lockfile과 source baseline을 크게 바꿀 수 있어 실행하지 않았다.

## 라이선스 검토

Code - OSS source는 MIT license다. public redistribution 전에는 상표/브랜딩, Marketplace/service endpoint, signing/notarization, third-party dependency SBOM 검토가 별도 필요하다.

## 검증

- `node --version`: `v24.15.0`
- `npm --version`: `11.12.1`
- `npm run gulp compile-extensions`: 통과
- `npm run compile-client`: 통과
- `./scripts/code-cli.sh --version`: `1.124.0`, `Unknown commit`, `arm64`
- `./scripts/code.sh`: `Agent Workspace Code.app` launch 확인 후 프로세스 정리

## rollback

- `rm -rf vscode-agent-workbench/source/node_modules`
- 필요 시 `rm -rf vscode-agent-workbench/source`
- 다른 프로젝트가 Node 24.15.0을 쓰지 않으면 `nvm uninstall 24.15.0`

## 기록

- registry entry: `_ops/installations/registry.json`
- source baseline: `vscode-agent-workbench/configs/source-baseline.json`
- source patch: `vscode-agent-workbench/patches/0001-agent-workspace-hard-fork-foundation.patch`

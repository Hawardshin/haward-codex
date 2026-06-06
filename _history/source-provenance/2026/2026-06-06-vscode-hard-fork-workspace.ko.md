# VS Code 하드 포크 Source Provenance

날짜: 2026-06-06

## 원본

- 저장소: https://github.com/microsoft/vscode
- 라이선스: MIT
- clone command: `git clone --depth 1 --filter=blob:none https://github.com/microsoft/vscode.git vscode-agent-workbench/source`
- upstream commit: `6a4e80f425c2eb9d4c528862efeed9f4743692e8`

## 로컬 변경

- branch: `awp/hard-fork-workspace-foundation`
- source commit: `c7df3053c6da59dae9af42d5474a0d45dd3dc594`
- subject: `feat: add agent workspace hard fork foundation`
- patch: `vscode-agent-workbench/patches/0001-agent-workspace-hard-fork-foundation.patch`

## 변경 파일

- `product.json`
- `build/gulpfile.extensions.ts`
- `extensions/agent-workspace/package.json`
- `extensions/agent-workspace/tsconfig.json`
- `extensions/agent-workspace/src/extension.ts`

## 추적 경계

`vscode-agent-workbench/source/`는 nested Git clone이며 outer repository에서 ignore한다. 재현 가능한 durable artifact는 patch와 source baseline이다.

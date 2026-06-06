# Agent Workspace Code 하드 포크 작업대

이 프로젝트는 `microsoft/vscode` 원본을 직접 클론해 Agent Workspace용 워크벤치로 하드 포크하는 작업 공간이다. 원본 전체는 너무 크기 때문에 Git에는 `source/`를 추적하지 않고, 실제 소스 변경은 로컬 클론의 커밋과 `patches/`에 저장한 재적용 패치로 관리한다.

## 현재 기준선

- 원본 저장소: https://github.com/microsoft/vscode
- 원본 기준 커밋: `6a4e80f425c2eb9d4c528862efeed9f4743692e8`
- 로컬 소스 브랜치: `awp/hard-fork-workspace-foundation`
- 로컬 소스 커밋: `c7df3053c6da59dae9af42d5474a0d45dd3dc594`
- 패치 산출물: `patches/0001-agent-workspace-hard-fork-foundation.patch`
- Node 런타임: `24.15.0`

## 1차로 넣은 기능

- `product.json`을 `Agent Workspace Code` 제품 정체성으로 변경했다.
- macOS 앱 이름, data/shared data folder, URL protocol, server/tunnel 이름을 Agent Workspace 기준으로 분리했다.
- `extensions/agent-workspace/` 내장 확장을 추가했다.
- Activity Bar에 `Agent Workspace` 컨테이너와 `Workspace Timeline` view를 추가했다.
- `agentWorkspace.platformRoot` 설정과 refresh/status command를 추가했다.

## 로컬 소스 작업

```bash
cd /Users/shinjoungeun/Desktop/Obsidian/brain/codex/vscode-agent-workbench/source
nvm use 24.15.0
npm run gulp compile-extensions
npm run compile-client
./scripts/code-cli.sh --version
./scripts/code.sh
```

## 바깥 워크스페이스 검증

```bash
cd /Users/shinjoungeun/Desktop/Obsidian/brain/codex
node vscode-agent-workbench/scripts/verify-source-state.mjs
```

## 경계

`source/`는 로컬 클론이며 Git 추적 대상이 아니다. 다음 소스 변경도 먼저 `source/` 내부에서 커밋하고, `git format-patch`로 `patches/`에 보존한다.

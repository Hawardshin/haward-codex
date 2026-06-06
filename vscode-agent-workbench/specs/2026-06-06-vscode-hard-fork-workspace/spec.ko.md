# VS Code 하드 포크 워크스페이스 스펙

날짜: 2026-06-06

## 목표

`microsoft/vscode`의 Code - OSS 소스를 직접 기반으로 Agent Workspace Code의 첫 하드 포크 기준선을 만든다. 첫 slice는 제품 정체성 변경, 내장 Agent Workspace 확장, 컴파일 등록, 검증 가능한 패치 산출물을 포함한다.

## 선택한 구현 방식

| 선택지 | 장점 | 단점 | 결정 |
| --- | --- | --- | --- |
| VS Code 원본 하드 포크 | 워크스페이스, editor, extension host, terminal, SCM 등 기존 기능을 그대로 활용 가능 | build가 무겁고 upstream 추적 비용이 큼 | 선택 |
| 기존 Tauri 데스크톱 앱에 editor 기능만 추가 | 현재 플랫폼과 통합이 빠름 | VS Code의 작업공간 경험을 재구현해야 함 | 제외 |
| 외부 VS Code 확장만 작성 | 배포와 유지가 쉬움 | 제품 정체성, native workbench, 내장 기능 통합이 제한됨 | 제외 |

## 언어/런타임 결정

| 선택지 | 판단 |
| --- | --- |
| TypeScript 내장 VS Code extension | VS Code extension host와 build pipeline에 자연스럽게 들어가므로 1차 통합에 적합 |
| Rust/Tauri native integration | native process 제어에는 강하지만 VS Code workbench 내부 UI와 extension host 통합에는 우회가 많음 |

선택: TypeScript 내장 확장과 `product.json` 변경. 추후 native process/pipe 기능은 platform runtime adapter를 통해 연결한다.

## 아키텍처

- `vscode-agent-workbench/source/`: 무시되는 로컬 VS Code 클론
- source branch: `awp/hard-fork-workspace-foundation`
- source commit: `c7df3053c6da59dae9af42d5474a0d45dd3dc594`
- tracked patch: `patches/0001-agent-workspace-hard-fork-foundation.patch`
- project metadata: `configs/source-baseline.json`
- verification: `scripts/verify-source-state.mjs`

## 변경 표면

- `product.json`: 제품명, 앱명, data folder, shared data folder, server/tunnel 이름, macOS bundle identifier, URL protocol 변경
- `build/gulpfile.extensions.ts`: 새 extension compilation 등록
- `extensions/agent-workspace/`: Activity Bar view, timeline provider, 설정/command contribution

## 위험

- upstream VS Code는 월별로 빠르게 변하므로 rebase 시 충돌 가능성이 높다.
- public redistribution에는 별도 상표, 아이콘, signing, notarization, marketplace/service endpoint 검토가 필요하다.
- npm install 결과 기존 upstream dependency audit 경고가 있다.

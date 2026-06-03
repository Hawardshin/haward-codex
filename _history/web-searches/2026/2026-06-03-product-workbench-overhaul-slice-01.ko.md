# Web Search: 제품 Workbench 대공사 Slice 01

## 검색 시각

- 2026-06-03 KST

## Queries

- `VS Code official source workbench architecture Explorer Activity Bar Panel extension host docs`
- `Eclipse Theia official architecture frontend backend workbench docs`
- `Tauri official app architecture frontend backend commands state docs`
- `Microsoft Fluent 2 official navigation command bar tabs layout guidance`
- `site:v2.tauri.app commands state official docs Tauri v2`
- `site:v2.tauri.app architecture frontend backend commands Tauri v2`

## 확인한 강한 출처

- VS Code Extension API, Extending Workbench: `https://code.visualstudio.com/api/extension-capabilities/extending-workbench`
- Eclipse Theia Architecture Overview: `https://theia-ide.org/docs/architecture/`
- Tauri 2 Architecture: `https://v2.tauri.app/concept/architecture/`
- Tauri 2 Frontend Configuration: `https://v2.tauri.app/start/frontend/`
- Microsoft Fluent 2 React Nav guidance: `https://fluent2.microsoft.design/components/web/react/core/nav/usage`

## 계획 영향

- VS Code의 Activity Bar/Side Bar/Panel/Workbench 분리는 activity rail 하나와 기능 surface component 분리 방향을 뒷받침했다.
- Theia의 frontend/backend 및 contribution modularity는 renderer를 feature surface 단위로 나누는 근거가 됐다.
- Tauri 2의 frontend agnostic/static frontend 및 Rust-side app logic 구조는 renderer component refactor와 Tauri command/runtime boundary를 분리하는 방향을 유지하게 했다.
- Fluent navigation guidance는 main navigation과 disclosure/secondary details를 분리하는 결정을 강화했다.

## 약한 출처 처리

- Wikipedia, marketplace listing, Reddit, 일반 블로그는 이번 slice 결정 근거로 쓰지 않았다.
- VS Code OSS/Theia 전체 임베딩 여부는 이번 slice에서 결정하지 않았다. 별도 dependency/license/security/bundle audit가 필요하다.

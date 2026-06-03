# Web Search: Workspace Explorer Module

## 검색 시각

- 2026-06-03 KST

## Queries

- `VS Code official Explorer view workbench file explorer docs`
- `site:code.visualstudio.com docs editor codebasics explorer official VS Code Explorer`
- `site:code.visualstudio.com api extension-capabilities extending-workbench views containers official`
- `Monaco Editor React official controlled editor API documentation`
- `site:v2.tauri.app/develop/calling-rust frontend invoke commands official`
- `Eclipse Theia official file navigator workbench contribution architecture docs`

## 확인한 강한 출처

- VS Code Basic Editing / Explorer: `https://code.visualstudio.com/docs/editing/codebasics`
- VS Code Extension API, Extending Workbench: `https://code.visualstudio.com/api/extension-capabilities/extending-workbench`
- Tauri Calling Rust from the Frontend: `https://v2.tauri.app/develop/calling-rust/`
- Eclipse Theia Architecture Overview: `https://theia-ide.org/docs/architecture/`
- Monaco Editor repository/API reference: `https://github.com/microsoft/monaco-editor`

## 계획 영향

- Explorer는 editor와 같은 화면에 있되 독립 view surface로 관리한다.
- 파일 접근/저장은 renderer 안에서 직접 처리하지 않고 Tauri command 경계로 유지한다.
- Monaco editor는 editor pane에 남기고, Explorer tree/dropzone/file search는 별도 component module로 분리한다.

## 약한 출처 처리

- StackOverflow, 일반 블로그, 비공식 VS Code guide는 이번 구현 근거로 쓰지 않았다.
- VS Code OSS 전체 workbench 도입은 별도 install/license/security/bundle audit 전까지 보류한다.

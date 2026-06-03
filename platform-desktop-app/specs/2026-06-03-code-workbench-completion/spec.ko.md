# 스펙: 데스크톱 코드 워크벤치 완성

## 목적

Desktop source editor는 Monaco를 화면에 임베드한 정도에서 멈추면 안 된다. 설치형 플랫폼은 코드 작업을 플랫폼 안에서 끝낼 수 있도록 runtime workspace file index, open editors, editor commands, diff review, settings, platform handoff를 갖춘 코드 워크벤치를 제공해야 한다.

## 기능 범위

- Tauri backend는 현재 workspace를 runtime에서 스캔해 편집 가능한 텍스트 파일 목록을 반환한다.
- 파일 스캔은 `_private`, `outputs`, `.git`, `node_modules`, build output, symlink escape를 피하고 scan/return limit을 둔다.
- Workspace Monitor Source Review는 runtime file refresh를 우선 사용하고, Tauri가 없으면 snapshot catalog로 degrade한다.
- 여러 열린 파일은 open editor tab strip으로 관리하며 탭별 dirty 상태와 close action을 제공한다.
- Monaco editor command toolbar는 undo, redo, find, replace, format, edit/diff mode, wrap, settings를 제공한다.
- Diff mode는 Monaco DiffEditor를 사용해 base content와 draft content를 비교한다.
- Editor settings popup은 word wrap, minimap, diff review를 설정한다.

## 비목표

- VS Code extension host나 language server를 이번 slice에서 구현하지 않는다.
- Git stage/commit UI를 이번 slice에서 구현하지 않는다.
- workspace 밖 파일 접근이나 `_private`/`outputs` 직접 편집은 허용하지 않는다.

## 수용 기준

- Tauri command `list_workspace_text_files`가 등록되고 readiness/test에서 감지된다.
- Source Review에 `Refresh Files`, `Open Editors`, editor command toolbar, `Editor Settings`, `Diff Review`가 보인다.
- `workspace-monitor` TypeScript check/test/build/customer build/perf budget이 통과한다.
- `platform-desktop-app` readiness/test와 Rust check가 통과한다.
- Browser smoke에서 Source Review workbench가 렌더링되고 horizontal overflow가 0이다.

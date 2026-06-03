# 웹 검색 기록: 데스크톱 코드 워크벤치 완성

## 검색 목적

Monaco 임베드만으로 충분한지 재검토하고, 데스크톱 코드 워크벤치에 필요한 editor action, diff editor, Tauri runtime file access 근거를 확인했다.

## 검색 일시

- 날짜: 2026-06-03
- 작업 모드: `ship_first`

## 검색 쿼리

- `Monaco Editor official API actions commands diff editor models TypeScript`
- `VS Code web editor architecture Monaco file explorer tabs command palette official docs`
- `Tauri file system dialog plugin official docs v2 read write files`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| Monaco Editor API, https://microsoft.github.io/monaco-editor/typedoc/ | 공식 API 문서 | editor action, command, diff editor, options API가 제공된다. | Monaco Editor를 엔진으로 유지하고 command toolbar와 DiffEditor를 앱 기능으로 연결했다. |
| Monaco Editor GitHub, https://github.com/microsoft/monaco-editor | 공식 저장소 | Monaco는 browser-based code editor이며 VS Code 기반 편집 엔진으로 사용할 수 있다. | VS Code 전체 앱 임베드 대신 Monaco 기반 workbench 완성을 선택했다. |
| Tauri v2 File System docs, https://v2.tauri.app/plugin/file-system/ | 공식 문서 | Tauri는 파일 접근을 plugin/Rust side로 관리하며 OS별 resource write 제약이 있다. | frontend 임의 FS 접근이 아니라 Rust command `list_workspace_text_files`와 기존 scoped read/write 경계를 유지했다. |
| Tauri v2 Dialog docs, https://v2.tauri.app/reference/javascript/dialog/ | 공식 문서 | 파일 선택과 scoped file access는 플랫폼별 권한 모델과 연결된다. | 이번 slice에서는 native dialog보다 workspace root scoped runtime index를 우선 구현했다. |

## 약한 출처와 제외

- Reddit/Tauri troubleshooting 글은 발견했지만, 공식 Tauri 권한/FS 문서보다 근거력이 낮아 구현 근거로 쓰지 않았다.
- VS Code 전체 architecture 복제는 이번 slice의 범위를 넘기 때문에 구현 결정 근거로 삼지 않았다.

## 계획 영향

- 답은 “임베드만”이 아니라 “Monaco를 엔진으로 쓰는 platform-owned workbench”다.
- runtime file index, open editor tabs, command toolbar, diff/settings surface를 이번 slice에서 구현한다.
- language server, extension host, Git staging은 별도 slice로 남기되 이번 작업의 acceptance를 막지 않는 비목표로 명시한다.

## 불확실성

- 실제 Tauri 앱에서 runtime source refresh 후 파일 open/save까지 수동 E2E는 이번 정적 브라우저 smoke에서 완전히 대체되지 않는다. Rust command와 readiness/test는 통과했고, 다음 installed-app smoke에서 실제 file refresh click을 추가해야 한다.

# Web Search: Accumulated Data Surface

## 사용자 지시 요약

- 사용자가 축적되는 데이터를 쉽게 볼 수 있어야 한다.

## 검색어

- `Tauri v2 path appDataDir appLogDir official docs`
- `Tauri v2 file system plugin app data directory official docs`
- `Tauri v2 resources embedding additional files official docs`

## 확인한 출처

- Tauri Path API: `https://v2.tauri.app/reference/javascript/api/namespacepath/`
- Tauri File System plugin: `https://v2.tauri.app/plugin/file-system/`
- Tauri Embedding Additional Files: `https://v2.tauri.app/develop/resources/`

## 판단 요약

- Tauri의 app-specific directory 모델과 file metadata/readDir API는 runtime data store를 app data/log/cache plane에 두는 기존 방향과 맞는다.
- Tauri 문서의 file metadata에서 `stat`은 symlink를 따르고 `lstat`은 symlink 자체 정보를 반환한다는 설명을 확인했으므로, Rust backend scan은 symlink를 따라가지 않는 `symlink_metadata` 기반으로 구현한다.
- Tauri resource bundling 문서는 installer shell runtime contract를 app resource로 묶어 읽는 기존 구조를 뒷받침한다.

## 계획 반영

- raw file explorer 대신 app-managed runtime store summary command를 만든다.
- 각 store scan은 bounded metadata scan으로 제한한다.
- source tree visibility가 아니라 accumulated runtime data visibility를 제품 surface로 둔다.

## 약한 출처

- Stack Overflow, Reddit 결과는 참고하지 않았다. 이번 구현 결정은 공식 Tauri 문서와 로컬 contract/registry에 근거했다.

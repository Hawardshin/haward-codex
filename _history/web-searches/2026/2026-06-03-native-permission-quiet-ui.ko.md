# Web Search: Native Permission Quiet UI

- 날짜: 2026-06-03
- 요청 ID: `UR-2026-06-03-053`
- 작업: desktop app UI/font tone down, native workspace permission request flow

## Queries

- `Tauri file system permissions dialog plugin scope folder picker official docs`
- `Tauri plugin dialog open folder permissions official docs`
- `Apple Human Interface Guidelines typography macOS interface text official`
- `Microsoft Fluent UI typography desktop density official`

## Sources Checked

- Tauri Dialog plugin reference: native open dialog가 file/directory picker를 제공하고, plugin permission으로 dialog 사용 범위를 선언한다는 점을 확인했다.
- Tauri File System plugin reference: 파일시스템 접근은 scope/permission을 통해 선언적으로 관리한다는 점을 확인했다.
- Tauri Using Plugin Permissions: capability 파일이나 tauri config에서 plugin permission을 추가하는 구조를 확인했다.
- Apple HIG Typography: macOS는 SF Pro/system font 기반 typography hierarchy가 기본이라는 점을 확인했다.
- Microsoft Fluent typography: Windows desktop은 Segoe UI Variable/system font 기반의 친숙한 type ramp를 권장한다는 점을 확인했다.

## Plan Impact

- app UI는 forced marketing font보다 OS system font stack을 우선한다.
- large hero/card typography와 hover elevation을 줄인다.
- 작업공간 접근은 수동 path 입력보다 native folder picker permission request CTA를 우선한다.
- folder access 승인 후 CLI working directory가 비어 있으면 active workspace path로 자동 설정한다.

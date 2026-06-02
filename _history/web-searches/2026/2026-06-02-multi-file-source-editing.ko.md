# Multi-File Source Editing Web Search

- 날짜: 2026-06-02
- 요청 요약: 설치형 데스크톱 앱에서 모든 파일 편집에 가까운 사용자 경험을 실제 구현해 달라는 요청.
- 작업 모드 영향: `governance`

## Queries

- `Monaco Editor official documentation dispose models worker integration`
- `Tauri v2 official filesystem permissions scope documentation`
- `GitHub Desktop official documentation review changes diff commit`
- `Visual Studio Code official source control diff editor documentation`

## Checked Sources

- Monaco Editor docs: `https://microsoft.github.io/monaco-editor/`
- Tauri v2 filesystem/security docs: `https://v2.tauri.app/plugin/file-system/`
- GitHub Desktop docs on reviewing changes: `https://docs.github.com/en/desktop/making-changes-in-a-branch/reviewing-changes-in-github-desktop`
- VS Code source control docs: `https://code.visualstudio.com/docs/sourcecontrol/overview`

## Plan Impact

- Monaco는 적절한 장기 editor surface 후보지만, 이번 slice에서는 설치 감사 없이 의존성을 추가하지 않았다.
- Tauri 파일 접근은 workspace-relative command와 deny boundary를 유지해야 하므로 renderer에서 임의 파일 접근을 늘리지 않았다.
- GitHub Desktop과 VS Code의 diff/change review 패턴을 참고해 드래프트 큐, dirty 상태, 현재 저장/전체 저장, 되돌리기, backup 결과를 같은 화면에 배치했다.

## Uncertainty

- 실제 macOS Tauri WebView에서 파일 명령을 실행하는 smoke는 Rust/Tauri developer install audit 이후 진행해야 한다.

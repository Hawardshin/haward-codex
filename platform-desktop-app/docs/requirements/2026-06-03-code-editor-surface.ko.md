# 코드 편집 surface 요구사항

## 배경

설치형 플랫폼은 코드 복사, 코드 검토, scoped editing, backup save gate가 필요하다. VS Code 전체 제품을 복제하는 대신, VS Code editor 기능의 오픈소스 핵심인 Monaco를 앱 안의 코드 편집 surface로 사용한다.

## 요구사항

- `REQ-PDA-CODE-001`: desktop runtime 화면은 `<textarea>`가 아니라 VS Code 계열 코드 편집 경험에 가까운 editor surface를 제공해야 한다.
- `REQ-PDA-CODE-002`: editor는 기존 Tauri `read_workspace_text_file`/`write_workspace_text_file` scoped file access와 backup save gate를 유지해야 한다.
- `REQ-PDA-CODE-003`: 사용자는 현재 draft 또는 source viewer의 파일 내용을 클립보드로 복사할 수 있어야 한다.
- `REQ-PDA-CODE-004`: editor는 open draft, dirty draft, diff summary, save current, save all, revert, close draft 흐름을 유지해야 한다.
- `REQ-PDA-CODE-005`: 신규 오픈소스 dependency가 필요하면 project-local로 설치하고 license/security/rollback을 기록해야 한다. 이미 설치된 dependency를 쓰는 경우에는 실제 설치가 없었음을 기록한다.

## 비범위

- VS Code 제품 바이너리 설치 또는 브랜드/marketplace 통합
- language server, extension marketplace, debugger, git commit UI
- 전체 `MonitorShell.tsx` 컴포넌트 분리

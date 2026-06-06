# User Request: Native Pipe Runtime Tools

## 요약

사용자는 CLI/터미널 설정 확인 같은 기능을 제대로 하려면 네이티브 기능을 많이 써야 하므로, 파이프나 터미널 직접 제어를 위한 강력한 툴을 설치하거나 추가해 달라고 요청했다.

## 해석

- 전역 CLI 설치보다 설치형 데스크톱 앱의 Rust/Tauri 런타임에 project-local native pipe capability를 추가하는 것이 안전하고 추적 가능하다.
- 기존 `portable-pty`는 interactive terminal에 남기고, direct process pipeline에는 `os_pipe`를 추가한다.

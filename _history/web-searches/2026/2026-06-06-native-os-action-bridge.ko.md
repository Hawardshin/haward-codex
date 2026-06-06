# Web Search: Native OS Action Bridge

날짜: 2026-06-06

## 질의

- Tauri v2 opener plugin official documentation open path reveal in file manager
- Apple macOS open command man page reveal file Finder official
- Rust std::process Command official documentation current_dir env_clear

## 확인한 출처

- Tauri opener plugin: `openPath`, `openUrl`, `revealItemInDir` 기능과 Rust opener API 확인. https://v2.tauri.app/plugin/opener/
- Tauri JS opener reference: `revealItemInDir`가 파일 관리자 표시 기능으로 노출됨 확인. https://v2.tauri.app/reference/javascript/opener/
- Rust `std::process::Command`: executable/args 분리, `current_dir`, `env_clear` 사용 근거 확인. https://doc.rust-lang.org/std/process/struct.Command.html
- Apple Developer man page 안내: macOS 저수준 CLI는 man page로 확인한다는 공식 경로 확인. https://developer.apple.com/documentation/os/reading-unix-manual-pages

## 계획 영향

파일 관리자/기본 앱 열기는 이미 설치된 Tauri opener를 사용하기로 했다. 외부 터미널은 새 전역 도구 설치 없이 Rust `Command`로 OS별 executable과 args를 분리해 실행하기로 했다. destructive OS action은 제외했다.
